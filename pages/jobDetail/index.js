// pages/jobDetail/index.js
import {
  http
} from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    job_panel: {},
    job_id: 0,
    show:false,
    repetition:false,
    server:getApp().globalData.ip
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({job_id:options.job_id})
    // const temp = wx.getStorageSync('data_test').job_panel;
    // wx.getStorageSync('data_test').jobs_test.map(item =>{
    //     if(options.job_id == item.job_id){
    //       temp.job_name = item.job_name;
    //       temp.job_type = item.job_type;
    //       temp.job_date = item.job_date;
    //       temp.job_address = item.job_address;
    //       temp.job_salary = item.job_salary;
    //     }
    //   })
    // this.setData({
    //   job_id: options.job_id,
    //   job_panel:temp
    // })
    wx.getStorageSync('data_test').send_job.map(item => {
      if(item.job_id==options.job_id){
        this.setData({repetition:true})
      }
    })
    // http({
    //     url: 'http://120.55.59.119:1880/v1?fun1=jobs&fun2=jobDetail&job_id=' + options.job_id
    //   })
    //   .then(res => {
    //     console.log(res.data);

    //     this.setData({
    //       job_panel: res.data
    //     })
    //   })
    //   .catch(err => {
    //     wx.showToast({
    //       title: '请求超时',
    //     })
    //   })
  },

  async send(e){
    let res = await http({
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      method:"POST",
      url: this.data.server + "/api/job/send",
      data:{
        jobId:this.data.job_id,
        openId:wx.getStorageSync('openId')
      }
    });
    if(res.data.code == 101){
      wx.navigateTo({
        url: '/pages/resume/index',
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        icon: "none"
      })
    }
  },
  
  onClose(e){
    this.setData({show:false})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData()
  },

  async getData(){
    let job = await http({
      url:  this.data.server + "/api/job",
      data: {
        jobId : this.data.job_id
      }
    })
    this.setData({
      job_panel:job.data.data
    })
  }

})