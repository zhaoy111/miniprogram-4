const {
  http,
  shareImage
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
    help: '<div style="white-space: pre;">1、转发你的邀请码\n\t详情请见：我的-邀请码</div>' +
      '<div style="white-space: pre;">2、被邀请用户完成注册，+0分</div>' +
      '<div style="white-space: pre;">3、被邀请用户保存简历，+0分</div>' +
      '<div style="white-space: pre;">4、被邀请用户投递简历，+0分</div>' +
      '<div style="white-space: pre;">5、被邀请用户初审成功，+0分</div>' +
      '<div style="white-space: pre;">6、被邀请一面成功，+0分</div>' +
      '<div style="white-space: pre;">7、被邀请二面成功，+0分</div>' +
      '<div style="white-space: pre;">8、被邀请用户签订合同成功，+0分</div>',
    loading: false
  },

  getUserInfo(event) {

  },

  onClose() {
    this.setData({
      show: false,
      show2: false
    });
  },

  getImage() {
    this.setData({
      show2: false
    });
  },

  getShow2() {
    shareImage(this.data.image).then(res => console.log(res)).catch(res => console.log(res)).finally(res => console.log(res));
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
    });

    this.getHelps()

    //获取礼物分类
    http({
      url: this.data.ip + "/api/giftTypesAll",
      method: "GET"
    }).then(res1 => {
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
        res1.data.data.forEach(gift => {
          if (gift.gift_image.startsWith("/")) {
            gift.gift_image = this.data.ip + gift.gift_image
          }
        })
        if (res1.data.data.length < 10) {
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
      } else {
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

  getHelps: function (params) {
    http({
      url: this.data.ip + "/api/rule",
      method: "GET"
    }).then((res1) => {
      if (res1.data.code == 0) {
        let ids = ["00", "02", "07", "09", "11", "13"]
        let value = ["邀请的用户注册", "邀请的用户投递简历", "邀请的用户初审成功", "邀请的用户一面成功", "邀请的用户二面成功", "邀请的用户签订合同成功"]
        let temp = []
        var str = ""
        ids.forEach((id, index) => {
          let mark = res1.data.data.find(data => {
            if (data.id == id) {
              return data;
            }
          }).mark

          if (mark > 0) {
            temp.push("<div style='margin-top: 10px'>" + (temp.length + 1) + "、" + value[index] + "，+" + mark + "积分" + "</div>")
          }
        })
        temp.forEach(data => str += data)
        this.setData({
          help: str,
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
      gifts: [],
      page: 1,
    })
    this.getGift()
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
    this.getHelps();
    this.getGift()
    this.getCart();
    this.getScore();
    // this.makeShareImage(this.data.image)
  },

  makeShareImage(image) {
    const query = wx.createSelectorQuery();
    query.select('#myCanvas')
      .fields({
        node: true,
        size: true
      })
      .exec((res) => {
        const canvas = res[0].node;

        const dpr = wx.getSystemInfoSync().pixelRatio;
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        const ctx = canvas.getContext('2d')
        ctx.scale(dpr, dpr)
        //canvas.createImage()在微信版本7.0.20会有报错，进入不了onload。 但是在7.0.21已经修复。
        let pic = canvas.createImage();
        ctx.fillStyle = "rgb(255,255,255)";
        ctx.fillRect(0, 0, 300, 1000)
        pic.src = image; //可以是本地，也可以是网络图片
        pic.onload = () => {
          //不要用官方示例的图片路径，包括网上在这之前所有的文档/示例里是地址链接的都不要看了，要用image对象！
          ctx.drawImage(pic, 0, 0, 80, 80);
        }
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
    this.getGift()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})