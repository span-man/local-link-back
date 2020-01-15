const router = require('koa-router')();
const utilsFun = require("./utilsFun");

router
    .get('/', (ctx) => {
        ctx.body = 'ok';
    })
    // 查
    .get('/findAll', (ctx) => {
        ctx.body = utilsFun.findAll()
    })
    // 增加 新的连接
    .post('/addLink', (ctx) => {
        ctx.body = utilsFun.addNewLink()
    })
    // 删除
    .post('/delLink', (ctx) => {
        ctx.body = utilsFun.delLinkById(_id)
    })
    // 改
    .post('/updateLink', async (ctx) => {
        console.log('ctx.request.body--->', ctx.request.body)
        let _item = ctx.request.body
        if (!_item) {
            ctx.body = "入参不能为空"
        }
        console.log('_item-1111->', _item)
        ctx.body = utilsFun.updateByItem(_item)
    })
    // 根据ID增加其点击数量
    .post('/changeDataById', (ctx) => {
        ctx.body = utilsFun.changeCount()
    })


    module.exports = router