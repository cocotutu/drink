import db from '@/db'

export default {
  //common
  getUser({commit}) {
    wx.getUserInfo({
      success: (res) => {
        commit('userInfo', res)
      }
    })
  },
  async getMenuList ({commit}){
    const { data } = await db.menu.getList()
    console.log(data)
    commit('menuList', data)
  }
  //page/shop
}