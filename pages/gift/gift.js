const { http } = require("../../utils/request");

// pages/gift/gift.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue:"",
    option1: [
      { text: '全部', value: 0 },
      { text: '礼物', value: 1 },
      { text: '福利', value: 2 },
    ],
    value1: 0,
    gifts:[],
    show: false,
    show2: false,
    help:'',
  },

  getUserInfo(event) {
    console.log(event.detail);
  },

  onClose() {
    this.setData({ show: false });
  },

  getImage(){
    this.setData({ show2: false });
  },

  getShow2(){
    this.setData({ show2: true });
  },

  getHelp(e) {
    this.setData({ show: true });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '页面加载中',
    })
    http({url:'http://120.55.59.119:1880/v1?fun1=gifts&fun2=all'}).then(data =>{this.setData({gifts:data.data})});
    http({url:'http://120.55.59.119:1880/v1?fun1=score&fun2=help'}).then(d=>{this.setData({help:d.data})});
  },

  onChange : function(e) {
    console.log(e);
    
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
    this.getTabBar().init();
    wx.hideLoading({
      success: (res) => {},
    })
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