<template>
  <div class="container">
    <span class="name">{{data.name}}</span>
    <icon class="edit" type="search">编辑</icon>
    <icon class="del" type="clear" @click="del">删除</icon>
  </div>
</template>

<script>

import db from '@/db'


export default {
  props: ['data', 'path', 'load'],
  data (){
    return {

    }
  },
  methods: {
    async del (){
      const res = await db[this.path].remove(this.data['_id'])
      if( res.errMsg.includes('ok') ) {
        wx.showToast({
          title: '删除成功！'
        })
      }else{
        wx.showToast({
          title: '删除失败！'
        })
      }
      this.load()
    }
  },
  created(){
  },
  updated (){
    
  }
}
  
</script>

<style scoped>
.container{
  display: flex;
  padding: 0 10rpx;
  flex-direction: row;
}
.name{
  width: 80%;
  display: inline-block;
}
.edit{
  width: 10%;
  display: flex;
  align-items: center;
}
.del{
  width: 10%;
  display: flex;
  align-items: center;
}
</style>
