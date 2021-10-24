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
    send_num: 0,
    page: 1,
    limit: 10,
    count: 10,
  },

  onLoad(e) {

    this.setData({
      indexImage: wx.getStorageSync('data_test').indexImage,
    })
    this.setData({
      page: 1,
      limit: 10,
      count: 10,
      jobs: []
    })
    this.getData()
  },

  onShow: function () {
    this.getTabBar().init();

    this.setData({
      // send_num: wx.getStorageSync('data_test').send_job.length,
      value: '',
    })
    
    this.getSend()
  },

  async getSend() {
    let res = await http({
      url:"http://120.55.59.119/api/job/send",
      data:{
        openId:wx.getStorageSync('openId')
      },
      method:"GET"
    });
    this.setData({send_num:res.data.count})
  },

  async getData() {
    this.setData({
      loading: true
    })
    let res = await http({
      url: "http://120.55.59.119/api/jobs",
      data: {
        page: this.data.page,
        limit: this.data.limit,
        status: true
      },
      method: "GET"
    });
    this.setData({
      page: this.data.page + 1,
      count: res.data.count,
      value: '',
      jobs: [...this.data.jobs, ...JSON.parse(JSON.stringify(res.data.data))],
    });
    this.setData({
      loading: false
    })
  },

  async getSearchData() {
    this.setData({
      loading: true
    })
    let res = await http({
      url: "http://120.55.59.119/api/jobs",
      data: {
        page: this.data.page,
        limit: this.data.limit,
        status: true,
        msg:this.data.value
      },
      method: "GET"
    });
    this.setData({
      page: this.data.page + 1,
      count: res.data.count,
      jobs: [...this.data.jobs, ...JSON.parse(JSON.stringify(res.data.data))],
    });
    this.setData({
      loading: false
    })
  },

  onReachBottom: function () {
    this.scrollHandler()
  },

  // 下拉触底获取数据方法 开始
  scrollHandler(e) {

    if(this.tip()){
      if(this.data.value!=""){
        this.getSearchData()
      }else {
        this.getData();
      }
    }
  },
  // 下拉触底获取数据方法 结束

  onInput(e) {
    this.setData({
      value: e.detail
    })
  },

  onSearch(e) {
    this.setData({
      jobs: [],
      page: 1,
      count: 10
    })
    this.getSearchData().then(
      this.tip()
    )
  },

  tip(){
    if (this.data.count <= (this.data.page - 1) * this.data.limit) {
      this.setData({
        newjob: true
      })
      return false
    }else{
      this.setData({
        newjob: false
      })
      return true
    }
  }

})