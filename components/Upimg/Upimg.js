/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-05-25 14:08:32
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-05-25 16:49:44
 * @LastEditContent: 
 */
// components/Upimg/Upimg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: ""
    },
    index: {
      type: Number,
      value: -1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleRemoveImg () {
      const index = this.data.index
      this.triggerEvent("remvoveImg", {index})
    }
  }
})
