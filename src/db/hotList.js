import db from './db.js'


const hotList = db.collection('hotList')
const _ = db.command

class hot {
  static add(data) {
    return hotList.add({
      data
    })
  }

  static getList() {
    console.log('resssss')
    return hotList.get()
  }

  static getItem(params) {
    return hotList.where(params).get()
  }

  static update(id, data) {
    return hotList.doc(id).update({
      data
    })
  }

  //仅更新某一个字段
  static updateSingleKey(id, path, data) {
    const arr = path.split('.')
    const last = arr.pop()
    let obj = {}
    arr.forEach((item) => {
      obj[item] = {}
      obj = obj[item]
    })
    obj = _.set({
      [last]: data
    })
    return hotList.doc(id).update({
      data
    })
  }

  static remove(id) {
    return hotList.doc(id).remove()
  }

  static removeItems(params) {
    return hotList.where(params).remove()
  }
}


export default hot
