/*
 * @Author: Zt2tzzt
 * @Date: 2020-10-10 16:22:11
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-05-26 14:33:48
 * @Description: file content
 */

 /**
  * 1. 用户上滑页面，滚动条触底，开始加载下一页数据
  *   1. 找到滚动条触底事件，
  *   2. 判断还有没有下一页
  *     1. 获取到总页数 只有总条数
  *       总页数 = Math.cell(总页数 / 页容量)
  *     2. 获取到当前页码
  *     3. 判断一下，当前页码是否大于等于总页数
  *   3. 假如没有下一页数据，弹出一个提示
  *   4. 加入有下一页数据，加载下一页数据
  *     1. 当前的页码++
  *     2. 重新发送请求
  *     3. 数据请求回来，要对data中的数组 进行 拼接，而不是替换
  * 2. 下拉刷新页面
  *   1. 触发下拉刷新事件，需要在页面json文件中加配置项 enablePullDownRefresh
  *     找到触发下拉刷新的事件 
  *   2. 重置数据数据
  *   3. 重置页码，设置为1
  *   4. 重新发送请求
  *   5. 数据请求回来，手动关闭下拉刷新窗口
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
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      }
    ],

    goodsList: []

  },

  // 接口要的参数
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pageSize: 10
  },

  // 总页数
  totalPages: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid || ""
    this.QueryParams.query = options.query || ""
    this.getGoodsList()
  },

  // 发送请求，获取商品列表数据
  async getGoodsList () {
    const res = await request({
      url: '/goods/search',
      data: this.QueryParams
    })
    // 获取总条数
    const total = res.total
    // 计算总页数
    this.totalPages = Math.ceil(total / this.QueryParams.pageSize)
    // console.log(this.totalPages)

    this.setData({
      // 拼接的数组
      goodsList: [...this.data.goodsList, ...res.goods]
    })

    // 关闭下拉刷新的窗口，如果没有调用下拉刷新的窗口，直接关闭也不会报错
    wx.stopPullDownRefresh();
  },

  // 标题的点击事件
  handleTabItemChange (e) {
    // 1. 获取被点击的标题所以
    const {index}= e.detail
    // 2. 修改原数组，产生激活选中效果
    let {tabs} = this.data
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false
    });
    // 3. 赋值到data中
    this.setData({
      tabs
    })
  },

  // 页面上滑，滚动条触底事件
  onReachBottom () {
    // console.log('页面触底')
    // 判断还有没有下一页数据
    if (this.QueryParams.pagenum >= this.totalPages) {
      // console.log('没有下一页数据了')
      wx.showToast({
        title: '已经到底了',
        icon: 'none',
        image: '',
        duration: 1500,
        mask: false,
      });
    } else {
      // console.log('还有下一页数据')
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },

  // 下拉刷新事件
  onPullDownRefresh () {
    // 1. 重置数组
    this.setData({
      goodsList: []
    })
    // 2. 重置密码
    this.QueryParams.pagenum = 1;
    // 3. 重新发送请求
    this.getGoodsList();
  }

})