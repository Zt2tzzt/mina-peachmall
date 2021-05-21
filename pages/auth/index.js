/*
 * @Author: Zt2tzzt
 * @Date: 2020-10-10 16:22:11
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-05-20 09:49:06
 * @Description: file content
 */
// pages/auth/index.js

import { request } from "../../request/idnex.js"
import { login } from "../../utils/asyncWx.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"

Page({

  // 获取用户信息
  async handleGetUserInfo(e) {

    try {
      // 1. 过去用户信息
      const { encryptedData, rawData, iv, signature } = e.detail;
      // 2. 获取小程序登陆成功后的code值
      const { code } = await login();

      const loginParams = { encryptedData, rawData, iv, signature, code }

      // 3. 发送请求，获取用户的token值
      const res = await request({
        url: "/user/wxwlogin",
        data: loginParams,
        method: "POST"
      })

      // const {token} = res
      
      // 4. 把token存储在缓存中，同时跳转回上一个页面
      wx.setStorageSync('token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo');
      wx.navigateBack({
        delta: 1
      });

      
    } catch (error) {
      console.log(error)
    }

  }

})
