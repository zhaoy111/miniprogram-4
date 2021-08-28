// custom-tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active: 0,
    list: [{
        text: "首页",
        url: "/pages/index/index"
      },
      {
        text: "礼物",
        url: "/pages/gift/gift"
      },
      {
        text: "我的",
        url: "/pages/user/user"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange: function (e) {
      const i = e.detail;

      wx.switchTab({
        url: this.data.list[i].url,
      })
      this.setData({
        active: i
      })
    },
    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
    }
  }
})