<template>
  <div class="menu_item">
    <div class="menu_item_title">
      <button>商品菜单项</button>
    </div>
    <div class="menu_item_content">
      <ul class="have_list">
        <li class="have_list_item" v-for="(item, index) in list" :key="index">
          <controlItem :data="item" path="menu" :load="getList"></controlItem>
        </li>
        <li class="have_list_item align_center" v-show="list.length > 0 ? false : true">
          <span>暂无列表</span>
        </li>
      </ul>
      <div class="form_add_btn">
        <button @click="addTap">
          添加
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

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
    }
  },
  computed: {
    ...mapState({
      list: 'menuList'
    })
  },
  methods: {
    addTap () {
      this.changeModelVisible('menu')
    },
    ...mapMutations(['changeModelVisible'])
  },
  created () {
  },
  updated() {
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
