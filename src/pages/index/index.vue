<template>
  <div class="container">
    <div class="link_to_shop">
      <button @click="linkToShop">商户管理界面</button>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
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
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
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
            },
          })
        }
      })
    },
    linkToShop() {
      wx.navigateTo({
        url: '../shop/main'
      })
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
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
