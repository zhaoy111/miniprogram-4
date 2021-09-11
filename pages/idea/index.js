// pages/idea/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 模拟数据
    data: {
      title: [{
        text: '关于积分',
        value: 0
      }, {
        text: '关于公司',
        value: 1
      }, {
        text: '关于系统',
        value: 2
      }, {
        text: '其他',
        value: 3
      }],
      content: '',
      fileList: [
        {
          url: 'https://img.yzcdn.cn/vant/leaf.jpg',
        },
        {
          url: 'https://img.yzcdn.cn/vant/tree.jpg',
        },
      ],
    },
    title: 0
  },

  change(e){
    console.log(e.detail);
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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