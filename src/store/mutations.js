export default {
  userInfo (state, info) {
    state.userInfo = info
  },
  menuList (state, list){
    state.menuList = list
  },
  //page/shop
  changeModelVisible (state, value){
    state.shop.visibleModel = value
  }
}