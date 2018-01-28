const _ = require('lodash');
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa-cors');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();

const SERVER_PORT = 3001;

const items = ['Citron', 'Lait', 'Oeuf'];
router
  .get('/items', async (ctx, next) => {
    ctx.body = items;
    await next();
  })

  .post('/items/add', async (ctx, next) => {
    const { item } = ctx.request.body;
    if (_.isString(item)) {
      items.push(item);
      ctx.status = 200;
      console.log(`Added item '${item}'`);
    } else {
      ctx.status = 400;
      ctx.body = { error: '`item` parameter not found.' };
    }
    await next();
  })

  .post('/items/remove', async (ctx, next) => {
    const { index } = ctx.request.body;
    if (_.inRange(index, 0, items.length)) {
      items.splice(index, 1);
      ctx.status = 200;
      console.log(`Removed item at index ${index}`);
    } else {
      ctx.status = 400;
      ctx.body = {
        error: `\`index\` parameter (${index}) not found or not in range [0, ${items.length}].`,
      };
    }
    await next();
  });

function delay(delayMs) {
  return async (ctx, next) => {
    await new Promise(resolve => setTimeout(resolve, delayMs));
    await next();
  };
}

function log() {
  return async (ctx, next) => {
    const { method, url } = ctx.request;
    console.log('\n');
    console.log('―――――');
    console.log(`${method} ${url}...`);
    await next();
    const { status, message } = ctx.response;
    console.log(`――――― ${status} ${message}`);
  };
}

app
  .use(cors())
  .use(delay(300))
  .use(bodyParser())
  .use(log())
  .use(router.routes());

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}...`));
