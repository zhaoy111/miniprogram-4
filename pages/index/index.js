// index.js
// 获取应用实例
const app = getApp()

Page({
  data : {
    indexImage : []
  },
  onLoad(e){
    this.setData({
      indexImage : [
        {url : 'http://www.jaclogistic.cn/soceo/images/ban4.jpg'},
        {url : 'http://www.jaclogistic.cn/soceo/images/pic2.jpg'},
        {url : 'http://www.jaclogistic.cn/soceo/images/pic5.jpg'},
        {url : 'http://www.jaclogistic.cn/soceo/images/ban3.jpg'},
        {url : 'http://www.jaclogistic.cn/soceo/images/ban2.jpg'}
      ],
      value:''
    })
  },
  onChange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
})
