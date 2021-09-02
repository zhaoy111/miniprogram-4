// index.js
// 获取应用实例
import {
  http
} from '../../utils/request';

const app = getApp()

Page({
  data: {
    indexImage: [],
    loading: false,
    newjob: false
  },
  onLoad(e) {
    wx.showLoading({
        title: '加载中',
        mask: true
      }),
      this.setData({
        indexImage: [{
            url: 'http://www.jaclogistic.cn/soceo/images/ban4.jpg'
          },
          {
            url: 'http://www.jaclogistic.cn/soceo/images/pic2.jpg'
          },
          {
            url: 'http://www.jaclogistic.cn/soceo/images/pic5.jpg'
          },
          {
            url: 'http://www.jaclogistic.cn/soceo/images/ban3.jpg'
          },
          {
            url: 'http://www.jaclogistic.cn/soceo/images/ban2.jpg'
          }
        ],
        value: '',
        active: 0,
        jobs: [],

      })
    this.scrollHandler()
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  onChangePage(e) {
    this.setData({
      active: e.detail
    })
  },
  onShow: function () {
    this.getTabBar().init();
    wx.hideLoading({
      success: (res) => {},
    })
  },
  onReachBottom: function () {
    this.scrollHandler()
  },
  scrollHandler(e) {
    if (this.data.newjob) {
      return
    } else {
      this.setData({
        loading: true
      })
      http({
          url: 'http://120.55.59.119:1880/v1?fun1=jobs&fun2=all'
        })
        .then(result => {
          this.setData({
            loading: false,
            newjob: result.data.length < 5
          })
          this.setData({
            jobs: [...this.data.jobs, ...result.data]
          })
        }).catch(err => {
          this.setData({
            loading: false
          })
          wx.showToast({
            title: '获取数据失败',
          })
        })
    }

  }

})