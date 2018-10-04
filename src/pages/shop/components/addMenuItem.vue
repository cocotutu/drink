<template>
  <div :class="getVisible == 'menu' ? 'show' : 'hidden'">
    <div class="container">
      <div class="form_item">
        <div class="form_label">名称</div>
        <div class="form_value">
          <input v-model="form.name" type="text" placeholder="名称" />
        </div>
      </div>
      <div class="form_item">
        <div class="form_label">描述</div>
        <div class="form_value">
          <input v-model="form.content" placeholder="请输入详细信息" type="text" />
        </div>
      </div>
      <div class="form_item form_item_img">
        <button @click="uploadFile('form')">上传图片</button>
        <img v-show="form.fileID ? true : false" :src="form.fileID" alt="">
      </div>
      <div class="footer">
        <button class="confirm" type="primary" @click="saveBanner">确定</button>
        <button class="cancel" @click="changeModelVisible">取消</button>
      </div>
    </div>
  </div>  
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import db from '@/db/index.js'
import { uploadFile } from '@/server.js'
import { chooseImage } from '@/utils'

export default {
  data (){
    return {
      form: {
        name: null,
        content: null,
        fileID: null,
      }
    }
  },
  methods: {
    async uploadFile() {
      console.log('yes')
      const choseRes = await chooseImage()
      const res = await uploadFile(choseRes)
      this.form.fileID = res
    },
    async saveBanner () {
      let arr = []
      const values = this.form
      Object.entries(values).forEach(([key, value]) => {
        if( !value ) {
          arr.push(key)
        }
      })
      if( arr.length > 0 ) {
        wx.showToast({
          title: `内容填写不完整!${arr.join('.')}`
        })
      }else{
        const res = await db.menu.add(values)
        console.log(res)
        this.form =  {
          name: '',
          content: '',
          fileID: ''
        }
        this.changeModelVisible('')
      }
    },
    ...mapMutations(['changeModelVisible'])
  },
  computed: {
    ...mapState({
      getVisible: (state) => state.shop.visibleModel
    })
  }
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
  button{
    border: none;
    border-radius: 0rpx;
  }
  button::after{
    border: none;
    border-radius: 0rpx;
  }
  button::before{
    border: none;
    border-radius: 0rpx;
  }
  .form_item{
    width: 100%;
    padding: 10rpx;
    display: flex;
    flex-direction: row;
    padding: 0rpx 30rpx;
    border-bottom: 1rpx solid #eee;
    .form_label{
      min-width: 180rpx;
      height: 90rpx;
      line-height: 90rpx;
    }
    .form_value{
      flex: 1;
      height: 90rpx;
      padding-left: 10rpx;
      input{
        border: none;
      }
    }
  }
  .form_item_img{
    flex-direction: column;
    padding: 0rpx;
    button{
      width: 100%;
    }
  }
  .footer{
    width: 100%;
    display: flex;
    flex-direction: row;
    button{
      flex: 1;
    }
  }
}

</style>

