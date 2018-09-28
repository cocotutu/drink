function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function chooseImage() {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      success: (chooseResult) => {
        resolve(chooseResult)
      },
      fail: res => {
        wx.showToast({
          title: '选择文件失败！'
        })
        reject(res)
      }
    })
  })
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export default {
  formatNumber,
  formatTime
}


