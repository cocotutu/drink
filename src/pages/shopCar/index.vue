<template>
  <div class="container">
    <ul class="goods">
      <li class="item" v-for="(item, index) in shopCar" :key="index">
        <div class="checkbox">
          <switch type="checkbox" @change="handleSelect(item)" :checked="check(item)"></switch>
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
          <div class="minus" @click="minusClick(index)">-</div>
          <div class="num">{{item.num}}</div>
          <div class="add" @click="addClick(index)">+</div>
        </div>
      </li>
    </ul>
    <div class="sumprice">
      <div class="left_sum">
        <span class="text">应付合计</span>
        <span class="sum_num">￥{{sumPrice}}</span>
      </div>
      <button class="btn" type="primary">去结算</button>
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
    sumPrice (){
      const { checkedList,  shopCar } = this
      let sum = 0
      checkedList.forEach(item => {
        const result = shopCar.find(a => a.id == item)
        sum = sum + result.price * result.num
      })
      return sum
    },
    ...mapState({
      shopCar: 'shopCar'
    })
  },
  methods: {
    check (item){
      const flag =  this.checkedList.includes(item.id) ? true : false
      return flag
    },
    handleSelect (single){
      console.log(single)
      const flag = this.checkedList.includes(single.id)
      if( flag ){
        this.checkedList = this.checkedList.filter(item => single.id != item)
      }else{
        this.checkedList.push(single.id)
      }
    },
    tmpClick (item){
      this.temp = item.value
    },
    minusClick (index){
      let num = this.shopCar[index].num
      num--
      if( num>= 0 ){
        this.shopCar[index].num = num
      }
    },
    addClick (index){
      this.shopCar[index].num++
    },
    size (content){
      const { type } = content.detail
      const result =  type.find(item => item.id == content.size)
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
  },
  updated() {
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
  background: #fafafa;
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
      background: #fff;
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
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name{
          font-size: 32rpx;
        }
        .size_temp{
          font-size: 24rpx;
          color: #8a8a8a;
        }
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
  .sumprice{
    width: 100%;
    height: 120rpx;
    background: #fff;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    .left_sum{
      height: 100%;
      flex: 1;
      display: flex;
      padding: 0rpx 20rpx;
      align-items: center;
      .text{
        font-size: 28rpx;
        color: #8a8a8a;
      }
      .sum_num{
        font-size: 32rpx;
        color: #e64340;
      }
    }
    .btn{
      width: 180rpx;
      height: 100%;
      border-radius: 0;
      display: flex;
      align-items: center;
    }
  }
}

</style>
