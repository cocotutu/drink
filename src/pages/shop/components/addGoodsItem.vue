<template>
  <div :class="getVisible == 'goods' ? 'show' : 'hidden'">
    <div class="container">
      <div class="form_item">
        <div class="form_label">名称</div>
        <div class="form_value">
          <input v-model="form.name" type="text" placeholder="名称" />
        </div>
      </div>
      <div class="form_item">
        <div class="form_label">描述</div>
        <div class="form_value">
          <input v-model="form.content" placeholder="请输入详细信息" type="text" />
        </div>
      </div>
      <div class="form_item" v-for="(item, index) in form.type" :key="index">
        <div class="form_label">
          <switch type="checkbox"  @change="(e) => typeChange(e, index)" :checked="item.checked" />
          <span>{{item.name}}</span>
        </div>
        <div class="form_value">  
          <input type="number" v-model="item.value" placeholder="价格" />
        </div>
      </div>
      <div class="form_item">
        <div class="form_label">
          温度
        </div>
        <div class="form_value">
          <checkbox-group class="checkbox_group" @change="checkboxChange">
            <label class="checkbox" v-for="(item, index) in form.temp" :key="index">
              <checkbox :value="item.value" :checked="item.checked" />{{item.name}}
            </label>
          </checkbox-group>
        </div>
      </div>
      <div class="form_item">
        <picker class="weui-btn" @change="pickerChange"  :range="menuListName">
          <div class="select_container">
            <div class="form_label">
              所属分类
            </div>
            <div class="form_value">
              {{form.parent && form.parent.name ? form.parent.name : ''}}
            </div>
          </div>
        </picker>
      </div>
      <div class="form_item form_item_img">
        <button @click="uploadFile('form')">上传图片</button>
        <img v-show="form.fileID ? true : false" :src="form.fileID" alt="">
      </div>
      <div class="footer">
        <button class="confirm" type="primary" @click="save">确定</button>
        <button class="cancel" @click="changeModelVisible()">取消</button>
      </div>
    </div>
  </div>  
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import db from '@/db/index.js'
import { uploadFile } from '@/server.js'
import { chooseImage } from '@/utils'


const initForm = {
  name: null,
  content: null,
  fileID: null,
  parent: null,
  type: [
    {
      name: '小杯',
      id: 0,
      value: null,
      checked: false
    },
    {
      name: '大杯',
      id: 1,
      value: null,
      checked: false
    },
    {
      name: '超大杯',
      id: 2,
      value: null,
      checked: false
    }
  ],
  temp: [
    {
      name: '常温',
      value: 'normal',
      checked: true
    },
    {
      name: '加冰',
      value: 'ice'
    },
    {
      name: '热',
      value: 'hot'
    }
  ],
}

export default {
  data (){
    return {
      form: initForm
    }
  },
  methods: {
    async uploadFile() {
      const choseRes = await chooseImage()
      const res = await uploadFile(choseRes)
      this.form.fileID = res
    },
    async save () {
      console.log(6666)
      if( this.check() ){
        console.log(this.form)
        const res = await db.goods.add(this.form)
        console.log(res)
        this.form =  initForm
        this.changeModelVisible()
      }
    },
    check (){
      const form = this.form
      //检查名称
      if(!form.name){
        wx.showToast({
          title: '名称没有填写!'
        })
        return false
      }
      if( !form.parent ){
        wx.showToast({
          title: '没有选择父类!'
        })
        return false
      }
      const typeHave = form.type.find(item => item.checked === true)
      if( !typeHave ){
        wx.showToast({
          'title': '至少选择一种杯子类型!'
        })
        return false
      }
      let flag = false
      form.type.map((item) => {
        if( item.checked && !item.value ){
          flag = true
          wx.showToast({
            title: `${item.name}没有填写价格!`
          })
        }
      })
      if( flag ){
        return false
      }
      const tempHave = form.temp.find(item => item.checked === true)
      if( !tempHave ){
        wx.showToast({
          title: '至少选择一种温度的杯子!'
        })
        return false
      }else{
        return true
      }
    },
    checkboxChange (e){
      const values = e.mp.detail.value
      const temp = this.form.temp
      const result = temp.map(item => {
        if( values.includes(item.value) ){
          return {
            ...item,
            checked: true
          }
        }else{
          return {
            ...item,
            checked: false
          }
        }
      })
      this.form.temp = result
    },
    typeChange (e, index){
      const value = e.mp.detail.value
      this.form.type[index].checked = value
    },
    pickerChange (e){
      const index = parseInt(e.mp.detail.value)
      this.form.parent = this.menuList[index]
      this.form.parentId = this.menuList[index]['id']
    },
    ...mapMutations(['changeModelVisible'])
  },
  computed: {
    ...mapState({
      getVisible: (state) => state.shop.visibleModel,
      menuListName: (state) => {
        return state.menuList.map(item => item.name)
      },
      menuList: 'menuList'
    })
  },
  updated() {
  },
}
</script>

<style scoped lang="less">
.hidden{
  display: none;
}
.show{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, 0.5);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  padding: 3%;
  box-sizing: border-box;
  overflow: auto;
}
.container{
  height: auto;
  background: #fff;
  overflow: hidden;
  padding: 40rpx 0rpx;
  button{
    border: none;
    border-radius: 0rpx;
  }
  button::after{
    border: none;
    border-radius: 0rpx;
  }
  button::before{
    border: none;
    border-radius: 0rpx;
  }
  .form_item{
    width: 100%;
    padding: 10rpx;
    display: flex;
    flex-direction: row;
    padding: 0rpx 30rpx;
    border-bottom: 1rpx solid #eee;
    .form_label{
      min-width: 180rpx;
      height: 90rpx;
      line-height: 90rpx;
    }
    .form_value{
      flex: 1;
      height: 90rpx;
      padding-left: 10rpx;
      input{
        border: none;
      }
    }
    .checkbox_group{
      line-height: 90rpx;
      padding-left: 20rpx;
    }
    picker{
      width: 100%;
      .select_container{
        width: 100%;
        display: flex;
        flex-direction: row;
        div{
          float: left;
        }
        .form_value{
          padding: 20rpx;
        }
      }
    }
  }
  .form_item_img{
    flex-direction: column;
    padding: 0rpx;
    button{
      width: 100%;
    }
  }
  .footer{
    width: 100%;
    display: flex;
    flex-direction: row;
    button{
      flex: 1;
    }
  }
}

</style>

