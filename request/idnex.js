/*
 * @Author: Zt2tzzt
 * @Date: 2020-10-16 17:36:48
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2020-10-30 11:41:14
 * @Description: file content
 */

// 同时发送异步请求的次数
let ajaxTimes = 0;
export const request = (params) => {
  // 判断 url中是否带有/my/请求的是私有的路径,带上header token
  let header = {...params.header}
  if (params.url.includes("/my/")) {
    // 拼接header,带上token
    header["Authorization"] = wx.getStorageSync("token");
  }

  ajaxTimes++;
  // 显示加载中效果
  wx.showLoading({
    title: "加载中",
    mask: true
  });

  // 定义公共的url
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolove, reject) => {
    var reqTask = wx.request({
      ...params,
      header: header,
      url: baseUrl + params.url,
      success: (result) => {
        resolove (result.data.message)
      },
      fail: (err) => {
        reject (err)
      },
      complete: () => {
        ajaxTimes--;
        if (ajaxTimes === 0) {
          // 关闭正在加载到图标
          wx.hideLoading();
        }
      }
    });
  });
}