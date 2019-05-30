//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    networkType: 'none'
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //从缓存中读取用户信息
    wx.getStorage({
      key: 'userInfor',
      success(res) {
        console.log("inStorage:", res.data)
        app.globalData.userInfor = res.data
      }
    })
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
    wx.getNetworkType({
      success: res => {
        this.setData({
          networkType: res.networkType
        })
        console.log(this.data.networkType)
        if (this.data.networkType == 'none') {
          wx.showToast({
            title: '无网络连接',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      if (this.data.hasUserInfo) {
        wx.redirectTo({
          url: '../user_create/user_create',
        })
        
      }
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true

        })
        if (this.data.hasUserInfo) {
          wx.redirectTo({
            url: '../user_create/user_create',
          })
        }
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          if (res.userInfo) {
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
          if (this.data.hasUserInfo) {
            wx.redirectTo({
              url: '../user_create/user_create',
            })
          }
          else {
            wx.showToast({
              title: "获取用户信息失败",
              icon: 'none',
              duration: 2000
            })
          }
        }

      })
    }
  },
  toastTimeOut: function () {
    wx.showToast({
      title: '网络连接超时',
      icon: 'none',
      duration: 2000
    })
  }
  ,
  onStartTap: function () {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(this.toastTimeOut, 30000)
  }
  ,
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    if (e.detail.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
    
    if (this.data.hasUserInfo) {
      console.log(this.data.userInfo)
      app.globalData.userInfor.profileImage = this.data.userInfo.avatarUrl
      app.globalData.userInfor.gendPicIndex = this.data.userInfo.gender
      app.globalData.userInfor.userName = this.data.userInfo.nickName
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log( res.result.openid)
          app.globalData.userInfor.openid = res.result.openid
          //对数据进行缓存
          wx.setStorage({
            key: 'userInfor',
            data: app.globalData.userInfor,
          })
          console.log(app.globalData.userInfor)
          wx.redirectTo({
            url: '../user_create/user_create',
          })
        }
      })
    }
    else {
      wx.showToast({
        title: "获取用户信息失败",
        icon: 'none',
        duration: 2000
      })
    }
  }

})
