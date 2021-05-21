/*
 * @Author: Zt2tzzt
 * @Date: 2020-10-10 16:22:11
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-10-26 16:02:32
 * @Description: file content
 */

 /**
  * 1. 发送请求，获取数据
  * 2. 点击轮播图，预览大图功能
  *   1. 给轮播图绑定点击事件
  *   2. 调用小程序的Api，previewImage
  * 3. 点击加入购物车
  *   1. 绑定点击事件
  *   2. 获取缓存中的购物车数据，数组格式
  *   3. 先判断当前商品是否已经存在购物车
  *   4. 已经存在，修改商品数据，购物车数量++，将购物车数组填充回缓存中
  *   5。不存在于购物车数组，添加一个新元素，带上购买数量属性num，重新把购物车数组填充回缓存中
  *   6. 弹出提示
  */
import { request } from "../../request/idnex.js"
import regeneratorRuntime from '../../lib/runtime/runtime.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },

  // 商品对象
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    // console.log(goods_id)
    this.getGoodsDetail(goods_id)
  },

  // 获取商品的详情数据
  async getGoodsDetail (goods_id) {
    const goodsObj = await request({
      url: "/goods/detail",
      data: {goods_id},
    })

    this.GoodsInfo = goodsObj

    this.setData({
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // iphone部分手机不识别webp图片格式
        // 找后台沟通
        // 临时自己该，
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics: goodsObj.pics
      }
    })
  },

  // 点击轮播图，放大预览
  handlePrevewImage (e) {
    // console.log('预览')
    // 1. 先构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid)
    // 2. 接收传递过来的url
    // console.log(e)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
    });
  },

  // 点击加入购物车
  handleCartAdd () {
    // console.log('加入购物车')
    // 1. 获取缓存中的购物车数组
    let cart = wx.getStorageSync("cart") || [];
    // 2. 判断商品对象是否存在购物车数组中。
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index === -1) {
      // 3. 不存在，第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo)
    }else {
      // 4. 已经存在购物车数据，执行 num++
      cart[index].num++;
    }

    // 5.把购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
    // 6. 弹框提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止用户手抖
      mask: true,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})