//app.js
App({

  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }


    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfor: {
      openid: "",
      userName:"",
      profileImage:"",
      gendPicIndex:0,
      scoPicIndex:"",
      phoneNum:0,
      studentId:""
    },/*记录用户所有信息，包括头像profileImage, 用户名userName, 
=======
      school: "",
      phone: "",
      profileImage: "",
      gendPicIndex: 0,
      userName: "",
      studentId: "",

    }/*记录用户所有信息，包括头像profileImage, 用户名userName, 
>>>>>>> 127646427d5a475b1868b48945db37c9e818c6da
                    学校数组下标scoPicIndex, 性别数组下标gendPicIndex
                    电话号码phoneNum， 唯一标识openid*/
    restaurantInfor:{//从数据库拉下来的部分餐馆信息
      RestaurantId:"",
      RestaurantName:"",
      GatePhoto:"",
      EnvironmentPhoto:"",
      Description:"",
      Address:"",
      SchoolId:"",
      TelephoneNumber:1
    },
    School:{//存放了学校Id以及Name,方便用它做picker

    }
  }
})