const {
  http
} = require("../../utils/request");

// pages/gift/gift.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: "",
    page: 1,
    newjob: false,
    count: 0,
    score: 0,
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
    loading: false
  },

  getUserInfo(event) {
    
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
    this.data.option1 = [{
      text: "全部",
      value: "-1"
    }]
    this.setData({
      option1: this.data.option1,
      ip: getApp().globalData.ip,
      value1: "-1"
    })
    this.setData({
      image: this.data.ip + "/api/inviter/img?" + this.data.image + "openId=" + wx.getStorageSync("openId") + "&width=200",
      help: wx.getStorageSync('data_test').help,
    });
    
    //获取礼物分类
    http({
      url: this.data.ip + "/api/giftTypesAll",
      method: "GET"
    }).then((res1) => {
      if (res1.data.code == 0) {
        res1.data.data.forEach(d => {
          this.data.option1.push({
            text: d.description,
            value: d.id
          })
        });
        this.setData({
          option1: this.data.option1,
        })
      }
    });
    //获取礼物分类结束

    this.getGift()


  },

  getGift: function () {
    if (this.data.newjob) {
      return;
    }
    //获取礼物
    this.setData({
      loading: true,
      page: this.data.page + 1
    })
    http({
      url: this.data.ip + "/api/gifts",
      data: {
        page: this.data.page - 1,
        limit: 10,
        status: true,
        type: this.data.value1,
        msg: this.data.searchValue
      },
      method: "GET"
    }).then((res1) => {
      if (res1.data.code == 0) {
        if (res1.data.data.length < 10) {
          res1.data.data.forEach( gift => {
            if(gift.gift_image.indexOf("/")===0){
              gift.gift_image = this.data.ip + gift.gift_image
            }
          })
          this.setData({
            newjob: true,
            loading: false,
            gifts: [...this.data.gifts, ...res1.data.data]
          })
        } else {
          this.setData({
            newjob: false,
            loading: false,
            gifts: [...this.data.gifts, ...res1.data.data]
          })
        }
      }else{
        this.setData({
          newjob: false,
          loading: false,
        })
      }
    });
    //获取礼物结束
  },

  getCart: function (params) {

    http({
      url: this.data.ip + "/api/user/carts",
      data: {
        openId: wx.getStorageSync('openId'),
        page: 1,
        limit: 10,
        status: 0,
        msg: '',
        self_pick: false
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json'
      },
    }).then((res1) => {
      if (res1.data.code == 0) {
        this.setData({
          count: res1.data.count
        })
      }
    });
  },

  onChange: function (e) {
    this.setData({
      searchValue: e.detail,
      page: 1
    });
  },

  searchGifts(e) {
    this.setData({
      newjob: false,
      gifts: []
    })
    this.getGift()
  },
  getScore: function (params) {
    //获取积分
    http({
      url: this.data.ip + "/api/user/info",
      method: "GET",
      data:{
        openId:wx.getStorageSync('openId')
      }
    }).then((res1) => {
      if (res1.data.code == 0) {
        this.setData({
          score: res1.data.data.score,
        })
      }
    });
    //获取积分结束   
  },




  changeSort(e) {
    this.setData({
      value1: e.detail,
      page: 1
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
    this.getTabBar().init();
    wx.hideLoading({
      success: (res) => {},
    })
    this.setData({
      credits_data: wx.getStorageSync('data_test_credit').available_credits
    });
    this.getGift()
    this.getCart();
    this.getScore();
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
    this.getGift()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})