// index.js
// 获取应用实例
const app = getApp()

Page({
  data : {
    indexImage : []
  },
  onLoad(e){
    wx.showLoading({
      title: '加载中',
      mask : true
    }),
    this.setData({
      indexImage : [
        {url : 'http://www.jaclogistic.cn/soceo/images/ban4.jpg'},
        {url : 'http://www.jaclogistic.cn/soceo/images/pic2.jpg'},
        {url : 'http://www.jaclogistic.cn/soceo/images/pic5.jpg'},
        {url : 'http://www.jaclogistic.cn/soceo/images/ban3.jpg'},
        {url : 'http://www.jaclogistic.cn/soceo/images/ban2.jpg'}
      ],
      value:'',
      active : 0
    });
    
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onChangePage(e) {
    this.setData({
      active : e.detail
    })
  },
  onShow: function () {
    this.getTabBar().init();
    wx.hideLoading({
      success: (res) => {},
    })
  },
})
