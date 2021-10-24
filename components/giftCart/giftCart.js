// components/giftCart/giftCart.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    gift_id:{
      value:"0",
      type: String
    },
    gift_image:{
      value:'https://img.yzcdn.cn/vant/cat.jpeg',
      type:String
    },
    gift_name:{
      value:'宠物猫',
      type:String
    },
    gift_desc:{
      value:'描述',
      type:String
    },
    gift_type:{
      value:"未知",
      type:String
    },
    gift_credit:{
      value:5,
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
