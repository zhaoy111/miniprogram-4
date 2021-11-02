import { http } from "../../utils/request";

// pages/news/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    show: false,
    all_news:[
      {id:0,text:'鉴于你优秀的工作表现，奖励积分100鉴于你优秀的工作表现，奖励积分100鉴于你优秀的工作表现，奖励积分100'},
      {id:1,text:'鉴于你优秀的工作表现，奖励积分200'},
      {id:2,text:'鉴于你优秀的工作表现，奖励积分300'},
      {id:3,text:'鉴于你优秀的工作表现，奖励积分400'},
      {id:4,text:'鉴于你优秀的工作表现，奖励积分500'},
      {id:5,text:'鉴于你优秀的工作表现，奖励积分600'},
    ],
    read_news:[],
    index:0,
    nextTry:false
  },

  delNews(e){
    if(this.data.active == 0){
      this.data.all_news.splice(this.data.index,1);
      this.setData({all_news:this.data.all_news,show:false})
    }else{
      this.data.read_news.splice(this.data.index,1);
      this.setData({read_news:this.data.read_news,show:false})
    }
    
  },
  addNews(e){
    this.setData({
      read_news: [...this.data.read_news,this.data.all_news.splice(this.data.index,1)],
      all_news:this.data.all_news,
      show:false})
  },
  clickNews(e){
    this.setData({show:true,index:e.currentTarget.dataset.index})
  },

  changeStatus(e){
    
    this.setData({
      active: e.currentTarget.dataset.status
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ip:getApp().globalData.ip,
      page:1,
      logs:[],
      noData:false
    })
    this.getLog()
  },

  getLog: function (params) {
    if(this.data.noData){
      return;
    }
    this.setData({nextTry:false})
    http({
      url: this.data.ip + "/api/log/user",
      method: "GET",
      data: {
        openId: wx.getStorageSync('openId'),
        page: this.data.page,
        limit: 20,
        type: 2
      }
    }).then((res1) => {
      if (res1.data.code === 0) {
        this.setData({
          logs: [...this.data.logs,...res1.data.data],
          loading: false,
          page:this.data.page+1,
          noData:res1.data.data.length < 10
        })
      }else{
        this.setData({nextTry:true})
      }
    }).catch(()=>{
    });
  },

  close:function (params) {
    this.setData({
      show:false
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
    this.getLog()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})