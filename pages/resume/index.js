import {
  http
} from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    resumeList: [],
    fileLink: getApp().globalData.ip + '/api/file?image=false&openId=' + wx.getStorageSync('openId'),
    active: 0,
    columns: ['男', '女'],
    columnsMarriage: ['未婚', '已婚'],
    columnsAttribute: ['普通', '211', '985', '其它'],
    columnsAcademic: ['本科', '硕士', '博士', '更高'],
    sexShow: false,
    marriageShow: false,
    attributeShow: false,
    academicShow: false,
    resumeInfo: {
      success: false,
      name: '',
      phone: '',
      birthday: '',
      sex: '男',
      weight: '',
      nation: '',
      politics: '',
      nativePlace: '',
      marriage: '未婚',
      ID: '',
      email: '',
      address: '',
      //教育经历开始
      education: [],
      learning_status: {},
      practice_status: {},
      skill_certificate: {},
      self_assessment: {},
    }
  },

  education: {
    school: '', //学校
    attribute: '普通', //属性
    academic: '本科', //学历
    major: '', //专业
    course: '' //课程
  },

  learning_status: {
    number_of_failures: 0,
    course_of_failures: '',
    CET4: '',
    CET6: '',
    average_scores: '',
    ranking: '',
    number_people: '',
    urls: []
  },

  practice_status: {
    practice_school: '',
    practice_society: ''
  },

  skill_certificate: {
    certificate: '',
    urls: []
  },

  self_assessment: {
    merit: '',
    defect: '',
    hobbies: '',
    speciality: ''
  },

  index: 0,

  async save(e) {

    this.setData({
      resumeInfo: this.data.resumeInfo
    })


    if (this.check(0) && this.check(1) && this.check(2) && this.check(5) && this.data.resumeInfo.name != '' && this.data.resumeInfo.phone != '') {
      let res = http({
        method: "PUT",
        url: this.data.server + "/api/user",
        data: {
          openId: wx.getStorageSync('openId'),
          username: this.data.resumeInfo.name,
          phoneNumber: this.data.resumeInfo.phone,
          msg: JSON.stringify(this.data.resumeInfo)
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          // 'Content-Type': 'application/json'
        },
      })
      wx.showToast({
        title: '保存成功',
      })
    } else {
      wx.showToast({
        title: '请完善信息',
        icon: 'none'
      })
    }

  },

  deleteHandle(e) {
    this.setData({
      fileList: []
    })
  },

  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.data.resumeInfo.sex = value;
    this.setData({
      resumeInfo: this.data.resumeInfo
    })

  },

  onChangeAttribute(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.data.resumeInfo.education[this.index].attribute = value;
    this.setData({
      resumeInfo: this.data.resumeInfo
    })

  },

  onChangeAcademic(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    this.data.resumeInfo.education[this.index].academic = value;
    this.setData({
      resumeInfo: this.data.resumeInfo
    })
  },

  onChangeSex(e) {
    this.setData({
      sexShow: true
    })
  },

  onShowMarriage(e) {
    this.setData({
      marriageShow: true
    })
  },

  onChangeMarriage(e) {
    const {
      picker,
      value,
      index
    } = e.detail;
    this.data.resumeInfo.marriage = value;
    this.setData({
      resumeInfo: this.data.resumeInfo
    })
  },

  onAttribute(e) {
    this.setData({
      attributeShow: true
    })
    this.index = e.currentTarget.dataset.index;

  },

  onAcademic(e) {
    this.setData({
      academicShow: true
    })
    this.index = e.currentTarget.dataset.index;
  },

  onClose(e) {
    this.setData({
      sexShow: false
    })
  },

  onCloseMarriage(e) {
    this.setData({
      marriageShow: false
    })
  },

  onCloseAttribute(e) {
    this.setData({
      attributeShow: false
    })
  },
  onCloseAcademic(e) {
    this.setData({
      academicShow: false
    })
  },
  activeHandle(e) {
    this.setData({
      active: e.currentTarget.dataset.num
    })
  },

  check(index) {
    if (index == 0) {
      return !(this.data.resumeInfo.birthday == '' || this.data.resumeInfo.nation == '' || this.data.resumeInfo.politics == '' || this.data.resumeInfo.nativePlace == '' || this.data.resumeInfo.weight == '' || this.data.resumeInfo.ID == '' || this.data.resumeInfo.email == '' || this.data.resumeInfo.address == '');
    } else if (index == 1) {
      var temp = true;
      this.data.resumeInfo.education.map(item => {
        if (item.school == '' || item.major == '' || item.course == '') {
          temp = false;
        }
      });
      return temp
    } else if (index == 2) {
      const temp = this.data.resumeInfo.learning_status;
      if (temp.average_scores == '' || temp.ranking == '' || temp.number_people == '') {
        return false
      } else {
        return true
      }
    } else if (index == 5) {
      const temp = this.data.resumeInfo.self_assessment;
      if (temp.merit == '' || temp.defect == '' || temp.hobbies == '' || temp.speciality == '') {
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  },

  afterRead(event) {
    const {
      file
    } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    let that = this;
    wx.uploadFile({
      url: this.data.server + '/api/file?image=true&openId=' + wx.getStorageSync('openId'), // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      // formData: {
      //   user: 'test'
      // },
      success(res) {
        // 上传完成需要更新 fileList
        let fileList = []
        fileList.push({
          url: that.data.server + '/api/file?image=true&openId=' + wx.getStorageSync('openId'),
          isImage: true,
          deletable: true,
        });
        that.setData({
          fileList: fileList
        });
      },
    });
  },

  afterReadFile(event){
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    let that = this;
    wx.uploadFile({
      url: this.data.server + '/api/file?image=false&fileName=' + event.detail.file.name + '&openId=' + wx.getStorageSync('openId'), // 仅为示例，非真实的接口地址
      filePath: event.detail.file.url,
      name: 'file',
      // formData: {
      //   user: 'test'
      // },
      success(res) {
        console.log(res.data);
        that.getResumes()
      },
      fail(res){
        console.log(res);
      }
    });
  },

  delEdu(e) {
    this.data.resumeInfo.education.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      resumeInfo: this.data.resumeInfo
    })
  },

  addEdu(e) {
    this.data.resumeInfo.education.splice(e.currentTarget.dataset.index + 1, 0, JSON.parse(JSON.stringify(this.education)));
    this.setData({
      resumeInfo: this.data.resumeInfo
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      server: getApp().globalData.ip
    })
    this.getResumes()
    let temp = wx.getStorageSync('userInfo');
    http({
      url: this.data.server + '/api/file?image=true&openId=' + wx.getStorageSync('openId'),
      method: "GET"
    }).then((d) => {
      if (d.data) {
        let fileList = []
        fileList.push({
          url: this.data.server + '/api/file?image=true&openId=' + wx.getStorageSync('openId'),
          isImage: true,
          deletable: true,
        });
        this.setData({
          fileList: fileList
        })
      }
    })
    if (temp.success) {
      this.setData({
        resumeInfo: temp,
      })
    } else {
      this.data.resumeInfo.education = [JSON.parse(JSON.stringify(this.education))];
      this.data.resumeInfo.learning_status = JSON.parse(JSON.stringify(this.learning_status));
      this.data.resumeInfo.practice_status = JSON.parse(JSON.stringify(this.practice_status));
      this.data.resumeInfo.skill_certificate = JSON.parse(JSON.stringify(this.skill_certificate));
      this.data.resumeInfo.self_assessment = JSON.parse(JSON.stringify(this.self_assessment));
      this.setData({
        resumeInfo: this.data.resumeInfo
      })
    }
  },

  deleteFile(e){
    http({
      url: this.data.server + '/api/user/resume?openId=' + wx.getStorageSync('openId') + "&id=" + e.currentTarget.dataset.id,
      method: "DELETE"
    }).then(d => {
      this.getResumes()
    })
  },

  downloadFile(e) {
    let that = this
    var file = e.currentTarget.dataset.path;
    var fileType = file.split(".").pop();
    wx.downloadFile({
      url: that.data.fileLink + "&id=" + e.currentTarget.dataset.id,
      // filePath: wx.env.USER_DATA_PATH + e.currentTarget.dataset.path,
      success: function (res) {
        // var filePath = res.filePath
        wx.openDocument({
          filePath: res.tempFilePath,
          fileType: fileType,
          success: function (res) {
            console.log(1);
          },
          fail(r) {
            console.log(r);
          }
        })
      }
    })
  },

  getResumes() {
    http({
      url: this.data.server + '/api/user/resume?openId=' + wx.getStorageSync('openId'),
      method: "GET"
    }).then(d => {
      this.setData({
        resumeList: d.data.data
      })
    })
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

  },

  setName(e) {
    this.data.resumeInfo.name = e.detail;
  },

  setPhone(e) {
    this.data.resumeInfo.phone = e.detail;
  },

  setBirthday(e) {
    this.data.resumeInfo.birthday = e.detail;
  },

  setNation(e) {
    this.data.resumeInfo.nation = e.detail;
  },

  setPolitics(e) {
    this.data.resumeInfo.politics = e.detail;
  },

  setNativePlace(e) {
    this.data.resumeInfo.nativePlace = e.detail;
  },

  setWeight(e) {
    this.data.resumeInfo.weight = e.detail;
  },

  setID(e) {
    this.data.resumeInfo.ID = e.detail;
  },

  setEmail(e) {
    this.data.resumeInfo.email = e.detail;
  },

  setAddress(e) {
    this.data.resumeInfo.address = e.detail;
  },

  setSchool(e) {
    this.data.resumeInfo.education[e.currentTarget.dataset.index].school = e.detail;
  },

  setMajor(e) {
    this.data.resumeInfo.education[e.currentTarget.dataset.index].major = e.detail;
  },

  setCourse(e) {
    this.data.resumeInfo.education[e.currentTarget.dataset.index].course = e.detail;
  },

  setNumberOfFail(e) {
    this.data.resumeInfo.learning_status.number_of_failures = e.detail;
  },

  setCourseOfFail(e) {
    this.data.resumeInfo.learning_status.course_of_failures = e.detail;
  },

  setCET4(e) {
    this.data.resumeInfo.learning_status.CET4 = e.detail;
  },

  setCET6(e) {
    this.data.resumeInfo.learning_status.CET6 = e.detail;
  },

  setAverageScores(e) {
    this.data.resumeInfo.learning_status.average_scores = e.detail;
  },

  setRanking(e) {
    this.data.resumeInfo.learning_status.ranking = e.detail;
  },

  setNumberPeople(e) {
    this.data.resumeInfo.learning_status.number_people = e.detail;
  },

  setPracticeSchool(e) {
    this.data.resumeInfo.practice_status.practice_school = e.detail;
  },

  setPracticeSociety(e) {
    this.data.resumeInfo.practice_status.practice_society = e.detail;
  },

  setCertificate(e) {
    this.data.resumeInfo.skill_certificate.certificate = e.detail;
  },

  setMerit(e) {
    this.data.resumeInfo.self_assessment.merit = e.detail
  },

  setDefect(e) {
    this.data.resumeInfo.self_assessment.defect = e.detail
  },

  setHobbies(e) {
    this.data.resumeInfo.self_assessment.hobbies = e.detail
  },

  setSpeciality(e) {
    this.data.resumeInfo.self_assessment.speciality = e.detail
  }



})