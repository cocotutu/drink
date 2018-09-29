<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
input{
  width: 100%;
  padding: 20rpx;
  border-radius: 4rpx;
  background: #fff;
  border: 1px solid #eee;
}
textarea{
  width: 100%;
  border-radius: 4rpx;
  background: #fff;
  border: 1px solid #eee;
}

</style>
