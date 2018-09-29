<template>
  <div class="container">
    <div class="title">
      <span class="title_label">{{title}}</span>
      <span class="title_icon">
        <img :src="icon"/>
      </span>
    </div>
    <ul class="list">
      <li class="item" v-for="(item, index) in list" :key="index">
        <div :class="index%2 == 0 ? 'item_container fanxiang' : 'item_container'">
          <div class="item_img">
            <img :src="item.fileID" />
          </div>
          <div class="item_detail">
            <div class="item_name">
              <span>{{item.name}}</span>
            </div>
            <div class="item_content">
              <span>{{item.content}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  props: ['list', 'title', 'icon'],
  data () {
    return {

    }
  },
  methods: {

  },
  created() {
    
  }
}

</script>

<style scoped lang="less">
.container{
  width: 100%;
  padding: 0 40rpx;
  height: auto;
  overflow: hidden;
}
.title{
  width: 100%;
  padding: 20rpx 0rpx;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #eee;
  justify-content: space-between;
  .title_label{
    color: #8a8a8a;
  }
  .title_icon{
    display: flex;
    align-items: center;
    img{
      width: 60rpx;
      height: 60rpx;
      border-radius: 100%;
      border: 5rpx solid #eee;
    }
  }
}
.list{
  width: 100%;
  .item{
    width: 100%;
    height: auto;
    overflow: hidden;
    padding: 20rpx 0rpx;
    border-bottom: 1px solid #eee;
    .item_container{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .item_img{
        width: 300rpx;
        height: 300rpx;
        img{
          width: 300rpx;
          height: 300rpx;
        }
      }
      .item_detail{
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 20rpx;
        justify-content: space-around;
      }
    }
    .fanxiang{
      flex-direction: row-reverse;
    }
    .item_name{
      color: #8a8a8a;
      text-align: center;
      height: 60rpx;
      line-height: 60rpx;
      overflow: hidden;
      span{
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      
    }
    .item_content{
      color: #8a8a8a;
      font-size: 30rpx;
      text-indent: 30rpx;
    }
  }
}
</style>