<template>
  <div class="container">
    <p>店家</p>
    <div>
      <div class="add_item">
        <div>名称</div>
        <input v-model="addData.name" type="text"/>
      </div>
      <div class="add_item">
        <div>描述</div>
        <textarea v-model="addData.data" placeholder="请输入详细信息" type="text"></textarea>
      </div>
      <div class="add_item">
        <button @click="uploadFile">上传图片</button>
        <img v-if="addData.url ? true : false" :src="addData.url" alt="">
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
      addData: {
        name: '',
        data: '',
        url: '',
        fileID: '',

      }
    }
  },

  components: {
    card
  },

  methods: {
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
              this.downloadFile(res.fileID, this.data.addData.url)
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
    },
    downloadFile(id, path) {
      wx.cloud.downloadFile({
        fileID: id, // 文件 ID
        success: res => {
          // 返回临时文件路径
          console.log(res.tempFilePath)
          this.data.addData.url = res.tempFilePath
        },
        fail: console.error
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
</style>
