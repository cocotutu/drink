import db from './db'


const menuList = db.collection('menuList')


const _ = db.command

class menu {
  static add(data) {
    return menuList.add({
      data
    })
  }

  static getList() {
    return menuList.get()
  }

  static getItem(params) {
    return menuList.where(params).get()
  }

  static update(id, data) {
    return menuList.doc(id).update({
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
    return menuList.doc(id).update({
      data
    })
  }

  static remove(id) {
    return menuList.doc(id).remove()
  }

  static removeItems(params) {
    return menuList.where(params).remove()
  }
}



export default menu
