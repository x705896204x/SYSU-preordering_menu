// pages/user_create/user_create.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    university_name: ["中山大学","清华大学","北京大学"],
    object_university: [
      {
        id: 0,
        name: '中山大学'
      },
      {
        id: 1,
        name: '清华大学'
      },
      {
        id: 2,
        name: '北京大学'
      }
    ],
    index: 0,
    isSelected: false,
    phone: "",
    studentId:"",
    animation:""
  },



  onReady: function(){
    //判断用户是否已注册,如果已经注册直接跳转
    const db = wx.cloud.database()
    db.collection('User').where({
      UserId: app.globalData.userInfor.openid
    }).get({
      success: res => {
        if (res.data.length != 0) {
          wx.redirectTo({
            url: '../index/index',
          })
        }
      }
    })
    //加载时的动画效果
    this.animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease'
    })

    this.animation.translateY(-200).opacity(1).step()
    this.setData({
      animation: this.animation.export()
    })
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //从缓存中读取用户信息
    wx.getStorage({
      key: 'userInfor',
      success(res) {
        console.log("inStorage:",res.data)
        app.globalData.userInfor = res.data
      }
    })

  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      isSelected: true
    })
  },

  bindToIndex(e){
    console.log(this.data.phone.length)
    var phoneEp = /[0-9]*/
    var IdEp = /[0-9]*/
    if (this.data.phone.length != 11 ||! phoneEp.test(this.data.phone)){
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.phone.length == 0||!IdEp.test(this.data.studentId)){
      wx.showToast({
        title: '请输入正确的学号',
        icon: 'none',
        duration: 2000
      })
    }
    else if (!this.data.isSelected){
      wx.showToast({
        title: '请选择学校',
        icon: 'none',
        duration: 2000
      })
    }
    else{
      app.globalData.userInfor.school = this.data.university_name[this.data.index]
      app.globalData.userInfor.phone = this.data.phone
      app.globalData.userInfor.studentId = this.data.studentId
      const db = wx.cloud.database()
      db.collection('User').where({
        UserId: app.globalData.userInfor.openid
      }).get({
        success: res => {
          console.log('用户查询成功: ', res)
          if (res.data.length == 0) {
            console.log('用户未注册')
            console.log(app.globalData.userInfor)
            db.collection('User').add({
              data: {
                UserId: app.globalData.userInfor.openid,
                UserName: app.globalData.userInfor.userName,
                ProfileImage: app.globalData.userInfor.profileImage,
                Gender: app.globalData.userInfor.gendPicIndex,
                StudentId: app.globalData.userInfor.studentId,
                UserTelephone: app.globalData.userInfor.phone,
                School: app.globalData.userInfor.school

              },
              success: res => {
                console.log('用户注册成功')
                wx.showLoading({
                  title: '注册成功,正在跳转',
                })
                wx.redirectTo({
                  url: '../index/index',
                })
              },
              fail: res => {
                console.log('用户注册失败')
              }
            })
          }
          else{
            console.log('用户已注册')
            wx.showToast({
              title: '用户已注册',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
            
      /*wx.redirectTo({
      url: '../index/index',
    })*/
    }
    
  }
  ,
  inputPhone(e){
    this.setData({
      phone: e.detail.value
    })
  }

  ,

  inputStudentId(e){
    this.setData({
      studentId: e.detail.value
    })
  }

})