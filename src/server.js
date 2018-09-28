export function uploadFile (file) {
  return new Promise((resolve, reject) => {
    wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: file.tempFilePaths[0].replace(/^.+\/(.+\.\w+)$/g, '$1'),
      // 指定要上传的文件的小程序临时文件路径
      filePath: file.tempFilePaths[0],
      // 成功回调
      success: res => {
        wx.showToast({title: '上传文件成功!'})
        resolve(res.fileID)
      },
      fail: res => {
        wx.showToast({title: '上传文件失败!'})
        reject(res)
      }
    })
  })
}


export function getUserInfo() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: () => {
        wx.getUserInfo({
          success: (res) => {
            resolve(res.userInfo)
          },
          fail: (res) => {
            wx.showToast({
              title: '获取用户信息失败！'
            })
            reject(res)
          }
        })
      }
    })
  })
}

