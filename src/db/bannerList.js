import db from './db.js'


const bannerList = db.collection('bannerList')
const _ = db.command

class banner {
  static add(data) {
    return bannerList.add({
      data
    })
  }

  static getList() {
    console.log('resssss')
    return bannerList.get()
  }

  static getItem(params) {
    return bannerList.where(params).get()
  }

  static update(id, data) {
    return bannerList.doc(id).update({
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
    return bannerList.doc(id).update({
      data
    })
  }

  static remove(id) {
    return bannerList.doc(id).remove()
  }

  static removeItems(params) {
    return bannerList.where(params).remove()
  }
}


export default banner
