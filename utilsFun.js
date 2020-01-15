const fs = require('fs');
let makeId = () => {
    return '1' + String(Math.random()).substring(2, 14)
};
let myReadFile = () => {
    let allData = fs.readFileSync('./data.json', 'utf-8');
    return JSON.parse(allData);
};
let myWriteFile = (dataJson) => {
    fs.writeFileSync('./data.json', JSON.stringify(dataJson), 'utf-8')
};
const allFun = {

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
            myWriteFile(dataJson);
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
            let dataJson = myReadFile();
            return {
                success: true,
                dataList: dataJson.dataList
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
            let dataJson = myReadFile();
            dataJson.dataList.push({
                "id": makeId(),
                "label": linkObj.label,
                "link": linkObj.link,
                "img": linkObj.img || "",
                "count": 0
            })
            console.log('dataJson.dataList--->', dataJson.dataList);
            myWriteFile(dataJson);
            return {
                success: true,
                msg: '新增成功'
            }
        } catch (error) {
            return {
                success: false,
                msg: '新增失败'
            }
        }
    },
    delLinkById: (_id) => {
        try {
            let dataJson = myReadFile();
            dataJson.dataList = dataJson.dataList.filter(item => item.id != _id)
            myWriteFile(dataJson);
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
            let dataJson = myReadFile();
            let allArr = [];

            dataJson.dataList.map(item => {
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
                allArr.push(item);
            })
            dataJson.dataList = allArr;
            console.log('222 dataJson--->', (dataJson))
            myWriteFile(dataJson);
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