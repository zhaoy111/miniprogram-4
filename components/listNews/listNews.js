// components/listNews/listNews.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
      value: '你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好你好'
    },
    date1: {
      type: String,
      value: '2021年9月9日'
    },
    date2: {
      type: String,
      value: ''
    },
    tip: {
      type: String,
      value: '+10'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show(e) {
      this.setData({
        show: true
      });
    },

    hiddenAll(e) {
      this.setData({
        show: false
      });
    },
  }
})