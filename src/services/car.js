const fs = require('fs/promises');

const filePath = './services/data.json';

async function read() {
    try {
        const file = await fs.readFile(filePath);
        return JSON.parse(file);
    } catch (err) {
        console.error('Database read error');
        console.error(err);
        process.exit(1);
    }
}

async function write(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data));
    } catch (error) {
        console.error('Database read error');
        console.error(err);
        process.exit(1);
    }
}

async function getAll() {
    const data = await read();

    return Object.entries(data).map(([id, v]) => Object.assign({}, { id }, v));
}

async function getById(id) {
    let data = await read();
    data = data[id];

    if (data) {
        return Object.assign({}, { id }, data);
    } else {
        return undefined;
    }
}

async function createCar(car) {
    const data = await read();
    id = 'xxxxxxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));

    data[id] = car;

    await write(data)
}

async function editById(id, car) {
    const data = await read();

    if (data.hasOwnProperty(id)) {
        data[id] = car;
        await write(data);
    } else {
        throw new ReferenceError('No such ID in database');
    }
}

async function deleteById(id) {
    const data = await read();

    if (data.hasOwnProperty(id)) {
        delete data[id];
        await write(data);
    } else {
        throw new ReferenceError('No such ID in database');
    }
}

async function getAll(query) {
    const data = await read();
    let cars = Object
        .entries(data)
        .map(([id, v]) => Object.assign({}, { id }, v));

    if (query.search) {
        cars = cars.filter(c => c.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()));
    }
    if (query.from) {
        cars = cars.filter(c => c.price >= Number(query.from));
    }
    if (query.to) {
        cars = cars.filter(c => c.price <= Number(query.to));
    }

    return cars;
}
    

module.exports = () => (req, res, next) => {
    req.storage = {
        getAll,
        getById,
        createCar,
        editById,
        deleteById,
        getAll
    };
    next();
};
