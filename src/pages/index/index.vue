<template>
  <div class="container">
    <bannerSwiper :data="bannerList"></bannerSwiper>
    <div class="main">
      <div class="menu_item">
        <div class="menu_item_container">
          <span class="menu_item_container_tit">现在下单</span>
          <span class="menu_item_container_icon">
            <img src="../../../static/img/coffee.png"/>
          </span>
        </div>
      </div>
      <div class="hot_top">
        <goodsList :list="hotList" title="热门产品" icon="cloud://xiaowu-ce41fe.7869-xiaowu-ce41fe/setting/推荐.png"></goodsList>
      </div>
      <div class="recommend_top"></div>
      <div class="menu_item">
        <div class="menu_item_container" @click="linkToShop">
          <span class="menu_item_container_tit">商户设置</span>
          <span class="menu_item_container_icon">
            <img src="../../../static/img/setting.png"/>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

import db from '@/db'


import card from '@/components/card'
import bannerSwiper from '@/components/bannerSwiper'
import goodsList from '@/components/goodsList'

export default {
  components: {
    bannerSwiper,
    card,
    goodsList
  },
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      bannerList: [],
      hotList: []
    }
  },
  methods: {
    linkToShop() {
      wx.navigateTo({
        url: '../shop/main'
      })
    },
    async loadBannerList () {
      const res = await db.banner.getList()
      this.bannerList = res.data
    },
    async loadHotList () {
      const res = await db.hot.getList()
      this.hotList = res.data
    },
    ...mapActions(['getUser', 'getMenuList'])
  },
  computed: mapState({
    user (state) {
      return state.userInfo
    }
  }),
  created () {
    this.loadBannerList()
    this.loadHotList()
    this.getUser()
    this.getMenuList('init')
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
.main{
  width: 100%;
  height: auto;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.menu_item{
  height: auto;
  overflow: hidden;
  padding: 0rpx 40rpx;
}
.menu_item_container{
  padding: 20rpx 0rpx;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}
.menu_item_container_tit{
  color: #8a8a8a;
}
.menu_item_container_icon {
  display: flex;
  align-items: center;
}
img{
  width: 60rpx;
  height: 60rpx;
  border-radius: 100%;
  border: 5rpx solid #eee;
}
</style>
