/*
 * @Author: Zt2tzzt
 * @Date: 2020-10-10 16:22:11
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-10-29 09:34:41
 * @Description: file content
 */
// pages/user/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    // 被收藏的商品数量
    collectNums: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const userInfo = wx.getStorageSync("userInfo");
    const collect = wx.getStorageSync("collect");

    this.setData({
      userInfo,
      collectNums: collect.length
    })
  },

})