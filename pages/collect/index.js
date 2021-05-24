/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2020-11-18 09:49:16
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-05-24 14:17:55
 * @LastEditContent: 
 */
// pages/collect/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect: [],
    tabs: [
      {
        id: 0,
        value: '商品收藏',
        isActive: true
      },
      {
        id: 1,
        value: '品牌收藏',
        isActive: false
      },
      {
        id: 2,
        value: '店铺收藏',
        isActive: false
      },
      {
        id: 3,
        value: '浏览足迹',
        isActive: false
      }
    ],
  },

  onShow: function () {
    const collect = wx.getStorageSync("collect");

    this.setData({
      collect
    })
  },

  // 标题的点击事件
  handleTabItemChange(e) {
    // 1. 获取被点击的标题所以
    const { index } = e.detail
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

})
