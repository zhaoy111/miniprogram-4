import {
  http
} from "../../utils/request";

// pages/shopHistory/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    noData: false,
    show: 0,
    carts: [],
    page: 1,
    transaction_record: {
      toBeCompleted: [],
      doneCompleted: []
    }
  },

  delete(e) {
    let id = e.currentTarget.dataset.log_id;
    http({
      url: this.data.ip + "/api/cart",
      data: {
        openId: wx.getStorageSync('openId'),
        id: id
      },
      method: "DELETE",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json'
      },
    }).then((res1) => {
      if (res1.data.code == 0) {
        wx.showToast({
          title: '撤销成功',
          icon:"success",
        })
        setTimeout(() => {
          this.setData({
            page:1,
            noData:false,
            carts:[]
          })
          this.getCart()
        }, 1000);
      }else{
        wx.showToast({
          title: '撤销失败',
          icon:"error"
        })
      }
    })

    const temp = wx.getStorageSync('data_test_credit');
    this.data.transaction_record.toBeCompleted = temp.outcome_log.filter(item => {
      if (item.success) {
        return false
      } else {
        return item.log_id != e.currentTarget.dataset.log_id
      }
    });
    console.log(temp.outcome_log);
    temp.outcome_log = temp.outcome_log.filter(item =>
      item.log_id != e.currentTarget.dataset.log_id
    );
    temp.available_credits = temp.available_credits - Number.parseInt(e.currentTarget.dataset.tip)
    wx.setStorageSync('data_test_credit', temp);
    this.setData({
      transaction_record: this.data.transaction_record
    })
  },

  getCart: function () {
    if (this.data.noData) {
      return;
    }
    http({
      url: this.data.ip + "/api/user/carts",
      data: {
        openId: wx.getStorageSync('openId'),
        page: this.data.page,
        limit: 10,
        status: this.data.show,
        msg: '',
      },
      method: "GET",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json'
      },
    }).then((res1) => {
      if (res1.data.code == 0) {
        res1.data.data.forEach(d => {
          if (d.address) {
            try {
              d.address.replace("\\", "")
              d.address = JSON.parse(d.address)
              return true;
            } catch (e) {}
          }
        })
        this.setData({
          page: this.data.page + 1,
          count: res1.data.count,
          carts: [...this.data.carts, ...res1.data.data],
          noData: res1.data.data.length < 10
        })
      }
    });
  },

  setShow1() {
    if (this.data.show != 0) {
      this.setData({
        page: 1,
        show: 0,
        noData: false,
        carts: []
      })
      this.getCart()
    }
  },

  setShow2() {
    if (this.data.show != 1) {
      this.setData({
        page: 1,
        show: 1,
        noData: false,
        carts: []
      })
      this.getCart()
    }
  },

  setShow3() {
    if (this.data.show != 2) {
      this.setData({
        page: 1,
        show: 2,
        noData: false,
        carts: []
      })
      this.getCart()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      ip: getApp().globalData.ip
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
    this.setData({
      page: 1,
      show: 0,
      carts: []
    })
    this.getCart()
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
    this.getCart()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})