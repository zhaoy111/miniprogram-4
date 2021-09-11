// pages/send/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    send_job: [],

  },

  delete(e) {
   this.setData({
     send_job:wx.getStorageSync("data_test").send_job.filter(item => {
       return item.job_id!=e.currentTarget.dataset.job_id
     })
   })
   const temp = wx.getStorageSync("data_test");
   temp.send_job=this.data.send_job
   wx.setStorageSync('data_test', temp)
  },

  sendJob(e) {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      send_job:JSON.parse(JSON.stringify(wx.getStorageSync("data_test").send_job))
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