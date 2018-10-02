<template>
  <div class="container">
    <addMenuItem></addMenuItem>
    <div class="menu">
      <bannerControl title="轮播图"></bannerControl>
      <menuControl title="菜单类别"></menuControl>
      <goodsControl title="菜单详细"></goodsControl>
      <hotControl title="热门产品"></hotControl>
    </div>
  </div>
</template>

<script>

import db from '../../db/index.js'
import { chooseImage } from '../../utils/index.js'
import { uploadFile } from '../../server.js'

import card from '@/components/card'
import bannerControl from './components/bannerControl'
import menuControl from './components/menuControl'
import goodsControl from './components/goodsControl'
import hotControl from './components/hotControl'
import addMenuItem from './components/addMenuItem'

export default {
  data () {
    return {
    }
  },
  components: {
    bannerControl,
    menuControl,
    goodsControl,
    hotControl,
    addMenuItem
  },
  methods: {
  
  },
  created () {
  },
  updated() {
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #eee;
}
.menu{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
