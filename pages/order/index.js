/*
 * @Author: Zt2tzzt
 * @Date: 2020-10-10 16:22:11
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-05-21 16:49:09
 * @Description: file content
 */

/**
 * 1. 页面被打开的时候
 *  0/ onShow不同于onLoad，无法在形参上接收参数
 *  0.5. 判断缓存中有没有token
 *    1. 没有，直接跳转到授权页面
 *    2. 有，直接往下进行
 *  1. 获取url上的参数type
 *  2. 根据type来决定页面标题党数据元素，哪个被激活选中。
 *  2. 根据type 去发送请求获取订单数据
 *  3. 渲染页面
 * 2. 点击不同标题，重新发送请求获取和渲染数据
 */

import { request } from "../../request/idnex.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      }
    ],
    orders: []
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    const token = wx.getStorageSync("token");
    if (!token) {
      wx.navigateTo({
        url: '/pages/auth/index',
      });
      return;
    }


    // 1. 获取当前小程序的页面栈-数组，长度最大是10页面
    let pages = getCurrentPages()
    // 2. 数组中，索引最大的页面就是当前页面
    let currentPage = pages[pages.length - 1]
    // 3. 获取url上的type参数
    const { type } = currentPage.options
    // 4. 激活选中页面标签，当type = 1， index = 0
    this.changeTitleByIndex(type - 1)
    this.getOrders(type)
  },

  // 标题的点击事件
  handleTabItemChange(e) {
    // 1. 获取被点击的标题所以
    const { index } = e.detail
    this.changeTitleByIndex(index)
    // 2. 重新发送请求，type = 1， index = 0
    this.getOrders(index + 1)
  },

  // 根据标题索引来激活选中。标题数组
  changeTitleByIndex(index) {
    // 2. 修改原数组，产生激活选中效果
    let { tabs } = this.data
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false
    });
    // 3. 赋值到data中
    this.setData({
      tabs
    })
  },

  // 获取订单列表的方法
  async getOrders(type) {
    const res = await request({
      url: "/my/orders/all",
      data: { type }
    })


    this.setData({
      orders: res.orders.map(v => ({
        ...v,
        create_time_cn: new Date(v.create_time * 1000).toLocaleString()
      }))
    })
  }

})