/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2020-11-18 09:49:16
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-05-24 17:16:12
 * @LastEditContent: 
 */
/**
 * 1. 输入框绑定，值改变事件 ，input事件
 *  1. 获取到输入框的值
 *  2. 合法性判断
 *  3. 检验通过把输入框的值发送到后台
 *  4. 返回的数据打印到页面上
 * 2. 防抖（防止抖动）/节流，用定时器实现
 *  1. 定义全局的定时器Id
 * 
 */

 import { request } from "../../request/idnex.js"
 import regeneratorRuntime from '../../lib/runtime/runtime.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    // 取消按钮是否显示。
    isFocus: false,
    inputValue: ""
  },

  TimeId: -1,

  // 输入框的值改变，就会触发的事件。
  handleInput (e) {
    // 1. 获取输入框的值
    const {value} = e.detail
    // 2. 检测合法性
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false
      })
      clearTimeout(this.TimeId)
      // 值不合法
      return
    }

    this.setData({
      isFocus: true
    })
    // 3. 准备发送请求获取数据
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(() => {
      this.qsearch(value)
    }, 1000);
  },

  async qsearch(query) {
    const res = await request({
      url: "/goods/qsearch",
      data: {query}
    })

    this.setData({
      goods: res
    })
  },

  // 点击取消按钮
  handCancel () {
    this.setData({
      isFocus: false,
      goods: [],
      inputValue: ""
    })
    clearTimeout(this.TimeId)
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})