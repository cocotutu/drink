export default {
  userInfo(state, info) {
    state.userInfo = info
  },
  //page/shop
  changeModelVisible (state, value){
    console.log(value)
    state.shop.visibleModel = value
  }
}