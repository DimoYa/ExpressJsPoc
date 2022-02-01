const express = require('express');
const hbs = require('express-handlebars');

const initDB = require('./models/index');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details } = require('./controllers/details');
const { notFound } = require('./controllers/notFound');
const carService = require('./services/car');
const accessoryService = require('./services/accessory');
const _delete = require('./controllers/delete');
const edit = require('./controllers/edit');
const accessory = require('./controllers/accessory');
const attach = require('./controllers/attach');

start();

async function start() {
  await initDB();

  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use('/static', express.static('static'));
  app.use(carService());
  app.use(accessoryService());

  app.engine(
    'hbs',
    hbs.create({
      extname: '.hbs',
    }).engine
  );
  app.set('view engine', 'hbs');

  app.get('/', home);
  app.get('/about', about);
  app.get('/details/:id', details);

  app.route('/create').get(create.get).post(create.post);

  app.route('/delete/:id').get(_delete.get).post(_delete.post);

  app.route('/edit/:id').get(edit.get).post(edit.post);

  app.route('/accessory').get(accessory.get).post(accessory.post);

  app.route('/attach/:id').get(attach.get).post(attach.post);

  app.all('*', notFound);

  app.listen(3000, () => console.log('app startеd'));
}
