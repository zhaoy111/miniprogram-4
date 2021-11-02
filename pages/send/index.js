// pages/send/index.js

import {
  http
} from "../../utils/request";

let myApp = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    send_job: [],
  },

  step: [{
      text: "简历初审",
      desc: "未定",
      // inactiveIcon: "success",
      activeIcon: "pause-circle-o",
    },
    {
      text: "一面",
      desc: "未定",
      // inactiveIcon: "success",
      activeIcon: "pause-circle-o",
    },
    {
      text: "二面",
      desc: "未定",
      activeIcon: "pause-circle-o",
      // inactiveIcon: "success"
    },
    {
      text: "签订合同",
      desc: "未定",
      activeIcon: "pause-circle-o",
      // inactiveIcon: "success"
    }
  ],

  delete(e) {
    this.setData({
      send_job: wx.getStorageSync("data_test").send_job.filter(item => {
        return item.job_id != e.currentTarget.dataset.job_id
      })
    })
    const temp = wx.getStorageSync("data_test");
    temp.send_job = this.data.send_job
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
      ip:myApp.globalData.ip
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getSend()
  },

  async getSend() {
    
    let res = await http({
      url: this.data.ip +  "/api/job/send",
      data: {
        openId: wx.getStorageSync('openId')
      },
      method: "GET",
    });
    this.setData({
      send_job:[]
    })
    res.data.data.forEach(send => {
      let steps = JSON.parse(JSON.stringify(this.step));
      for (var i = 0; i <= send.active; i++) {
        if(i!==4){
          steps[i].desc = this.getdate((send["date" + (i + 1)] + "").split(" ")[0])
        }
      }
      send.steps = steps;
      this.data.send_job.push(send)
    })
    this.setData({
      send_job: this.data.send_job
    })
  },

  async deleteSend(e) {
    let res = await http({
      method: "DELETE",
      url: this.data.ip + "/api/job/send?id=" + e.currentTarget.dataset.id + "&openId=" + wx.getStorageSync('openId'),
      data: {
        id: e.currentTarget.dataset.id,
        openId: wx.getStorageSync('openId')
      },
      contentType: "application/json",
      dataType: "json",
    })
    if (res.data.code == 0) {
      this.setData({
        send_job: this.data.send_job.filter(send => {
          return send.id != e.currentTarget.dataset.id;
        })
      })
    }
  },

  getdate(date) {
    var now = new Date(Number.parseInt(date)),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
}

})