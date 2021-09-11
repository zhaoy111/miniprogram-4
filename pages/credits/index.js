// pages/credits/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data_test_credit: '',
    active: 0,
    loading: false
  },

  changePage(e) {
    this.setData({
      active: e.currentTarget.dataset.active
    })
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
    this.setData({
      data_test_credit: wx.getStorageSync('data_test_credit')
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
    this.setData({
      loading: true
    })
    setTimeout(() => {
      if (this.data.active == 0) {
        this.data.data_test_credit.income_log = [...this.data.data_test_credit.income_log, ...this.data.data_test_credit.income_log]
      } else if (this.data.active == 1) {
        this.data.data_test_credit.outcoutcome_log = [...this.data.data_test_credit.outcome_log, ...this.data.data_test_credit.outcome_log]
      } else if (this.data.active == 2) {
        this.data.data_test_credit.lock_log = [...this.data.data_test_credit.lock_log, ...this.data.data_test_credit.lock_log]
      } else {
        this.data.data_test_credit.time_log = [...this.data.data_test_credit.time_log, ...this.data.data_test_credit.time_log]
      }

      this.setData({
        data_test_credit: this.data.data_test_credit,
        loading:false
      })

    }, 1500);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})