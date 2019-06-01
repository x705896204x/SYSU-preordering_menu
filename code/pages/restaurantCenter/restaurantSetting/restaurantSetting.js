// pages/fullyUserInfo/fullyUserInfo.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    schools: ['请选择', '中山大学', '清华大学', '北京大学'],//由于数据库中存储的是index，所以这个列表不可以插入，只能追加
    scoPicIndex: 0,

    genders: ['请选择', '男', '女'],
    gendPicIndex: 0,

    tempGatePhotoUrl: "",
    tempEnvironmentPhotoUrl:"",

    dbRestaurantInfoId: "",
    //需要本地数据记录下用户输入，但是没有提交的信息
    RestaurantName:"",
    Description:"",
    TelephoneNumber:"",
    Address:"",

    animationData: {},

    edit : false
  },
  //如果edit=true，那么页面上的信息可以修改，否则不可以修改
  isEdit: function (edit) {

    if (edit == true) {
      this.data.edit = true
      this.setData({
        change_dis:false,
        edit: true
      })

    } else {
      this.data.edit = false
      this.setData({
        edit: false,
        change_dis:true
      })
    }
  },

  //填写完成，提交修改
  bindOkClick(e) {
    var that = this
    if (this.data.edit == false)
      return;
    console.log('ok发送点击，携带值为', e.detail.value)

    wx.showLoading({
      title: '正在提交',
    })
    const db = wx.cloud.database()

    //更新其它信息
    db.collection('Restaurant').doc(that.data.dbRestaurantInfoId).update({
      data: {
        RestaurantName: that.data.RestaurantName,
        Description: that.data.Description,
        Address: that.data.Address,
        SchoolId: that.data.SchoolId,
        TelephoneNumber: that.data.TelephoneNumber
      },
      success: res => {
        console.log("其它数据更新成功")

        // console.log("临时路径", that.data.tempHeadImageUrl)

        if (that.data.tempGatePhotoUrl != "")//如果是门面图片是新图片
        {
          const filePath = that.data.tempGatePhotoUrl
          // 上传图片
          var timestamp = Date.parse(new Date());
          const cloudPath = 'RestaurantInfoImage/' + app.globalData.userInfor.openid + timestamp + filePath.match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath,
            filePath,
            success: res => {
              console.log('[上传图片] 成功：', res)
            },
            fail: e => {
              console.error('[上传] 失败：', e)
              wx.showToast({
                icon: 'none',
                title: '上传失败',
              })
            },
            complete: res => {
              console.log('[上传图片] 完成：', res)
              that.data.headImagePath = res.fileID
              //更新数据库中的图片路径
              console.log("headImagePath", that.data.headImagePath)
              db.collection('User').doc(that.data.dbRestaurantInfoId).update({
                data: {
                  ProfileImage: that.data.headImagePath,
                },
                success: res => {
                  console.log("头像数据更新success")
                },
                fail: res => {
                  console.log("头像数据更新失败")
                }
              })
            },
          })
        }
        if (that.data.tempEnvironmentPhotoUrl == "")//如果环境图片也是新图片
        {

        }

        this.isEdit(false);

        wx.setNavigationBarTitle({
          title: '设置'
        })

        wx.hideLoading()
        wx.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: res => {
        console.log("其它数据更新失败")
      }
    })
  },



  bindEdit(e) {
    console.log('edit发送点击，携带值为', e.detail.value)
    //添加旋转动画
    const animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation = animation

    animation.rotateY(360).step()
    this.setData({
      animationData: animation.export()
    })
    this.isEdit(true);

    wx.setNavigationBarTitle({
      title: '修改信息'
    })
  },

  bindSchoolPicker(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      scoPicIndex: e.detail.value
    })
  },

  bindAddressInput(e) {
    this.data.Address = e.detail.value
  },

  changeGatePhoto(e) {
    if (this.data.edit == false)
      return;
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.data.tempGatePhotoUrl = res.tempFilePaths[0]
        that.setData({
          GatePhoto: res.tempFilePaths[0]
        })
      }
    })
  },

  changeEnvironmentPhoto(e) {
    if (this.data.edit == false)
      return;
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.data.tempEnvironmentPhotoUrl = res.tempFilePaths[0]
        that.setData({
          EnvironmentPhoto: res.tempFilePaths[0]
        })
      }
    })
  },

  bindRestaurantNameInput(e) {
    this.data.RestaurantName = e.detail.value
  },

  bindTelephoneNumberInput(e) {
    this.data.TelephoneNumber = e.detail.value
  },

  bindDescriptionInput(e) {
    this.data.Description = e.detail.value
  },

  updateResturantInfo: function (e) {
    //将所有与这个餐馆相关的基本信息从数据库拉下来，并以合适的方式存放到本地
    var that = this
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
          this.setData({
            phoneNum: app.globalData.userInfor.phoneNum,
          })
        }
        if (res.data[0].School != undefined) {
          app.globalData.userInfor.scoPicIndex = res.data[0].School
          this.setData({
            scoPicIndex: app.globalData.userInfor.scoPicIndex
          })
        }

        if (res.data[0].StudentId != undefined) {
          app.globalData.userInfor.studentId = res.data[0].StudentId
          this.setData({
            studentId: app.globalData.userInfor.studentId
          })
        }
        //该条记录的ID
        that.data.dbRestaurantInfoId = res.data[0]._id

        console.log("查询用户信息成功", res)
        //更新界面信息
        this.setData({
          headImagePath: app.globalData.userInfor.profileImage,
          userName: app.globalData.userInfor.userName,
          gendPicIndex: app.globalData.userInfor.gendPicIndex,
        })
      },
      fail: res => {
        console.log("查询用户信息失败")
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //载入的时候从数据库加载详细信息
    this.isEdit(false)
    this.updateResturantInfo();
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
    //不需要从数据库更新信息，可以直接把globalData拿过来用
    this.setData({
      headImageUrl: app.globalData.restaurantInfor.GatePhoto,
      nickname: app.globalData.restaurantInfor.RestaurantName
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
    this.updateResturantInfo();
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