<template>
  <div class="container">
    <div class="menu">
      <bannerControl title="轮播图"></bannerControl>
      <menuControl title="菜单类别"></menuControl>
      <goodsControl title="菜单详细"></goodsControl>
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
import bannerControl from '@/components/bannerControl'
import menuControl from '@/components/menuControl'
import goodsControl from '@/components/goodsControl'
import db from '../../db/index.js'
import { chooseImage } from '../../utils/index.js'
import { uploadFile } from '../../server.js'

export default {
  data () {
    return {
    }
  },
  components: {
    bannerControl,
    menuControl,
    goodsControl
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
  height: auto;
  overflow: hidden;
  background: #eee;
}
.menu{
  width: 100%;
  height: auto;
  overflow: hidden;
}
</style>
