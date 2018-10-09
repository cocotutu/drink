<template>
  <div :class="visible ? 'show' : 'hidden'">
    <div class="container">
      <div class="head">
        <img :src="goods.fileID" />
      </div>
      <div class="content">
        <div class="form_name">
          {{goods.name}}
        </div>
        <div class="form_item">
          <div class="item_label">
            规格
          </div>
          <ul class="item_value">
            <li 
              v-for="(item, index) in goods.type" 
              v-if="item.checked" 
              :key="index" 
              @click="sizeClick(item)"
              :class="item.id == size ? 'selected': ''"
            >
              {{item.name}}
            </li>
          </ul>
        </div>
        <div class="form_item">
          <div class="item_label">
            温度
          </div>
          <ul class="item_value">
            <li 
              v-for="(item, index) in goods.temp" 
              v-if="item.checked" 
              :key="index" 
              @click="tmpClick(item)"
              :class="item.value == temp ? 'selected': ''"
            >
              {{item.name}}
            </li>
          </ul>
        </div>
        <div class="form_detail">
          {{goods.content}}
        </div>
      </div>
      <div class="footer">
        <div class="shopCar">
          <div class="selected_value">
            <div class="sum_price">
              ￥ 100
            </div>
            <div class="remark">
              标准美式
            </div>
          </div>
          <div class="count">
            <div class="minus">-</div>
            <div class="num">5</div>
            <div class="add">+</div>
          </div>
        </div>
        <div class="footer_btn">
          <button class="confirm" type="primary" @click="save">加入购物车</button>
          <button class="cancel" @click="changeModelVisible()">取消</button>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>

export default {
  props: ['visible', 'goods', 'callBack'],
  data (){
    return {
      size: null,
      temp: null
    }
  },
  methods: {
    changeModelVisible (){
      this.callBack()
    },
    sizeClick (item){
      this.size = item.id
    },
    tmpClick (item){
      this.temp = item.value
    }
  },
  computed: {
    
  },
}
</script>

<style scoped lang="less">
.hidden{
  display: none;
}
.show{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  padding: 10%;
  box-sizing: border-box;
  overflow: auto;
}
.container{
  height: auto;
  background: #fff;
  overflow: hidden;
  padding: 40rpx 0rpx 0rpx 0rpx;
  display: flex;
  flex-direction: column;
  border-radius: 10rpx;
  .head{
    width: 100%;
    height: 200rpx;
    background: #f1f1f1;
    img{
      width: 100%;
      height: 200rpx;
    }
  }
  .content{
    width: 100%;
    flex: 1;
    overflow: auto;
    background: #fafafa;
    box-sizing: border-box;
    padding: 10rpx 14rpx;
    &>div{
      margin-bottom: 30rpx;
    }
    .form_name{
      font-size: 28rpx;
      color: #888;
      padding: 10rpx 0rpx;
      border-bottom: 1rpx solid #eee;
    }
    .form_detail{
      font-size: 24rpx;
      color: #888;
      padding: 10rpx 0rpx;
      border-top: 1rpx solid #eee;
    }
    .form_item{
      display: flex;
      flex-direction: row;
      .item_label{
        width: 60rpx;
        line-height: 50rpx;
        font-size: 24rpx;
        color: #8a8a8a;
      }
      .item_value{
        height: auto;
        flex: 1;
        overflow: hidden;
        flex-wrap: wrap;
        justify-content: space-around;
        li{
          width: 90rpx;
          float: left;
          font-size: 24rpx;
          color: #8a8a8a;
          padding: 8rpx 25rpx;
          background: #fff;
          border: 1rpx solid #eee;
          border-radius: 28rpx;
          margin: 0 15rpx;
          text-align: center;
        }
        .selected{
          background: #09bb07;
          color: #fff;
        }
      }
    }
  }
  .footer{
    width: 100%;
    height: auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .shopCar{
      width: 100%;
      height: auto;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      box-sizing: border-box;
      padding: 6rpx 10rpx;
      border-bottom: 1rpx solid #eee;
      .selected_value{
        height: auto;
        flex: 1;
        display: flex;
        flex-direction: column;
        .sum_price{
          width: 100%;
          padding: 8rpx 10rpx;
          font-size: 28rpx;
          box-sizing: border-box;
          color: #e64340;
        }
        .remark{
          width: 100%;
          padding: 8rpx 10rpx;
          font-size: 24rpx;
          box-sizing: border-box;
          color: #8a8a8a;
        }
      }
      .count{
        width: 180rpx;
        height: auto;
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
            font-size: 32rpx;
            color: #e64340;
            border: none;
        }
      }
    }
    .footer_btn{
      width: 100%;
      height: 80rpx;
      display: flex;
      flex-direction: row;
      padding: 10rpx;
      box-sizing: border-box;
      button{
          height: 60rpx;
          line-height: 60rpx;
          font-size: 28rpx;
          padding: 0rpx 30rpx;
      }
    }
  }
}

</style>

