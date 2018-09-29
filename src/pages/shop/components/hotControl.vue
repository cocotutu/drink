<template>
  <div class="menu_item">
    <div class="menu_item_title">
      <button>热门商品</button>
    </div>
    <div class="menu_item_content">
      <ul class="have_list">
        <li class="have_list_item" v-for="(item, index) in list" :key="index">
          <controlItem :data="item" path="hot" :load="getList"></controlItem>
        </li>
        <li class="have_list_item align_center" v-show="list.length > 0 ? false : true">
          <span>暂无列表</span>
        </li>
      </ul>
      <div class="form_add_btn">
        <button @click="addTap">
          {{addVisible ? '取消' : '添加'}}
        </button>
      </div>
      <div v-show="addVisible" class="form">
        <div class="form_item">
          <div class="form_label">名称</div>
          <div class="form_value">
            <input v-model="form.name" type="text" />
          </div>
        </div>
        <div class="form_item">
          <div class="form_label">描述</div>
          <div class="form_value">
            <textarea v-model="form.content" placeholder="请输入详细信息" type="text"></textarea>
          </div>
        </div>
        <div class="form_item">
          <button @click="uploadFile">上传图片</button>
          <img v-show="form.fileID ? true : false" :src="form.fileID" alt="">
        </div>
        <div class="form_item">
          <button @click="save">保存</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/db/index.js'
import { chooseImage } from '@/utils/index.js'
import { uploadFile } from '@/server.js'

import controlItem from './controlItem'

export default {
  props: ['text'],
  components: {
    controlItem
  },
  data (){
    return {
      form: {
        name: '',
        content: '',
        fileID: ''
      },
      list: [],
      addVisible: false,
    }
  },
  methods: {
    addTap () {
      this.addVisible = !this.addVisible
    },
    async save () {
      let arr = []
      const values = this.form
      Object.entries(values).forEach(([key, value]) => {
        if( !value ) {
          arr.push(key)
        }
      })
      console.log(values)
      if( arr.length > 0 ) {
        wx.showToast({
          title: `内容填写不完整!${arr.join('.')}`
        })
      }else{
        const res = await db.hot.add(values)
        this.form =  {
          name: '',
          content: '',
          fileID: ''
        }
        this.addVisible = false
        this.getList()
      }
    },
    async uploadFile() {
      const choseRes = await chooseImage()
      const res = await uploadFile(choseRes)
      this.form.fileID = res
    },
    async getList (){
      console.log('load hot list')
      const res = await db.hot.getList()
      if( res.errMsg.includes('ok') ) {
        this.list = res.data
      }
    }
  },
  created () {
    this.getList()
  },
}
</script>

<style scoped>
.menu_item{
  width: 100%;
  height: auto;
  margin-bottom: 10rpx;
}
.menu_item_title{
  width: 100%;
}
.menu_item_content{
  width: 100%;
  height: auto;
  overflow: hidden;
}
.align_center{
  text-align: center;
}
.have_list{
  width: 100%;
  height: auto;
  overflow: hidden;
  margin-bottom: 10rpx;
}
.have_list_item{
  width: 100%;
  height: 85rpx;
  line-height: 85rpx;
  border-bottom: 1px solid #bbb;
  background: #fff;
}
</style>
