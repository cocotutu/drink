import db from './db'


const goodsList = db.collection('goodsList')

const _ = db.command

class goods {
  static add(data) {
    return goodsList.add({
      data
    })
  }

  static getList() {
    return goodsList.get()
  }

  static getItem(params) {
    return goodsList.where(params).get()
  }

  static update(id, data) {
    return goodsList.doc(id).update({
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
    return goodsList.doc(id).update({
      data
    })
  }

  static remove(id) {
    return goodsList.doc(id).remove()
  }

  static removeItems(params) {
    return goodsList.where(params).remove()
  }
}


export default goods
