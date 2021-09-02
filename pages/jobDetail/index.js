// pages/jobDetail/index.js
import {
  http
} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    job_panel: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    http({
        url: 'http://120.55.59.119:1880/v1?fun1=jobs&fun2=jobDetail&job_id=' + options.job_id
      })
      .then(res => {
        console.log(res.data);
        
        this.setData({
          job_panel: res.data
        })
      })
      .catch(err => {
        wx.showToast({
          title: '请求超时',
        })
      })

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