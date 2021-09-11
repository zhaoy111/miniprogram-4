const {
  http
} = require("../../utils/request");

// pages/gift/gift.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    credits_data:0,
    searchValue: "",
    option1: [{
        text: '全部',
        value: '全部'
      },
      {
        text: '礼物',
        value: '礼物'
      },
      {
        text: '福利',
        value: '福利'
      },
    ],
    value1: '全部',
    gifts: [],
    show: false,
    show2: false,
    help: '',
    loading:false
  },

  getUserInfo(event) {
    console.log(event.detail);
  },

  onClose() {
    this.setData({
      show: false
    });
  },

  getImage() {
    this.setData({
      show2: false
    });
  },

  getShow2() {
    this.setData({
      show2: true
    });
  },

  getHelp(e) {
    this.setData({
      show: true
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '页面加载中',
    })
    this.setData({
      help: wx.getStorageSync('data_test').help,
      gifts: wx.getStorageSync('data_test').gifts,
    });
  },

  onChange: function (e) {
    this.setData({
      searchValue: e.detail
    });
  },

  searchGifts(e) {
    this.setData({
      gifts: wx.getStorageSync('data_test').gifts.filter(item => {
        return item.gift_name.indexOf(this.data.searchValue) != -1
      })
    })
  },

  changeSort(e) {
    this.setData({
      value1: e.detail
    })
    if (e.detail != '全部') {
      this.setData({
        gifts: wx.getStorageSync('data_test').gifts.filter(item => {
          return item.gift_type.includes(this.data.value1)
        })
      })
    } else {
      this.setData({
        gifts: wx.getStorageSync('data_test').gifts
      })
    }

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
    this.setData({credits_data: wx.getStorageSync('data_test_credit').available_credits})
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
    this.setData({loading:true})
    setTimeout(() => {
      this.data.gifts = [...this.data.gifts, ...wx.getStorageSync('data_test').gifts]
      this.setData({
        gifts: this.data.gifts,
        loading:false
      });
    }, 1500);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})