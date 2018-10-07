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
              @click="sizeClick(item)"
              :class="item.id == size ? 'selected': ''"
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
        <button class="confirm" type="primary" @click="save">确定</button>
        <button class="cancel" @click="changeModelVisible()">取消</button>
      </div>
    </div>
  </div>  
</template>

<script>

export default {
  props: ['visible', 'goods', 'callBack'],
  data (){
    return {
      size: null
    }
  },
  methods: {
    changeModelVisible (){
      this.callBack()
    },
    sizeClick (item){
      console.log(item)
      this.size = item.id
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
  padding: 3%;
  box-sizing: border-box;
  overflow: auto;
}
.container{
  height: auto;
  background: #fff;
  overflow: hidden;
  padding: 40rpx 0rpx;
  display: flex;
  flex-direction: column;
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
          padding: 8rpx 30rpx;
          background: #fff;
          border: 1rpx solid #eee;
          border-radius: 28rpx;
          margin: 0 20rpx;
          text-align: center;
        }
      }
    }
  }
  .footer{
    width: 100%;
    height: 80rpx;
    display: flex;
    flex-direction: row;
  }
}

</style>

