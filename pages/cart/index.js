/*
 * @Author: Zt2tzzt
 * @Date: 2020-10-10 16:22:11
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-10-27 11:21:38
 * @Description: file content
 */

/**
 * 1. 获取用户的收货地址
 *  1. 绑定点击事件
 *  2. 调用小程序内置 api 获取用户的收货地址。wx.chooseAddress
 * 
 *  2. 获取用户对小程序邮授予的权限状态scope
 *   1. 假设 用户 点击获取收货地址的提示框确定，authSetting scope.address
 *     scope 值 true 直接调用，获取收获地址
 *   2. 假设用户点击获取地址的提示框，取消 
 *     scope 值 false 
 *       1. 诱导用户自己打开授权设置页面(wx.openSetting)，当用户重新给予地址权限，获取地址权限的时候
 *       2. 获取收货地址
 *   3. 用户从来没有调用过获取地址的api
 *      scope 值 undefined 直接调用，获取收获地址
 *   4. 把获取到的收货地址，存入到本地存储中。
 * 2. 页面加载完毕要做的事
 *  0. onLoad onShow
 *  1. 获取本地存储中的地址数据
 *  2. 把数据设置给data中的一个变量
 * 3. onShow
 *  0. 回到了商品详情页面，第一次添加商品的时候，手动添加了选中的属性
 *    1. num = 1；
 *    2. checked = true
 *  1. 获取缓存中的购物车数组
 *  2. 将缓存中的数组填充到data中
 * 4. 全选的实现 数据的展示
 *  1. onShow中获取缓存中的购物车数组
 *  2. 根据商品数据进行计算，所有商品都被选中，checked = true
 * 5. 总价格和总数量
 *  1. 都需要商品被选中，我们才拿它来计算
 *  2. 获取到购物车的数组
 *  3. 遍历
 *  4. 判断商品是否被选中
 *  5. 总价格 += 商品的单价 * 商品的数量， 总数量 += 商品的数量
 *  6. 把计算后的价格和数量，设置回data中即可
 * 6. 商品的选中功能
 *  1. 绑定change事件
 *  2. 获取到呗修改的商品对象
 *  3. 商品对象的选中状态，取反
 *  4. 重新填充回data中的缓存
 *  5。重新计算全选，总价格，总数量
 * 7. 全选和反选功能
 *  1. 全选复选框绑定事件 change
 *  2. 获取data中的全选变量 allChecked
 *  3. 直接取反 allChecked = !allChecked
 *  4. 遍历购物车数组，让里面商品选中状态跟随 allChecked 改变而改变
 *  5. 把购物车数组和allChecked重新设置回data，把购物车重新设置回缓存中
 * 8. 商品数量的编辑功能
 *  1. "+""-"按钮绑定同一个点击事件，区分区分的关键，自定义属性
 *    1."+""+1"
 *    2."-""-1"
 *  2. 传递被点击的商品id goods_id
 *  3. 获取daa中的购物车数组 来获取需要被修改的商品对象
 *  3.1.当购物车数量 = 1，同时用户点击"-"
 *    弹窗提示{showModle}询问用户是否删除
 *    1. 确定，直接执行删除
 *    2. 取消，什么都不做
 *  4. 直接修改商品对象的数量 num
 *  5. 把cart数组 重新设回缓存中，和data中 this.setCart
 * 9. 点击结算
 *  1. 判断有没有收货信息
 *  2. 判断用户有没有选购商品
 *  3. 经过以上的验证，跳转到支付页面
 */

import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWx.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"

Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNumber: 0
  },

  onShow () {
    // 1.获取缓存中的收货地址
    const address = wx.getStorageSync("address");

    // 3.1. 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || [];

    // 4.1. 计算全选
    // every 数组方法，会遍历 会接收一个回调函数，每一个回调函数都返回true，那么every方法的返回值为true
    // 只要又一个回调函数返回了false，那么不再循环执行，直接返回false
    // 空数组调用every，返回值就是true
    // const allChecked = cart.length ? cart.every(v => v.checked) : false; 为提高性能，把循环放到下方的forEach
    /* let allChecked = true

    // 5.1. 总价格，总数量
    let totalPrice = 0
    let totalNumber = 0
    cart.forEach(v => {
      if (v.checked) {
        totalNumber += v.num
        totalPrice += v.num * v.goods_price
      } else {
        allChecked = false
      }
    })

    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false

    // 2. 给data赋值
    this.setData({
      address,
      cart,
      allChecked,
      totalNumber,
      totalPrice
    }) */

    this.setData({address})
    this.setCart(cart)
  },

  // 点击获取收货地址
  async handleChooseAddress() {

    // 1. 获取收货地址
    /* wx.getSetting({
      success: (result)=>{
        console.log(result)
        // 2. 获取权限状态，只有发现一些属性名名称怪异的时候，都要使用[]形式来获取属性值
        const scopeAddress = result.authSetting["scope.address"]
        if (scopeAddress === true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (res1)=>{
              console.log(res1)
            }
          });
        } else {
          // 3.用户曾经拒绝过授予权限，先诱导用户打开授权页面
          wx.openSetting({
            success: (res2)=>{
              // 4. 可以调用 收货地址
              wx.chooseAddress({
                success: (res3)=>{
                  console.log(res3)
                }
              });
            }
          });
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    }); */

    try {
      // 1. 获取权限状态
      const res1 = await getSetting()
      const scopeAddress = res1.authSetting["scope.address"]
      // 2. 判断权限状态
      if (scopeAddress === false) {
        // 3. 先诱导用户打开授权页面
        await openSetting();
      }
      // 4. 调用获取收货地址的api
      const address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      // 5. 存入到缓存中
      wx.setStorageSync("address", address);

    } catch (error) {
      console.log(error)
    }

  },

  // 6. 商品的选中
  handleItemChange (e) {
    // 1. 获取被修改的商品id
    const goods_id = e.currentTarget.dataset.id
    // 2. 获取购物车数据
    let {cart} = this.data;
    // 3. 找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id)
    // 选中状态取反
    cart[index].checked = !cart[index].checked
    // 5. 把购物车数据重新设置回data中和缓存中
    this.setCart(cart)
  },

  // 设置购物车状态，同时，重新计算，底部工具栏的数据，全选，总价格，购买数量
  setCart(cart) {
    let allChecked = true

    // 5.1. 总价格，总数量
    let totalPrice = 0
    let totalNumber = 0
    cart.forEach(v => {
      if (v.checked) {
        totalNumber += v.num
        totalPrice += v.num * v.goods_price
      } else {
        allChecked = false
      }
    })

    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false

    this.setData({
      cart,
      totalNumber, totalPrice, allChecked
    })

    wx.setStorageSync("cart", cart);
  },

  // 7. 商品的全选功能
  handleItemAllCheck () {
    // 1. 获取data中的数据
    let {cart, allChecked} = this.data
    // 2. 修改值
    allChecked = !allChecked
    // 3. 循环修改cart数组中的商品选中状态
    cart.forEach(v => v.checked = allChecked)
    // 4. 把修改后的值，填充回data或者缓存中
    this.setCart(cart)
  },

  // 8. 商品数量的编辑功能
  async handleItemNumEdit (e) {
    // 1. 获取传递过来的参数
    const {operation, id} = e.currentTarget.dataset
    // 2. 获取购物车数组
    let {cart} = this.data
    // 3. 找到需要修改的商品的索引
    const index = cart.findIndex(v => v.goods_id === id)
    // 3.1. 判断是否要删除
    if (cart[index].num === 1 && operation === -1) {
      // 弹窗提示
      const res = await showModal({content: "您是否要删除？"})
      if (res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
      }
    } else {
      // 4. 修改数量
      cart[index].num += operation
      // 5. 设置回缓存和data中
      this.setCart(cart)
    }
  },

  // 6. 点击结算
  async handlePay () {
    const {address, totalNumber} = this.data
    // 1. 判断有没有收货地址
    if (!address.userName) {
      await showToast({title: "你还没有选择收货地址"})
      return
    }
    // 2. 判断购物车有没有商品
    if (totalNumber === 0) {
      await showToast({title: "您还没有选购商品"})
      return;
    }

    // 3. 跳转到支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
    });
  }

})