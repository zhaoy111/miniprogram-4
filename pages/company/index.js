// pages/company/index.js

const {
  http
} = require("../../utils/request")

let app1 =getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    randomColor: ["#f2826a", "#7232dd", "#7232dd", '#ff8211', "#f2426a", "#7932dd", "#12323d", '#ff21e1', '#f98211', '#3f8211', '#6f8211'],
    tag: ['五险一金', '带薪休假', '免费单身公寓', '家庭套房', '家庭套房', '免费班车', '内部购车福利', '免费加班餐', '免费体检', '大病救助', '互助帮困基金'],
    media: {
      videos: ['https://v-cdn.zjol.com.cn/276987.mp4', 'https://v-cdn.zjol.com.cn/276986.mp4', 'https://v-cdn.zjol.com.cn/276990.mp4', 'https://v-cdn.zjol.com.cn/276988.mp4', 'https://v-cdn.zjol.com.cn/276987.mp4'],
      images: ['http://www.jaclogistic.cn/soceo/images/ban4.jpg', 'http://www.jaclogistic.cn/soceo/images/pic2.jpg', 'http://www.jaclogistic.cn/soceo/images/pic5.jpg', 'http://www.jaclogistic.cn/soceo/images/ban3.jpg', 'http://www.jaclogistic.cn/soceo/images/ban2.jpg']
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    this.setData({
      ip:app1.globalData.ip
    })
    http({
      method: "GET",
      url: this.data.ip + "/api/settings",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json'
      },
    }).catch(d => {
      console.log(d);
    }).then(d => {
      let data = JSON.parse(JSON.stringify(d.data.data));
      this.setData({
        name:data.name,
        tag:data.tag.split(","),
        location:data.location,
        introduce:data.introduce,
        media:{
          videos:data.videos.split(","),
          images:data.photos.split(",")
        }
      })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})