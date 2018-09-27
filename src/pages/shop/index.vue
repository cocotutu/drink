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
                <input v-model="bannerForm.name" type="text"/>
              </div>
            </div>
            <div class="form_item">
              <div class="form_label">描述</div>
              <div class="form_value">
                <textarea v-model="bannerForm.data" placeholder="请输入详细信息" type="text"></textarea>
              </div>
            </div>
            <div class="form_item">
              <button @click="uploadFile">上传图片</button>
              <img v-show="bannerForm.url ? true : false" :src="bannerForm.url" alt="">
            </div>
            <div class="form_item">
              <button @click="saveBanner">保存</button>
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
                <textarea v-model="menuForm.data" placeholder="请输入详细信息" type="text"></textarea>
              </div>
            </div>
            <div class="form_item">
              <button @click="uploadFile">上传图片</button>
              <img v-show="menuForm.url ? true : false" :src="menuForm.url" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      bannerList: [],
      bannerAddView: false,
      menuAddView: false,
      menuList: [],
      bannerForm: {
        name: '',
        content: '',
        fileID: '',
        url: ''
      },
      menuForm: {
        name: '',
        content: '',
        fileID: '',
        url: ''
      },
    }
  },

  components: {
    card
  },
  methods: {
    addTap (path) {
      console.log(path)
      console.log(this[path])
      this[path] = !this[path]
    },
    saveBanner () {
      let arr = []      
      Object.entries(this.bannerForm).forEach(([key, value]) => {
        if( !value ) {
          arr.push(key)
        }
      })
      if( arr.length > 0 ) {
        wx.showToast({
          title: `内容填写不完整!`
        })
      }else{
        
      }
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    uploadFile() {
      wx.chooseImage({
        success: chooseResult => {
          // 将图片上传至云存储空间
          wx.cloud.uploadFile({
            // 指定上传到的云路径
            cloudPath: 'my-photo.png',
            // 指定要上传的文件的小程序临时文件路径
            filePath: chooseResult.tempFilePaths[0],
            // 成功回调
            success: res => {
              console.log('上传成功', res)
              this.bannerForm.fileID = res.fileID
              this.bannerForm.url = res.fileID

            },
          })
        }
      })
    },
    getBannerList (){
      wx.cloud.init()
      const db = wx.cloud.database()
      const bannerList = db.collection('bannerList')
      console.log('yes')
      bannerList.get({
        success: (res) => {
          // res.data 包含该记录的数据
          console.log(res.data)
          this.data.bannerList=res.data
        }
      })
    }
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
    this.getBannerList()
  },
  updated() {
    console.log(this.$data)
  }
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
