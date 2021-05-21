/*
 * @Author: Zt2tzzt
 * @Date: 2020-10-10 16:22:11
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-05-20 14:42:28
 * @Description: file content
 */
// pages/login/index.js
Page({

  handleGetUserInfo (e) {
    const {userInfo} = e.detail
    wx.setStorageSync("userInfo", userInfo);
    wx.navigateBack({
      delta: 1
    });
  }
})
