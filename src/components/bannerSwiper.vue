<template>
  <swiper class="container" :autoplay="true" :indicator-dots="true" :interval="2000">
    <div v-for="(item, index) in data" :key="index">
      <swiper-item class="item_swiper">
        <img :src="item.fileID" class="slide-image" />
      </swiper-item>
    </div>
  </swiper>
</template>

<script>

export default {
  props: ['data'],
  data () {
    return {}
  },
  methods: {
    
  },
  created() {
    console.log('this.$data')
  }
}
  
</script>

<style scoped>
.container{
  width: 100%;
  height: 300rpx;
}
.item{
  width: 100%;
  height: 100%;
}
img{
  width: 100%;
  height: 100%;
}
</style>