import {
  http
} from "../../utils/request";

// pages/credits/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 0,
    lockScore: 0,
    loading: false,
    page: 1,
    status: "0",
    log: [],
    noData:false
  },

  changePage(e) {
    if(this.data.status != e.currentTarget.dataset.active){
      this.setData({
        status: e.currentTarget.dataset.active,
        page:1,
        log:[],
      })
      this.getLog()
    }
    
  },

  getScore: function (params) {
    //获取积分
    http({
      url: this.data.ip + "/api/user/info",
      method: "GET",
      data: {
        openId: wx.getStorageSync('openId')
      }
    }).then((res1) => {
      if (res1.data.code == 0) {
        this.setData({
          page:this.data.page+1,
          score: res1.data.data.score,
          lockScore: res1.data.data.lockScore,
        })
      }
    });
    //获取积分结束   
  },

  getLog: function (params) {
    if(this.data.noData){
      return;
    }
    this.setData({
      loading: true
    })
    http({
      url: this.data.ip + "/api/log/user",
      method: "GET",
      data: {
        openId: wx.getStorageSync('openId'),
        page: this.data.page,
        limit: 10,
        type: 1
      }
    }).then((res1) => {
      if (res1.data.code == 0) {
        res1.data.data.forEach( d=> {
          d.date = this.getdate(d.date)
        })
        this.setData({
          log: [...this.data.log,...res1.data.data],
          loading: false,
          page:this.data.page + 1,
          noData:res1.data.data.length < 10
        })
      }else{
        this.setData({loading:false,noData:false})
      }
    }).catch(()=>{
      this.setData({
        loading: false
      })
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ip: getApp().globalData.ip
    })
    this.getScore()
    this.getLog()
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
    this.getLog()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getdate(date) {
    var now = new Date(Number.parseInt(date)),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
}
})