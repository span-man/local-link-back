const koa = require("koa");
const fs = require("fs");
const cors = require("koa2-cors");
let router = require('./router.js');
const koaBodyparser = require("koa-bodyparser");

const app = new koa();

app.use(cors());
app.use(koaBodyparser());
// app.use(koaBodyparser.urlencoded({ extended: false }))

app.use(async function (ctx, next) {
    await next();
    if (ctx.body || !ctx.idempotent) return
    ctx.redirect('./404.html')
})

app.use(router.routes())
app.use(router.allowedMethods());

app.listen(7778, console.log('7778 link is ok.'))