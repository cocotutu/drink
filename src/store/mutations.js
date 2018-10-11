export default {
  userInfo (state, info) {
    state.userInfo = info
  },
  menuList (state, {list, type}){
    console.log(list)
    const newList = list.map(item => {
      delete item['_openid']
      item.id = item['_id']
      delete item['_id']
      return item
    })
    state.menuList = newList
    if( type && newList && newList.length > 0 ) {
      state.showMenuId = newList[0].id
    }
  },
  menuItemList (state, {id, list = []}){
    state.showMenuId = id
    state.menuItemList[id] = list
  },
  //page/shop
  changeModelVisible (state, value = ""){
    console.log(value, 'changeModelVisible')
    state.shop.visibleModel = value
  },
  updateShopCar (state, value=[]){
    state.shopCar = value
  },
  addShopCar (state, value){
    if( value ){
      state.shopCar.push(value)
    }
  }
}