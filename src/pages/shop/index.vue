<template>
  <div class="container">
    <div class="menu">
      <div class="menu_item">
        <div class="menu_item_title">
          <button>bannerList 首页轮播图</button>
        </div>
        <div class="menu_item_content">
          <ul class="have_list">
            <li class="have_list_item" v-for="(item, index) in bannerList" :key="index">
              {{item.name}}
            </li>
            <li class="have_list_item align_center" v-show="bannerList.length > 0 ? false : true">
              <span>暂无列表</span>
            </li>
          </ul>
          <div class="form_add_btn">
            <button @click="addTap('bannerAddView')">
              {{bannerAddView ? '取消' : '添加'}}
            </button>
          </div>
          <div v-show="bannerAddView" class="form">
            <div class="form_item">
              <div class="form_label">名称</div>
              <div class="form_value">
                <input v-model="bannerForm.name" type="text" />
              </div>
            </div>
            <div class="form_item">
              <div class="form_label">描述</div>
              <div class="form_value">
                <textarea v-model="bannerForm.content" placeholder="请输入详细信息" type="text"></textarea>
              </div>
            </div>
            <div class="form_item">
              <button @click="uploadFile('bannerForm')">上传图片</button>
              <img v-show="bannerForm.fileID ? true : false" :src="bannerForm.fileID" alt="">
            </div>
            <div class="form_item">
              <button @click="saveBanner('banner')">保存</button>
            </div>
          </div>
        </div>
      </div>
      <div class="menu_item">
        <div class="menu_item_title">
          <button>menu 商品分类</button>
        </div>
        <div class="menu_item_content">
          <ul class="have_list">
            <li class="have_list_item" v-for="(item, index) in menuList" :key="index">
              {{item.name}}
            </li>
            <li class="have_list_item align_center" v-show="menuList.length > 0 ? false : true">
              <span>暂无列表</span>
            </li>
          </ul>
          <div class="form_add_btn">
            <button @click="addTap('menuAddView')">
              {{menuAddView ? '取消' : '添加'}}
            </button>
          </div>
          <div class="form" v-show="menuAddView">
            <div class="form_item">
              <div class="form_label">名称</div>
              <div class="form_value">
                <input v-model="menuForm.name" type="text"/>
              </div>
            </div>
            <div class="form_item">
              <div class="form_label">描述</div>
              <div class="form_value">
                <textarea v-model="menuForm.content" placeholder="请输入详细信息" type="text"></textarea>
              </div>
            </div>
            <div class="form_item">
              <button @click="uploadFile('menuForm')">上传图片</button>
              <img v-show="menuForm.fileID ? true : false" :src="menuForm.fileID" alt="">
            </div>
            <div class="form_item">
              <button @click="saveBanner('menu')">保存</button>
            </div>
          </div>
        </div>
      </div>
      <div class="menu_item">
        <div class="menu_item_title">
          <button>goods 商品信息</button>
        </div>
        <div class="menu_item_content">
          <ul class="have_list">
            <li class="have_list_item" v-for="(item, index) in goodsList" :key="index">
              {{item.name}}
            </li>
            <li class="have_list_item align_center" v-show="goodsList.length > 0 ? false : true">
              <span>暂无列表</span>
            </li>
          </ul>
          <div class="form_add_btn">
            <button @click="addTap('goodsAddView')">
              {{goodsAddView ? '取消' : '添加'}}
            </button>
          </div>
          <div class="form" v-show="goodsAddView">
            <div class="form_item">
              <div class="form_label">名称</div>
              <div class="form_value">
                <input v-model="goodsForm.name" type="text"/>
              </div>
            </div>
            <div class="form_item">
              <div class="form_label">描述</div>
              <div class="form_value">
                <textarea v-model="goodsForm.content" placeholder="请输入详细信息" type="text"></textarea>
              </div>
            </div>
            <div class="form_item">
              <button @click="uploadFile('goodsForm')">上传图片</button>
              <img v-show="goodsForm.fileID ? true : false" :src="goodsForm.fileID" alt="">
            </div>
            <div class="form_item">
              <button @click="saveBanner('goods')">保存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import db from '../../db/index.js'
import { chooseImage } from '../../utils/index.js'
import { uploadFile } from '../../server.js'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      bannerList: [],
      menuList: [],
      goodsList: [],
      bannerAddView: false,
      menuAddView: false,
      goodsAddView: false,
      bannerForm: {
        name: '',
        content: '',
        fileID: ''
      },
      menuForm: {
        name: '',
        content: '',
        fileID: ''
      },
      goodsForm: {
        name: '',
        content: '',
        fileID: ''
      },
    }
  },

  components: {
    card
  },
  methods: {
    addTap (path) {
      this[path] = !this[path]
    },
    async saveBanner (path) {
      let arr = []
      const values = this[`${path}Form`]
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
        const res = await db[path].add(values)
        this[`${path}Form`] =  {
          name: '',
          content: '',
          fileID: ''
        }
        this[`${path}AddView`] = false
        this.getList(path)
      }
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    async uploadFile(path) {
      if( !path ){
        return
      }
      const choseRes = await chooseImage()
      const res = await uploadFile(choseRes)
      this[path].fileID = res
    },
    async getList (path){
      console.log('load banner list')
      const res = await db[path].getList()
      if( res.errMsg.includes('ok') ) {
        this[`${path}List`] = res.data
      }
    }
  },
  created () {
    this.getList('banner')
    this.getList('menu')
    this.getList('goods')
  },
  updated() {
  },
}
</script>

<style scoped>
.container{
  width: 100%;
  height: auto;
  overflow: hidden;
  background: #eee;
}
.menu{
  width: 100%;
  height: auto;
  overflow: hidden;
}
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
