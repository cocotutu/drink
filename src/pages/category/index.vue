<template>
  <div class="container">
    <selectGoods v-if="visible" :visible="visible" :goods="selectData" :callBack="goodsSelected"/>
    <div class="menu">
      <ul>
        <li class="menu_item"  
          v-for="(item, index) in menuList" 
          @click="menuClick(item)" 
          :key="index"
          :class="item.id == showMenuId ? 'selected' : ''"
        >
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="goods">
      <ul>
        <li class="menu_item" v-for="(item, index) in goodsList" :key="index">
          <div class="item_left">
            <img :src="item.fileID" alt="" />
          </div>
          <div class="item_detail">
            <div class="goods_name">
              {{item.name}}
            </div>
            <div class="item_content">
              {{item.content}}
            </div>
            <div class="item_default">
              默认:
            </div>
            <div class="item_price">
              ￥{{item.price}}
            </div>
            <div class="add_icon" @click="addItem(item)">+</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="shop_car" @click="linkTo">
      <div class="icon">车</div>
    </div>   
  </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex'
import db from '@/db'

import selectGoods from '@/components/selectGoods'
export default {
  components: {
    selectGoods
  },
  data (){
    return {
      visible: false,
      selectData: {}
    }
  },
  computed: {
    ...mapState({
      'menuList': 'menuList',
      'showMenuId': 'showMenuId',
      'goodsList': (state) => {
        console.log(state.showMenuId, state)
        return state.showMenuId && state.menuItemList[state.showMenuId] ? state.menuItemList[state.showMenuId] : []
      }
    })
  },
  methods: {
    menuClick (item){
      console.log(item)
      this.loadGoosList(item.id)
    },
    addItem (item){
      console.log(item)
      this.visible = true
      this.selectData = item
    },
    goodsSelected (data){
      console.log(data)
      this.visible = false
      this.addShopCar(data)
    },
    linkTo() {
      console.log('yes')
      wx.navigateTo({
        url: '../shopCar/main'
      })
    },
    ...mapActions({
      loadGoosList: 'getSingleMenuItem'
    }),
    ...mapMutations({
      addShopCar: 'addShopCar'
    })
  },
  created() {
    if( this.menuList && this.menuList.length > 0 ){
      this.menuClick(this.menuList[0])
    }
  },
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  position: fixed;
  left: 0;
  top: 0;
  .menu{
    width: 150rpx;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: #fafafa;
    & > ul{
      height: 100%;
      overflow: auto;
    }
    .menu_item{
      height: 80rpx;
      border-bottom: 1rpx solid #eee;
      color: #8a8a8a;
      box-sizing: border-box;
      line-height: 80rpx;
      padding-left: 16rpx;
      font-size: 26rpx;
      &.selected{
        background: #fff;
        position: relative;
        &::after{
          content: '';
          display: block;
          width: 8rpx;
          height: 100%;
          background: #09bb07;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
    }
  }
  .goods{
    height: 100%;
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20rpx;
    box-sizing: border-box;
    & > ul{
      height: 100%;
      overflow: auto;
    }
    .menu_item{
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: row;
      .item_left{
        width: 150rpx;
        height: 150rpx;
        img{
          width: 150rpx;
          height: 150rpx;
          border: none;
          border-radius: 6rpx;
        }
      }
      .item_detail{
        height: 150rpx;
        overflow: hidden;
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0rpx 20rpx;
        position: relative;
        & > div{
          margin-bottom: 6rpx;
        }
        .goods_name{
          height: 40rpx;
          line-height: 40rpx;
          font-size: 32rpx;
        }
        .item_content{
          height: 24rpx;
          line-height: 24rpx;
          font-size: 24rpx;
        }
        .item_default{
          height: 30rpx;
          line-height: 30rpx;
          font-size: 24rpx;
        }
        .item_price{
          height: 40rpx;
          line-height: 40rpx;
        }
        .add_icon{
          width: 40rpx;
          height: 37rpx;
          line-height: 40rpx;
          position: absolute;
          text-align: center;
          bottom: 0rpx;
          right: 20rpx;
          border-radius: 100%;
          font-size: 40rpx;
          color: #09bb07;
          background: #f1f1f1;
        }
      }
    }
  }
  .shop_car{
    position: fixed;
    bottom: 30rpx;
    right: 100rpx;
  }
}

</style>
