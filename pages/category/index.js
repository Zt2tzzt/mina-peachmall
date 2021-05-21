/*
 * @Author: Zt2tzzt
 * @Date: 2020-10-10 16:22:11
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-10-20 11:16:33
 * @Description: file content
 */
// pages/category/index.js
import { request } from "../../request/idnex.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单栏数据
    leftMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    // 右侧滚动条距离顶部的距离
    scrollTop: 0
  },
  // 接口的返回数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * 0. web中的本地存储与小程序的本地存储区别
     *  1. 写代码方式不一样
     *    web: localStorage.setItem("key", "value") localStorage.getItem("key")
     *    小程序中： wx.setStorageSync("key", "value") wx.getStorageSync("cates")
     *  2。 存的时候，有没有做类型转换
     *    web：不管存入的是什么类型的数据，最终都会先调用一下toString(), 把数据变成了字符串，再存入进去。
     *    小程序：不存在类型转换这个操作，存什么类型，获取时就是什么类型。
     * 1. 先判断本地存储中，有没有旧数据
     *  没有，直接发送请求
     *  有， 同时，旧数据没过期，就是用本地存储中的旧数据即可
     * 2. {time: Date.now(), data: [...]}
     */

    //  1. 获取本地存储的数据，小程序中存在本地存储。
    const Cates = wx.getStorageSync("cates")
    // 2. 判断
    if (!Cates) {
      // 不存在
      this.getCates()
    } else {
      // 有旧的数据 定义一个过期时间 10s
      console.log(Date.now() - Cates.time > 1000 * 10)
      if (Date.now() - Cates.time > 1000 * 10) {
        // 重新发送结果
        this.getCates()
      } else {
        // 可以使用旧的数据
        this.Cates = Cates.data
        
        this.renderingData()
      }
    }
  },

  // 获取分类数据
  async getCates() {
    /* request({
      url: "/categories"
    }).then(res => {
      // console.log(res);

      this.Cates = res.data.message

      // 把接口的数据存入到本地存储中
      wx.setStorageSync("cates", { time: Date.now(), data: this.Cates })
      
      this.renderingData()
    }) */

    /**
     * 1. 使用es7的async await来发送异步请求
     */
    const res = await request({
      url: "/categories"
    })

    this.Cates = res

    // 把接口的数据存入到本地存储中
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates })
    
    this.renderingData()

  },

  // 左侧菜单的点击事件
  handleItemTap(e) {
    // console.log(e)
    /**
     * 1. 获取被点击的标题身上的索引
     * 2. 给data中的currentIndex赋值就可以了
     * 3. 根据不同的索引来渲染右侧的商品内容
     */
    const { index } = e.currentTarget.dataset;
    // 构造右侧的商品户剧
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      // 重新设置右侧距顶部的距离
      scrollTop: 0
    })

  },

  // 分类页面初始化时，获取左右侧数据内容
  renderingData () {
    // 构造左侧大菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name)
    // 构造右侧的商品户剧
    let rightContent = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
  }
})