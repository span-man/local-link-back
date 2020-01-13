const fs = require('fs');
const allFun = {
    makeId: () => {
        return '1' + String(Math.random()).substring(2, 14)
    },
    // 记录点击次数
    changeCount: (_id) => {
        try {
            let allData = fs.readFileSync('./data.json', 'utf-8');
            let dataJson = JSON.parse(allData);
            dataJson.dataList = dataJson.dataList.map(item => {
                if (item.id == _id) {
                    item.count++
                }
            })
            fs.writeFileSync(JSON.stringify(dataJson))
            return {
                success: true
            }
        } catch (error) {
            return {
                success: false,
                msg: error
            }
        }
    },
    addNewLink: (linkObj) => {
        try {
            let allData = fs.readFileSync('./data.json', 'utf-8');
            let dataJson = JSON.parse(allData);
            dataJson.dataList.push({
                "id": this.makeId(),
                "label": linkObj.label,
                "link": linkObj.link,
                "count": 0
            })
            fs.writeFileSync(dataJson, 'utf-8')
            return {
                success: true
            }
        } catch (error) {
            return {
                success: false
            }
        }
    }
}