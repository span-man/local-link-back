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
    findAll: () => {
        try {
            let dataList = fs.readFileSync('./data.json', 'utf-8');
            // console.log('dataList-->', dataList);
            return {
                success: true,
                dataList: JSON.parse(dataList).dataList
            };
        } catch (error) {
            console.log(error);
            return {
                success: false
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
            fs.writeFileSync('./data.json', dataJson, 'utf-8')
            return {
                success: true
            }
        } catch (error) {
            return {
                success: false
            }
        }
    },
    delLinkById: (_id) => {
        try {
            let allData = fs.readFileSync('./data.json', 'utf-8');
            let dataJson = JSON.parse(allData);
            dataJson.dataList = dataJson.dataList.filter(item => item.id != _id)
            fs.writeFileSync('./data.json', dataJson, 'utf-8')
            return {
                success: true
            }
        } catch (error) {
            return {
                success: false
            }
        }
    },
    updateByItem: (_item) => {
        try {
            let allData = fs.readFileSync('./data.json', 'utf-8');
            let dataJson = JSON.parse(allData);
            console.log('111 dataJson--->', dataJson)
            dataJson.dataList = dataJson.dataList.map(item => {
                if (item.id == _item.id) {
                    if (_item.label) {
                        item.label = _item.label
                    }
                    if (_item.link) {
                        item.link = _item.link
                    }
                    if (_item.img) {
                        item.img = _item.img
                    }
                    console.log('every item--->', item)
                }
                return item
            })
            console.log('222 dataJson--->', (dataJson))
            console.log('333 JSON.stringify(dataJson)--->', JSON.stringify(dataJson))
            fs.writeFileSync('./data.json', JSON.stringify(dataJson), 'utf-8')
            return {
                success: true
            }
        } catch (error) {
            return {
                success: false
            }
        }
    },
}

module.exports = allFun;