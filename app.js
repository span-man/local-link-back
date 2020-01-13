const fs = require("fs");
const koa = require("koa");
const app = new koa();
let router = require('koa-router')();
const cors = require("koa2-cors");
const bodyparser = require("koa-bodyparser");
const utilsFun = require("./utilsFun");

app.use(bodyparser());
app.use(cors());

router
    .get('/', (ctx) => {
        ctx.body = 'ok';
    })
    .get('/dataList', (ctx) => {
        try {
            let dataList = fs.readFileSync('./data.json', 'utf-8');
            // console.log('dataList-->', dataList);
            ctx.body = {
                success: true,
                dataList: JSON.parse(dataList).dataList
            };
        } catch (error) {
            console.log(error);
            ctx.body = {
                success: false
            }
        }
    })
    // 根据ID增加其点击数量
    .post('/changeDataById', (ctx) => {
        return utilsFun.changeCount()
    })
    // 增加 新的连接
    .post('/addLink', (ctx) => {
        return utilsFun.addNewLink()
    })

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(7777, console.log('7777 link is ok.'))