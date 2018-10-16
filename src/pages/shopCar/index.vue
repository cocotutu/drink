<template>
  <div class="container">
    <ul class="goods">
      <li class="item" v-for="(item, index) in shopCar" :key="index">
        <div class="checkbox">
          <switch type="checkbox" @change="handleSelect(item)" :checked="checkedList.includes(item.id)"></switch>
        </div>
        <div class="detail">
          <div class="name">
            {{item.detail.name}}
          </div>
          <div class="size_temp">
            <card :text="size(item)"></card>
            <span>/</span>
            <card :text="temp(item)"></card>
          </div>
        </div>
        <div class="price">￥{{item.price}}</div>
        <div class="count">
          <div class="minus" @click="minusClick">-</div>
          <div class="num">{{item.num}}</div>
          <div class="add" @click="addClick">+</div>
        </div>
      </li>
    </ul>
    <div class="sumprice">

    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import card from '@/components/card'

export default {
  components: {
    card
  },

  data () {
    return {
      checkedList: []
    }
  },
  computed: {
    ...mapState({
      shopCar: 'shopCar'
    })
  },
  methods: {
    handleSelect (item){
      console.log(item)
    },
    tmpClick (item){
      this.temp = item.value
    },
    minusClick (){
      const num = this.num
      this.num = num - 1
    },
    size (content){
      const { type } = content.detail
      const result =  type.find(item => item.id == content.size)
      console.log(result, 'content')
      if( result ){
        return result.name
      }
      return ''
      
    },
    temp (content){
      const { temp } = content.detail
      const result = temp.find(item => item.value == content.temp)
      if( result ){
        return result.name
      }
      return ''
    },
  },
  created () {
    console.log(this.shopCar, 'shopCar')
  },
  updated() {
    console.log(this)
  },
}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  .goods{
    width: 100%;
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    .item{
      width: 100%;
      height: 150rpx;
      padding: 10rpx 6rpx;
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      border-bottom: 1rpx solid #eee;
      &:first-child{
        border-top: 1rpx solid #eee;
      }
      .checkbox{
        width: 100rpx;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .detail{
        flex: 1;
        height: 100%;
      }
      .price{
        width: 100rpx;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 28rpx;
      }
      .count{
        width: 200rpx;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        & > div{
          width: 50rpx;
          height: 50rpx;
          border: 2rpx solid #09bb07;
          line-height: 43rpx;
          font-size: 44rpx;
          border-radius: 100%;
          color: #09bb07;
          text-align: center;
        }
        .num{
            line-height: 52rpx;
            font-size: 32rpx;
            color: #e64340;
            border: none;
        }
      }
    }
  }
}

</style>
