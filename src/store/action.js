

export default {
  getUser({commit}) {
    wx.getUserInfo({
      success: (res) => {
        commit('userInfo', res)
      }
    })
  },
  //page/shop
}