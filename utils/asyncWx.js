/*
 * @Author: Zt2tzzt
 * @Date: 2020-10-23 18:08:06
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-10-30 11:18:52
 * @Description: file content
 */

/**
 * promise 形式 getSetting
 */
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      },
      complete: ()=>{}
    });
  })
}

/**
 * promise 形式 chooseAddress
 */
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      },
      complete: ()=>{}
    });
  })
}

/**
 * promise 形式 openSetting
 */
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      },
      complete: ()=>{}
    });
  })
}


/**
 * @description: promise 形式 showModal 用于购物车页面商品数量减至1时，删除商品
 * @param {*} content 提示的内容
 */
export const showModal = ({content}) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '提示',
      content: content,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

/**
 * @description: promise 形式 showToast 用于购物车页面的结算
 * @param {*} title toast的标题
 */
export const showToast = ({title}) => {
  return new Promise((resolve, reject) => {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 1500,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })
  })
}

/**
 * @description: promise 形式 login 用于获取用户信息
 * @param {*} title
 * @return {*}
 */
export const login = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout:10000,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

/**
 * @description: promise形式的小程序微信支付
 * @param {object} pay 支付所必要的参数
 */
export const requestPayment = (pay) => {
  return new Promise((resolve, reject) => {
    wx.requestPayment({
      ...pay,
      success: (result)=>{
        resolve(result)
      },
      fail: (err)=>{
        reject(err)
      }
    });
  })
}

