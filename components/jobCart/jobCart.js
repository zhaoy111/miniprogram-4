// components/jobCart/jobCart.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
        job_id:{
          type:Number,
          value: 123
        },
        job_name:{
          value:'智慧物流工程师',
          type: String
        },
        job_type:{
          value: '技术类',
          type: String
        },
        job_date:{
          value:'2021-08-28',
          type:String
        },
        job_address:{
          value:'合肥',
          type:String
        },
        job_salary:{
          value:'7000-12000',
          type:String
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
