// pages/sidebar/sidebar.js
const app = getApp();
Page({


  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    logged: false,
    takeSession: false,
    requestResult: '',

    nickname:"点击登录",
    headImageUrl: "../../images/sidebar/OLcanteen.jpg",
    gender:"", // 
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //首先判断是否有用户信息
    
  },
  bindenterTips:function(e){
    if (app.globalData.userInfor.openid=="")
    {
      wx.showToast({
        title: '用户未登录',
        icon:"none",
        duration: 1000
      })
    }else{
      wx.navigateTo({
        url: '../enterTips/enterTips',
      })
    }
  },

  bindOrderManage:function(e){
    if (app.globalData.userInfor.openid == "") {
      wx.showToast({
        title: '用户未登录',
        icon: "none",
        duration: 1000
      })
    } else {
      wx.navigateTo({
        url:'../orderManage/orderManage'
      })
    }
  },

  bindMyResturant:function(e){
    if (app.globalData.userInfor.openid == "") {
      wx.showToast({
        title: '用户未登录',
        icon: "none",
        duration: 1000
      })
    } else {
      wx.navigateTo({
        url: '../receiveOrder/receiveOrder'
      })
    }
  },

 bindGetUserInfo: function (e) {
   //this.data.loginState == true ||
   //console.log('openid', app.globalData.userInfo.openid
   if ( app.globalData.userInfor.openid != "")//如果已经登录了
    {
      wx.navigateTo({
        url: '../fullyUserInfo/fullyUserInfo?userNameIn='+this.data.nickname +'&headImagePathIn='+this.data.headImageUrl,
      })
      return;
    }
    //如果没有登录
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      wx.showLoading({
        title: '正在登录',
      })
      var that = this;
      console.log("userinfor", e.detail.userInfo)
      //登录，获取用户openID
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] user openid: ', res.result.openid)
          app.globalData.userInfor.openid = res.result.openid
          //从数据库查询该用户是否注册
          const db=wx.cloud.database()
          db.collection('User').where({
            UserId: app.globalData.userInfor.openid
          }).get({
            success: res => {
              console.log('用户查询成功: ', res)
              if (res.data.length == 0)
              {
                console.log('用户未注册')
                //用户注册
                //获取用户信息
                wx.getUserInfo({
                  success(res) {
                    
                    const userInfo = res.userInfo
                    app.globalData.userInfor.userName = userInfo.nickName
                    app.globalData.userInfor.profileImage = userInfo.avatarUrl
                    app.globalData.userInfor.gendPicIndex= userInfo.gender // 性别 0：未知、1：男、2：女
                    console.log("微信性别",userInfo.gender)
                    //将用户信息提交到数据库
                    console.log('获取用户信息成功')
                    db.collection('User').add({
                      data: {
                        UserId: app.globalData.userInfor.openid,
                        UserName: app.globalData.userInfor.userName,
                        ProfileImage: app.globalData.userInfor.profileImage,
                        Gender: app.globalData.userInfor.gendPicIndex
                      },
                      success: res => {
                        //更新界面显示信息
                        that.setData({ nickname: app.globalData.userInfor.userName})
                        that.setData({ headImageUrl: app.globalData.userInfor.profileImage})

                        wx.hideLoading()
                        console.log('用户注册成功')
                      },
                      fail: res => {
                        console.log('用户注册失败')
                      }
                    })
                  },
                  fail(res){
                    console.log('获取用户信息失败')
                    
                  }
                })  
              }
              else{
                console.log('用户已注册')
                app.globalData.userInfor.userName=res.data[0].UserName
                app.globalData.userInfor.profileImage = res.data[0].ProfileImage
                app.globalData.userInfor.gendPicIndex=res.data[0].Gender

                that.setData({ nickname: app.globalData.userInfor.userName})
               // console.log('headImageURL', app.globalData.userInfor.profileImage)
                that.setData({ headImageUrl: app.globalData.userInfor.profileImage})
               // console.log('headImageURL2', app.globalData.userInfor.profileImage)
                wx.hideLoading()
                console.log('用户登录成功')
                that.setData({ loginState: true })
              }
            },
            fail: err => {
              console.error('用户查询失败：', err)
            }
          })
          
         
        },
        //获取用户ID失败或者用户按了拒绝按钮以后，要点击授权按钮可以重新拉起授权。
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
          wx.navigateTo({
            url: '../deployFunctions/deployFunctions',
          })
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
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
    if (app.globalData.userInfor.openid == "")
      return
    this.setData({
      nickname: app.globalData.userInfor.userName,
      headImageUrl: app.globalData.userInfor.profileImage
    })
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
    console.log("下拉")
    const db = wx.cloud.database()
    db.collection('User').where({
      UserId: app.globalData.userInfor.openid
    }).get({
      success: res => {
        //更新相关变量
        app.globalData.userInfor.userName = res.data[0].UserName
        app.globalData.userInfor.profileImage = res.data[0].ProfileImage
        app.globalData.userInfor.gendPicIndex = res.data[0].Gender
        if (res.data[0].UserTelephone != undefined) {
          app.globalData.userInfor.phoneNum = res.data[0].UserTelephone
        }
        if (res.data[0].School != undefined) {
          app.globalData.userInfor.scoPicIndex = res.data[0].School
        }

        console.log("查询用户信息成功", res)
        //更新界面信息
        this.setData({
          headImageUrl: app.globalData.userInfor.profileImage,
          nickname: app.globalData.userInfor.userName,
        })
      },
      fail: res => {
        console.log("查询用户信息失败")
      }
    })
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

  }
})