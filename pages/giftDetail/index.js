import {
  http
} from "../../utils/request"

// pages/giftDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gift_id: '',
    tip: '',
    gift_detail: {},
    show: false,
    number: 1,
    deal_status: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      gift_id: options.gift_id,
      gift_detail: {},
      tip: this.tip,
      ip: getApp().globalData.ip
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  tip: '<div style="margin-top:10px">1、每名用户不限对换券领取次数，但每个兑换券仅限使用—次;</div>' +
    '<div style="margin-top:10px">2、本券在2022年12月31日前使用有效，过期无效；</div>' +
    '<div style="margin-top:10px">3、商品价值已经由企业承担，只需在线支付运费即可（普通地区10元运费；偏远地区：以系统显示为准；港澳台地区不发货）；</div>' +
    '<div style="margin-top:10px">4、本券不折现不找零，如发生退货，此券恕不退还;</div>' +
    '<div style="margin-top:10px">周—至周六9：30--17：30；</div>' +
    '<div style="font-weight:600;margin-top:10px">特别说明：部分地区受疫情管控影响，快递暂时无法送达，我们会在管控解除之后第一时间为您发出，感谢您的理解。”</div>',

  click(e) {
    this.setData({
      show: true
    })

  },

  onClose(e) {
    this.setData({
      show: false
    })
  },

  chooseAddress(e) {
    this.setData({
      show: false
    })

    let that = this

    wx.chooseAddress({
      success: res => {
        http({
          url: this.data.ip + "/api/cart",
          data: {
            openId: wx.getStorageSync('openId'),
            number: this.data.number,
            gift_id: this.data.gift_detail.gift_id,
            address: JSON.stringify({
              username: res.userName,
              postalCode: res.postalCode,
              provinceName: res.provinceName,
              cityName: res.cityName,
              countyName: res.countyName,
              detailInfo: res.detailInfo,
              nationalCode: res.nationalCode,
              telNumber: res.telNumber
            }),
            self_pick: false
          },
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            // 'Content-Type': 'application/json'
          }
        }).then(d => {
          if (d.data.code == 0) {
            wx.showToast({
              title: '兑换成功',
              success: function (params) {
                that.getData()
              }
            })
          } else {
            wx.showToast({
              title: '兑换失败',
              icon: 'success',
              success: function (params) {

              }
            })
          }
        })
      }
    })
  },

  self(e) {
    let that = this
    this.setData({
      show: false
    })

    http({
      url: this.data.ip + "/api/cart",
      data: {
        openId: wx.getStorageSync('openId'),
        number: this.data.number,
        gift_id: this.data.gift_detail.gift_id,
        address: "",
        self_pick: true
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json'
      }
    }).then(d => {
      if (d.data.code == 0) {
        wx.showToast({
          title: '兑换成功,在兑换记录中查看兑换码',
          success: function (params) {
            that.getData()
          }
        })
      } else {
        wx.showToast({
          title: '兑换失败',
          icon: 'success',
          success: function (params) {
          }
        })
      }
    })

    const temp = wx.getStorageSync('data_test_credit');
    temp.available_credits = temp.available_credits - this.data.number * this.data.gift_detail.gift_credit
    if (temp.available_credits >= 0) {
      temp.outcome_log.push({
        content: this.data.gift_detail.gift_name,
        date1: new Date().getFullYear() + "年" + (new Date().getMonth() + 1) + "月" + new Date().getDate() + "日",
        tip: '-' + (this.data.number * this.data.gift_detail.gift_credit),
        number: this.data.number,
        gift_id: this.data.gift_detail.gift_id,
        log_id: new Date().getTime()
      }, )
      wx.setStorageSync('data_test_credit', temp);
      this.setData({
        deal_status: true
      })
      wx.showToast({
        title: '兑换成功',
      })
    } else {
      this.setData({
        deal_status: false
      })
      wx.showToast({
        title: '兑换失败',
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData()
  },

  getData: function (params) {
    http({
      url: this.data.ip + "/api/gift",
      data: {
        id: this.data.gift_id,
        status: true,
      },
      method: "GET"
    }).then(d => {
      if (d.data.code === 0) {
        this.setData({
          gift_detail: d.data.data,
          deal_status: d.data.data.count > 0
        })
      }
    }).catch(d => {
      console.log(d);
    })
  },

  changeNumber(e) {
    this.setData({
      number: e.detail
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