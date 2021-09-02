// pages/send/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    send_job: [
      {
        job_id:123,
        job_name:'智慧物流工程师',
        job_type:'技术类',
        job_date:'2021-08-28',
        job_address:'合肥',
        job_salary:'7000-12000',
        job_status:2,
        steps: [
          {
            text: '简历初审',
            desc: '2021-08-29',
            inactiveIcon: 'success'
          },
          {
            text: '一面',
            desc: '2021-08-30',
            inactiveIcon: 'success'
          },
          {
            text: '二面',
            desc: '2021-08-30',
            activeIcon: 'cross',
            inactiveIcon: 'success',
          },
          {
            text: '签订合同',
            desc: '2021-08-31',
          },
        ],
        active:2
      },
      {
        job_id:124,
        job_name:'智慧物流工程师',
        job_type:'技术类',
        job_date:'2021-08-28',
        job_address:'广州',
        job_salary:'8000-15000',
        job_status:2,
        steps: [
          {
            text: '简历初审',
            desc: '2021-08-29',
            inactiveIcon: 'success'
          },
          {
            text: '一面',
            desc: '2021-08-30',
            inactiveIcon: 'success'
          },
          {
            text: '二面',
            desc: '2021-08-30',
            activeIcon: 'cross',
            inactiveIcon: 'success',
          },
          {
            text: '签订合同',
            desc: '2021-08-31',
            desc: '2021-08-30',
            inactiveIcon: 'success'
          },
        ],
        active:3
      }
    ],
    
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