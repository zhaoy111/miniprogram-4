// app.js
App({
  data_test: {
    jobs_test: [{
        job_id: 123,
        job_name: '智慧物流工程师',
        job_type: '技术类',
        job_date: '2021-08-28',
        job_address: '合肥',
        job_salary: '7000-12000'
      },
      {
        job_id: 124,
        job_type: '职能类',
        job_name: '助理',
        job_date: '2021-08-29',
        job_address: '合肥',
        job_salary: '6000-12000'
      },
      {
        job_id: 125,
        job_name: '管培生',
        job_type: '技术类',
        job_date: '2021-08-30',
        job_address: '合肥',
        job_salary: '6000-10000'
      },
      {
        job_id: 126,
        job_name: '人事专员',
        job_type: '职能类',
        job_date: '2021-08-28',
        job_address: '合肥',
        job_salary: '7000-12000'
      },
      {
        job_id: 127,
        job_name: '财务',
        job_type: '职能类',
        job_date: '2021-08-28',
        job_address: '合肥',
        job_salary: '7000-12000'
      },
      {
        job_id: 128,
        job_name: '物流工程师',
        job_type: '技术类',
        job_date: '2021-08-28',
        job_address: '合肥',
        job_salary: '7000-12000'
      },
      {
        job_id: 129,
        job_name: '安全工程师',
        job_type: '技术类',
        job_date: '2021-08-28',
        job_address: '合肥',
        job_salary: '7000-12000'
      },
      {
        job_id: 130,
        job_name: '安全工程师',
        job_type: '技术类',
        job_date: '2021-08-28',
        job_address: '合肥',
        job_salary: '7000-12000'
      },
      {
        job_id: 131,
        job_name: '安全工程师',
        job_type: '技术类',
        job_date: '2021-08-28',
        job_address: '合肥',
        job_salary: '7000-12000'
      },
      {
        job_id: 132,
        job_name: '安全工程师',
        job_type: '技术类',
        job_date: '2021-08-28',
        job_address: '合肥',
        job_salary: '7000-12000'
      }
    ],
    indexImage: [{
        url: 'http://www.jaclogistic.cn/soceo/images/ban4.jpg'
      },
      {
        url: 'http://www.jaclogistic.cn/soceo/images/pic2.jpg'
      },
      {
        url: 'http://www.jaclogistic.cn/soceo/images/pic5.jpg'
      },
      {
        url: 'http://www.jaclogistic.cn/soceo/images/ban3.jpg'
      },
      {
        url: 'http://www.jaclogistic.cn/soceo/images/ban2.jpg'
      }
    ],
    // 模拟投递记录 开始
    send_job: [{
        job_id: 123,
        job_name: '智慧物流工程师',
        job_type: '技术类',
        job_date: '2021-08-28',
        job_address: '合肥',
        job_salary: '7000-12000',
        job_status: 1,
        steps: [{
            text: '简历初审',
            desc: '2021-08-29',
            inactiveIcon: 'success'
          },
          {
            text: '一面',
            desc: '2021-08-30',
            inactiveIcon: 'success'
          },
          {
            text: '二面',
            desc: '2021-08-30',
            activeIcon: 'pause-circle-o',
            inactiveIcon: 'success',
          },
          {
            text: '签订合同',
            desc: '未定',
          },
        ],
        active: 2
      },
    ],
    // 模拟投递记录 结束
    job_panel: {
      job_name: '智慧物流工程师',
      job_type: '技术类',
      job_date: '2021-08-28',
      job_address: '合肥',
      job_salary: '7000-12000',
      job_res: '<div>1、承担物流域相关系统分析、架构设计、核心代码编写，确保技术方案能够按计划要求，高质量的完成；</div>' +
        '<div>2、对技术有较强的钻研及学习精神，能够深入了解开源技术、现有系统技术等相关技术原理，出现问题时能够通过较强的技术手段较好的解决问题；</div>' +
        '<div>3、深入理解业务架构和需求，识别系统风险，设计稳定性以及容灾解决方案；</div>' +
        '<div>4、承担系统服务、运行环境、遗留系统的性能优化；</div>' +
        '<div>5、加分项：有物流供应链相关经历优先</div>',
      job_require: '<div>1、计算机相关专业本科及以上学历，三年以上Java 分布式应用开发经验，熟悉大型互联网公司运维模式，具备运维经验优先；</div>' +
        '<div>2、熟悉 Spring、MyBatis、SpringBoot、MQ、ShardingJdbc、Redis 等开源框架；</div>' +
        '<div>3、熟悉基于微服务、云原生的开发架构模式；</div>' +
        '<div>4、了解多线程、高性能、分布式应用的设计、编码及性能调优；有高并发应用开发经验优先；</div>' +
        '<div>5、了解关系数据库及 Linux 操作系统常规使用，有数据库调优经验优先；</div>' +
        '<div>6、有电商商品、交易、供应链、物流相关业务开发经验者优先。</div>'
    },
    // 简历 开始
    // resumeInfo: {
    //   success:false,
    //   name: '',
    //   phone: '',
    //   birthday: '',
    //   sex: '男',
    //   weight: '',
    //   nation: '',
    //   politics: '',
    //   nativePlace: '',
    //   marriage: '未婚',
    //   ID: '',
    //   email: '',
    //   address: '',
    //   //教育经历开始
    //   education: [],
    //   learning_status:{},
    //   practice_status:{},
    // },
    // 简历 结束  

    // 积分规则 开始
    help:'<div style="white-space: pre;">1、转发你的邀请码\n\t详情请见：我的-邀请码</div>'
    + '<div style="white-space: pre;">2、被邀请用户完成注册，+1分</div>'
    + '<div style="white-space: pre;">3、被邀请用户完成简历提交，+1分</div>'
    + '<div style="white-space: pre;">4、被邀请用户简历合格，+10分</div>'
    + '<div style="white-space: pre;">5、被邀请用户简历邀请面试，+50分</div>'
    + '<div style="white-space: pre;">6、被邀请用户简历通过面试，+100分</div>'
    + '<div style="white-space: pre;">7、被邀请用户签订合同，+300分</div>'
    + '<div style="white-space: pre;">8、被邀请用户入职满3个月，+1000分</div>',
    // 积分规则 结束
    
    //礼物列表 开始
    gifts:[
      {
          gift_id:1,
          gift_image:'https://img.yzcdn.cn/vant/cat.jpeg',
          gift_name:'宠物猫',
          gift_desc:'描述：主人，快把我带回家吧描述：主人，快把我带回家吧',
          gift_type:['礼物'],
          gift_credit:5
      },
      {
          gift_id:2,
          gift_image:'https://img.yzcdn.cn/vant/cat.jpeg',
          gift_name:'耳机',
          gift_desc:'描述：精选二手耳机',
          gift_type:['礼物'],
          gift_credit:5
      },
      {
          gift_id:3,
          gift_image:'https://img.yzcdn.cn/vant/cat.jpeg',
          gift_name:'5%绩效加成',
          gift_desc:'描述：当月绩效奖金+5%',
          gift_type:['福利'],
          gift_credit:5
      },
      {
          gift_id:4,
          gift_image:'https://img.yzcdn.cn/vant/cat.jpeg',
          gift_name:'10元红包',
          gift_desc:'描述',
          gift_type:['福利'],
          gift_credit:5
      },
      {
          gift_id:5,
          gift_image:'https://img.yzcdn.cn/vant/cat.jpeg',
          gift_name:'20元红包',
          gift_desc:'描述',
          gift_type:['福利'],
          gift_credit:10
      },
  {
          gift_id:6,
          gift_image:'https://img.yzcdn.cn/vant/cat.jpeg',
          gift_name:'50元红包',
          gift_desc:'描述',
          gift_type:['福利'],
          gift_credit:50
      },
      {
          gift_id:7,
          gift_image:'https://img.yzcdn.cn/vant/cat.jpeg',
          gift_name:'10元天猫优惠券',
          gift_desc:'描述',
          gift_type:['福利'],
          gift_credit:3
      },
      {
          gift_id:8,
          gift_image:'https://img.yzcdn.cn/vant/cat.jpeg',
          gift_name:'20元天猫优惠券',
          gift_desc:'描述',
          gift_type:['福利'],
          gift_credit:5
      },
      {
          gift_id:9,
          gift_image:'https://img.yzcdn.cn/vant/cat.jpeg',
          gift_name:'50元天猫优惠券',
          gift_desc:'描述',
          gift_type:['福利'],
          gift_credit:10
      },
  ],
  //礼物列表 结束

  },

  data_test_resume:{
    success:false
  },
  data_test_credit:{
    available_credits:1362,
    lock_credits:3,
    income_log:[
      {content:'被邀请用户***完成简历提交',date1:'2021年9月11日',tip:'+1'},
      {content:'被邀请用户***简历合格',date1:'2021年9月10日',tip:'+10'},
      {content:'被邀请用户***简历邀请面试',date1:'2021年9月9日',tip:'+50'},
      {content:'被邀请用户***入职满3个月',date1:'2021年9月1日',tip:'+1000'},
      {content:'被邀请用户***签订合同',date1:'2021年9月1日',tip:'+300'},
      {content:'被邀请用户***简历通过面试',date1:'2021年9月1日',tip:'+100'},
      {content:'被邀请用户***完成简历提交',date1:'2021年8月11日',tip:'+1'},
      {content:'被邀请用户***完成简历提交',date1:'2021年8月11日',tip:'+1'},
      {content:'被邀请用户***完成简历提交',date1:'2021年8月11日',tip:'+1'},
    ],
    outcome_log:[
      {content:'兑换礼物：耳机',date1:'2021年9月11日',tip:'-500'},
      {content:'兑换福利：休息0.5天',date1:'2021年9月10日',tip:'-600'},
    ],
    lock_log:[
      {content:'未知原因锁定',date1:'2021年9月1日',tip:'2'},
      {content:'未知原因锁定',date1:'2021年9月1日',tip:'1'},
    ],
    time_log:[
      {content:'被邀请用户***简历通过面试',date1:'2021年9月1日',date2:'2021年10月1日',tip:'100'},
      {content:'被邀请用户***完成简历提交',date1:'2021年8月11日',date2:'2021年9月11日',tip:'1'},
      {content:'被邀请用户***完成简历提交',date1:'2021年8月11日',date2:'2021年9月11日',tip:'1'},
      {content:'被邀请用户***完成简历提交',date1:'2021年8月11日',date2:'2021年9月11日',tip:'1'},
    ]
  },

  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

   
    if(!wx.getStorageSync('data_test')){
      wx.setStorageSync('data_test', this.data_test)
    }
    if(!wx.getStorageSync('data_test_resume')){
      wx.setStorageSync('data_test_resume',this.data_test_resume)
    }
    if(!wx.getStorageSync('data_test_credit')){
      wx.setStorageSync('data_test_credit', this.data_test_credit)
    }
   
  },
  globalData: {
    userInfo: null
  }
})