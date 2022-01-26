// index.js
// 获取应用实例
import {
  http, shareImage
} from '../../utils/request';

const app = getApp()

Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    showClose:false,
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
    server: app.globalData.ip,
    nextTry:false,
    show: true,
  },

  onClickShow() {
    this.setData({ show: true });
  },

  onClickHide() {
    this.setData({ show: false });
  },

  noop() {},

  closeOverlay() {
    this.setData({ show: false });
  },

  changeTip(event) {
    if(this.data.background.length -1 === event.detail.current){
      this.setData({showClose:true})
    }
  },

  onLoad(e) {
    this.setData({
      page: 1,
      limit: 10,
      count: 10,
      jobs: []
    })
    
    http({
      method: "GET",
      url: app.globalData.ip + "/api/settings",
      header: {
        // 'content-type': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/json'
      },
    }).catch(d => {
      console.log(d);
    }).then(d => {
      let data = JSON.parse(JSON.stringify(d.data.data));
      this.setData({
        indexImage:data.indexPhotos.split(",")
      })
    })
  },

  onShow: function () {
    this.getTabBar().init();

    this.setData({
      // send_num: wx.getStorageSync('data_test').send_job.length,
      value: '',
    })
    
    this.getSend()
    this.getData()
  },

  async getSend() {
    let res = await http({
      url: this.data.server + "/api/job/send",
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
    let that = this
    let res = await http({
      url: this.data.server + "/api/jobs",
      data: {
        page: this.data.page,
        limit: this.data.limit,
        status: true
      },
      method: "GET"
    }).then( d=> {
      if(d.statusCode === 404){
        that.setData({nextTry:true})
      }else if(d.statusCode === 200){
        that.setData({
          page: that.data.page + 1,
          count: d.data.count,
          value: '',
          jobs: [...that.data.jobs, ...JSON.parse(JSON.stringify(d.data.data))],
        });
      }else{
        that.setData({nextTry:true})
      }
    });
    this.setData({
      loading: false
    })
  },

  async getSearchData() {
    this.setData({
      loading: true
    })
    let that = this
    let res = await http({
      url: this.data.server + "/api/jobs",
      data: {
        page: this.data.page,
        limit: this.data.limit,
        status: true,
        msg:this.data.value
      },
      method: "GET"
    }).then( d=> {
      if(d.statusCode === 200){
        that.setData({
          page: that.data.page + 1,
          count: d.data.count,
          jobs: [...that.data.jobs, ...JSON.parse(JSON.stringify(d.data.data))],
        });
      }else{
        that.setData({nextTry:true})
      }
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
    this.setData({nextTry:false})
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
      count: 10,
      nextTry:false,
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