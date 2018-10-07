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
  async getMenuList ({commit, dispatch}, init){
    const { data } = await db.menu.getList()
    console.log(init)
    commit('menuList', {list: data, type: init})
    if( data.length > 0 ){
      dispatch('getSingleMenuItem', data[0].id)
    }
  },
  async getSingleMenuItem ({commit}, categoryId){
    console.log(categoryId, 'categoryId')
    const res = await db.goods.getItem({'parentId': categoryId})
    console.log(res.data)
    commit('menuItemList', {id: categoryId, list: res.data})
  }
}