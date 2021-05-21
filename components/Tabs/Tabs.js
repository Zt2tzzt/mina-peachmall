/*
 * @Author: Zt2tzzt
 * @Date: 2020-10-20 09:45:07
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-10-20 10:17:59
 * @Description: file content
 */
// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
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
    // 点击事件
    handleItemTab (e) {
      // 1. 获取点击事件索引
      const {index} = e.currentTarget.dataset
      // 2. 触发父组件中的事件
      this.triggerEvent("tabItemChange", {index})
    }
  }
})
