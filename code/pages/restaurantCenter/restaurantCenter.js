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

    nickname: "中大饭堂",
    headImageUrl: "../../images/sidebar/OLcanteen.jpg",
    gender: "", // 
  },

  signin: function(){//进行系统登录，只用在debug阶段
    var that = this;
    //登录，获取用户openID
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.userInfor.openid = res.result.openid
        //从数据库查询该用户是否注册
        const db = wx.cloud.database()
        db.collection('User').where({
          UserId: app.globalData.userInfor.openid
        }).get({
          success: res => {
            console.log('用户查询成功: ', res)
            if (res.data.length == 0) {
              console.log('用户未注册')
              //用户注册
              //获取用户信息
              wx.getUserInfo({
                success(res) {

                  const userInfo = res.userInfo
                  app.globalData.userInfor.userName = userInfo.nickName
                  app.globalData.userInfor.profileImage = userInfo.avatarUrl
                  app.globalData.userInfor.gendPicIndex = userInfo.gender // 性别 0：未知、1：男、2：女
                  console.log("微信性别", userInfo.gender)
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
                     

                      wx.hideLoading()
                      console.log('用户注册成功')
                    },
                    fail: res => {
                      console.log('用户注册失败')
                    }
                  })
                },
                fail(res) {
                  console.log('获取用户信息失败')

                }
              })
            }
            else {
              console.log('用户已注册')
              app.globalData.userInfor.userName = res.data[0].UserName
              app.globalData.userInfor.profileImage = res.data[0].ProfileImage
              app.globalData.userInfor.gendPicIndex = res.data[0].Gender
              console.log('用户登录成功')
            }
          },
          fail: err => {
            console.error('用户查询失败：', err)
          }
        })


      },
      
    })
  },

  bindToSetting: function (e) {
    //this.data.loginState == true ||
    //console.log('openid', app.globalData.userInfo.openid
    if (app.globalData.userInfor.openid != "")//如果已经登录了
    {
      wx.navigateTo({
        url: 'restaurantSetting/restaurantSetting'
      })
      return;
    }
    else {
      wx.showToast({
        title: '用户未登录',
        icon: "none",
        duration: 1000
      })
      console.log("")
      return;
    }

  },

  bindOrderManage: function (e) {
    wx.navigateTo({
      url: '../receiveOrder/receiveOrder'
    })
  },


//这个云函数最终会将所有学校的Id以及name分别对应的放在 
//app.globalData.School.SchoolId和app.globalData.School.SchoolName 中
  getSchools: function () {
    var that = this
    wx.cloud.callFunction({
      name: 'getSchool',
      success: function (res) {
        console.log('查询学校', res)
        var schoolId = []
        var schoolName = []
        var data = res.result.data
        for (var counter = 0; counter < data.length; counter++) {
          schoolId.push(data[counter].SchoolId)
          schoolName.push(data[counter].SchoolName)
        }
        app.globalData.School.SchoolId = schoolId
        app.globalData.School.SchoolName = schoolName

        console.log(app.globalData.School.SchoolId)
        console.log(app.globalData.School.SchoolName)
      },
      fail: console.error
    })

  },

  getRestaurantInfor: function () {
    //首先根据UserId去Resturant查找其对应的Resturant.并将它的信息拉下来，debug阶段这部分信息是手动添加上去的，
    const db = wx.cloud.database()
    db.collection('Restaurant').where({
      OwenId: app.globalData.userInfor.openid
    }).get({
      success: res => {
        console.log('店铺查询成功: ', res)
        if (res.data.length == 1) {
          //更新globalData
          app.globalData.restaurantInfor.RestaurantId = res.data[0].RestaurantId
          app.globalData.restaurantInfor.RestaurantName = res.data[0].RestaurantName
          app.globalData.restaurantInfor.GatePhoto = res.data[0].GatePhoto
          app.globalData.restaurantInfor.EnvironmentPhoto = res.data[0].EnvironmentPhoto
          app.globalData.restaurantInfor.Description = res.data[0].Description
          app.globalData.restaurantInfor.Address = res.data[0].Address
          app.globalData.restaurantInfor.SchoolId = res.data[0].SchoolId
          app.globalData.restaurantInfor.TelephoneNumber = res.data[0].TelephoneNumber
          //更新界面信息
          this.setData({
            headImageUrl: app.globalData.restaurantInfor.GatePhoto,
            nickname: app.globalData.restaurantInfor.RestaurantName
          })
          return
        }
        if (res.data.length == 0) {
          wx.showToast({
            title: '用户未创建店铺',
            icon: "none",
            duration: 1000
          })
          console.log('该用户未创建店铺')

        }
        else if (res.data.length >= 2) {
          wx.showToast({
            title: '用户创建店铺多于2个',
            icon: "none",
            duration: 1000
          })
          console.log('用户创建店铺多于2个')
        }
      },
      fail(res) {
        console.log('获取店铺信息失败')

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //首先判断是否登录，如果没有登录，首先要进行登录，拿到openid以及UserId.但是当系统正常工作以后，这里可以没有任何东西
    //this.signin();//登录
    this.getSchools()
    this.getRestaurantInfor();//获取餐馆信息

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
    {
      console.log("用户未登录 from onShow", )
      return
    }
     //直接根据UserId去Resturant查找对应的餐馆信息,并更新global数据
    this.getRestaurantInfor()//获取餐馆信息
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
    this.getRestaurantInfor();
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