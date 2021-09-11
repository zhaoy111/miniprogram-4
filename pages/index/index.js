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
    newjob: false,
    value: '',
    active: 0,
    jobs: [],
    send_num:0
  },

  onLoad(e) {
    wx.showLoading({
        title: '加载中',
        mask: true
      }),
      this.setData({
        indexImage: wx.getStorageSync('data_test').indexImage,
      })
      
  },

  onShow: function () {
    this.getTabBar().init();
    wx.hideLoading({
      success: (res) => {},
    })
    this.setData({
      send_num:wx.getStorageSync('data_test').send_job.length,
      value:'',
      jobs: [...JSON.parse(JSON.stringify(wx.getStorageSync('data_test').jobs_test))],
    })
  },

  onReachBottom: function () {
    this.scrollHandler()
  },

  // 下拉触底获取数据方法 开始
  scrollHandler(e) {
    if (this.data.newjob) {
      return
    } else {
      this.setData({
          loading: true
        }),
        // 模拟网络请求数据 开始
        setTimeout(() => {
          this.setData({
            loading: false,
            jobs: [...this.data.jobs, ...JSON.parse(JSON.stringify(wx.getStorageSync('data_test').jobs_test))]
          })
        }, 1500);
      // 模拟网络请求数据 结束
      // http({
      //     url: 'http://120.55.59.119:1880/v1?fun1=jobs&fun2=all'
      //   })
      //   .then(result => {
      //     this.setData({
      //       loading: false,
      //       newjob: result.data.length < 5
      //     })
      //     this.setData({
      //       jobs: [...this.data.jobs, ...result.data]
      //     })
      //   }).catch(err => {
      //     this.setData({
      //       loading: false
      //     })
      //     wx.showToast({
      //       title: '获取数据失败',
      //     })
      //   })
    }
  },
  // 下拉触底获取数据方法 结束

  onInput(e){
    this.setData({
      value:e.detail
    })
  },
  onSearch(e){
    this.setData({
      jobs:wx.getStorageSync('data_test').jobs_test.filter((item)=>{
        return item.job_name.indexOf(this.data.value)!=-1
      })
    })
  }
})