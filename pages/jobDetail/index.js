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
    repetition:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const temp = wx.getStorageSync('data_test').job_panel;
    wx.getStorageSync('data_test').jobs_test.map(item =>{
        if(options.job_id == item.job_id){
          temp.job_name = item.job_name;
          temp.job_type = item.job_type;
          temp.job_date = item.job_date;
          temp.job_address = item.job_address;
          temp.job_salary = item.job_salary;
        }
      })
    this.setData({
      job_id: options.job_id,
      job_panel:temp
    })
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

  sendJob(e) {
    var job_name='';
    var job_type='';
    var job_date='';
    var job_address='';
    var job_salary='';
    // 模拟请求获取简历信息
    if(wx.getStorageSync('data_test_resume').resumeInfo.success){
      const temp = wx.getStorageSync('data_test')
      
      temp.jobs_test.map(item =>{
        if(item.job_id == this.data.job_id){
          job_name = item.job_name;
          job_type = item.job_type;
          job_date = item.job_date;
          job_address = item.job_address;
          job_salary = item.job_salary;
        }
      })
      temp.send_job.push({
        job_id: this.data.job_id,
        job_name: job_name,
        job_type: job_type,
        job_date: job_date,
        job_address: job_address,
        job_salary: job_salary,
        job_status: 1,
        steps: [{
            text: '简历初审',
            desc: '未定',
            activeIcon: 'pause-circle-o',
            // inactiveIcon: 'success'
          },
          {
            text: '一面',
            desc: '未定',
            // inactiveIcon: 'success'
          },
          {
            text: '二面',
            desc: '未定',
            activeIcon: 'pause-circle-o',
            // inactiveIcon: 'success',
          },
          {
            text: '签订合同',
            desc: '未定',
          },
        ],
        active: 0
      })
      wx.setStorageSync('data_test', temp);
      this.setData({show:true,repetition:true})
    }else{
      wx.navigateTo({
        url: '/pages/resume/index',
      })
    }

  },

  onClose(e){
    this.setData({show:false})
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