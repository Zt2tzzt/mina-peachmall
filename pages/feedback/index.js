/*
 * @Description: file content
 * @Author: Zt2tzzt
 * @Date: 2021-05-24 17:34:03
 * @LastEditors: Zt2tzzt
 * @LastEditTime: 2021-05-25 17:45:18
 * @LastEditContent: 
 */

/**
 * 1. 点击“+”触发tap点击事件
 *  1. 调用小程序内置的选择图片的api
 *  2. 获取到图片的路径，数组
 *  3. 把图片路径存到data的变量中
 *  4. 页面就可以根据图片数组，进行循环显示，自定义组件
 * 2. 点击自定义图片组件（删除图片）
 *  1. 获取被点击的元素的索引。
 *  2. 获取data中的图片数组
 *  3 根据索引数组中删除对应的元素
 *  4. 把数组重新设置回data中
 * 3. 点击“提交”
 *  1. 获取文本域的内容，类似输入框的获取
 *    1. data中定义变量，表示输入框内容
 *    2. 文本框绑定输入事件，事件触发的时候，把输入框的值存入到变量中。
 *  2. 对这些内容，合法性验证
 *  3. 验证通过，用户选择的图片，上传到专门的图片服务器，返回图片外网的链接。
 *    1. 遍历图片数组
 *    2. 挨个上传
 *    3. 自己再维护图片数组，存放图片上传后的外网的链接
 *  4. 文本域和外网的图片的路径，一起提交到服务器。
 *  5. 清空当前页。
 *  6. 返回上一页。
 */
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品，商家投诉',
        isActive: false
      },
    ],

    goodsList: [],

    // 被选中的图片数组
    chooseImgs: [],

    // 文本框变量
    textareaVal: ""
  },

  UploadImgs: [],

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

  // 点击“+”选择图片
  handleChooseImg () {
    // 2.调用小程序内置的选择图片api
    wx.chooseImage({
      // 同时选中的图片数量
      count: 9,
      // 图片的格式：原图/压缩
      sizeType: ['original','compressed'],
      // 图片的来源：相册/照相机
      sourceType: ['album','camera'],
      success: (result)=>{
        console.log(result)
        this.setData({
          // 图片数组，进行拼接
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    });
  },

  // 点击自定义图片组件
  handleRemoveImg (e) {
    // 2. 获取被点击的数组的索引
    const {index} = e.detail;
    // 3. 获取data中的图片数组
    let {chooseImgs} = this.data;
    // 4. 删除元素
    chooseImgs.splice(index, 1)
    this.setData({
      chooseImgs
    })
  },

  // 文本域的输入事件
  handleTextInput (e) {
    this.setData({
      textareaVal: e.detail.value
    })
  },

  // 表单提交
  handleFormSubmit () {
    // 1. 获取文本域的内容
    const {textareaVal, chooseImgs} = this.data;
    // 2. 合法性的验证
    if (!textareaVal.trim()) {
      wx.showToast({
        title: '输入为空',
        icon: 'none',
        duration: 1500,
        mask: true
      });
      return
    }

    // 3. 上传图片到专门的服务器
    // 上传文件的api不支持多个文件同时上传，遍历数组挨个上传
    chooseImgs.forEach((v, i) => {

      var upTask = wx.uploadFile({
        // 图片要上传到哪里
        url: '',
        // 被上传到文件路径
        filePath: v,
        // 上传的文件的名称，后台来获取文件file
        name: "",
        // 顺带的文本信息
        formData: {},
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
        
      });
    })
  }
  
});
