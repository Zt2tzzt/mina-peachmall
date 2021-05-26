/*
 * @Author: Zt2tzzt
 * @Date: 2020-10-10 16:01:13
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-05-26 14:58:55
 * @Description: file content
 */
// pages/category/index.js

// 0映入，用来发送请求的方法
import { request } from "../../request/idnex.js"


Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    catesList: [],
    // 楼层数据
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1. 发送衣服请求，获取轮播图数据 优化的手段可以通过 es6 的 promise 来解决这个问题
    /* var reqTask = wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result) => {
        console.log(result)
        this.setData({
          swiperList: result
        })
      }
    }); */

    this.getSwiperList()
    this.getCatesList()
    this.getFloorList()
  },

  // 获取轮播图数据
  getSwiperList () {
    request({
      url: "/home/swiperdata"
    }).then( result => {
      // console.log(result)
      result.forEach(v => {
        v.navigator_url = v.navigator_url.replace("main", "index")
      });
      this.setData({
        swiperList: result
      })
    })
  },

  // 获取导航数据
  getCatesList () {
    request({
      url: "/home/catitems"
    }).then( result => {
      this.setData({
        catesList: result
      })
    })
  },

  // 获取楼层数据
  getFloorList () {
    request({
      url: "/home/floordata"
    }).then( result => {
      result.forEach(v => {
        v.product_list.forEach(e => {
          e.navigator_url = e.navigator_url.replace("?", "/index?")
        })
      })
      this.setData({
        floorList: result
      })
    })
  }
})