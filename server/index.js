const _ = require('lodash');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();

const SERVER_PORT = 3001;

const { log } = console;

const nextId = () => parseInt(_.uniqueId(), 10);

let items = [
  { id: nextId(), name: 'Citron' },
  { id: nextId(), name: 'Lait' },
  { id: nextId(), name: 'Oeuf' },
];
router
  .get('/items', async (ctx, next) => {
    ctx.body = items;
    await next();
  })

  .post('/items/add', async (ctx, next) => {
    const { item } = ctx.request.body;
    if (_.isString(item)) {
      const newItem = { id: nextId(), name: item };
      items = [...items, newItem];
      ctx.body = newItem;
      log(`Added item '${item}'`);
    } else {
      ctx.status = 400;
      ctx.body = { error: '`item` parameter not found.' };
    }
    await next();
  })

  .post('/items/remove', async (ctx, next) => {
    const { id } = ctx.request.body;
    const itemToRemove = _.find(items, (item) => item.id === id);
    if (itemToRemove) {
      items = _.reject(items, (item) => item === itemToRemove);
      ctx.status = 200;
      log(`Removed item n°${id}`);
    } else {
      ctx.status = 400;
      ctx.body = {
        error: `No item for ID ${id}`,
      };
    }
    await next();
  });

function delay(delayMs) {
  return async (ctx, next) => {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    await next();
  };
}

function logger() {
  return async (ctx, next) => {
    const { method, url } = ctx.request;
    log('\n');
    log('―――――');
    log(`${method} ${url}...`);
    await next();
    const { status, message } = ctx.response;
    log(`――――― ${status} ${message}`);
  };
}

app
  .use(cors())
  .use(delay(300))
  .use(bodyParser())
  .use(logger())
  .use(router.routes());

app.listen(SERVER_PORT, () => log(`Listening on port ${SERVER_PORT}...`));
