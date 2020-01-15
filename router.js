const router = require('koa-router')();
const utilsFun = require("./utilsFun");

router
    .get('/', (ctx, next) => {
        ctx.body = 'ok';
    })
    // 查
    .get('/findAll', (ctx, next) => {
        ctx.body = utilsFun.findAll()
        next();
    })
    .get('/findItemLink', (ctx, next) => {
        console.log('ctx.query--->', ctx.query);
        console.log('ctx.query.id--->', ctx.query.id);
        console.log('ctx.query.link--->', ctx.query.link)
        ctx.body = '777'
        next();
    })
    // 增加 新的连接
    .post('/addLink', async (ctx, next) => {
        try {
            let _item = ctx.request.body;
            console.log('新增--->', _item);
            ctx.body = utilsFun.addNewLink(_item);
        } catch (error) {
            console.log('新增发生异常');
        }
        next();
    })
    // 删除
    .post('/delLink', async (ctx, next) => {
        try {
            let _id = ctx.request.body.id;
            console.log('删除--->', _id);
            ctx.body = utilsFun.delLinkById(_id);
        } catch (error) {
            console.log('新增发生异常');
        }

        next();
    })
    // 改
    .post('/updateLink', async (ctx, next) => {
        try {
            let _item = ctx.request.body;
            console.log('_item-1111->', _item);
            ctx.body = utilsFun.updateByItem(_item);
        } catch (error) {
            ctx.body = "发生异常";
        }
        next();
    })
    // 根据ID增加其点击数量
    .post('/changeDataById', (ctx, next) => {
        ctx.body = utilsFun.changeCount();
        next();
    })


module.exports = router