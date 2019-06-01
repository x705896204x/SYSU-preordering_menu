// pages/fullyUserInfo/fullyUserInfo.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    schools: [],//由于数据库中存储的是index，所以这个列表不可以插入，只能追加
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
    SchoolId:"",

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
    var schoolId = app.globalData.School.SchoolId[that.data.scoPicIndex]
    db.collection('Restaurant').doc(that.data.dbRestaurantInfoId).update({
      data: {
        RestaurantName: that.data.RestaurantName,
        Description: that.data.Description,
        Address: that.data.Address,
        SchoolId: schoolId,
        TelephoneNumber: that.data.TelephoneNumber
      },
      success: res => {
        console.log("其它数据更新结果", res.data)

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
              app.globalData.restaurantInfor.GatePhoto = res.fileID
              //更新数据库中的图片路径
              console.log("GatePhoto ", res.fileID)
              db.collection('Restaurant').doc(that.data.dbRestaurantInfoId).update({
                data: {
                  GatePhoto: res.fileID,
                },
                success: res => {
                  console.log("GatePhoto更新success")
                },
                fail: res => {
                  console.log("GatePhoto更新失败")
                }
              })
            },
          })
        }
        if (that.data.tempEnvironmentPhotoUrl != "")//如果环境图片也是新图片
        {
          const filePath = that.data.tempEnvironmentPhotoUrl
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
              app.globalData.restaurantInfor.EnvironmentPhoto = res.fileID
              //更新数据库中的图片路径
              console.log("EnvironmentPhoto", res.fileID)
              db.collection('Restaurant').doc(that.data.dbRestaurantInfoId).update({
                data: {
                  EnvironmentPhoto: res.fileID,
                },
                success: res => {
                  console.log("EnvironmentPhoto更新success")
                },
                fail: res => {
                  console.log("EnvironmentPhoto更新失败")
                }
              })
            },
          })
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

  getRestaurantInfor: function () {
    var that = this
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
          //从app.globalData.School.SchoolId中查询对应的Id知道其下标

          var index_schlId = app.globalData.School.SchoolId.indexOf(res.data[0].SchoolId)
          if(index_schlId == -1)
          {
            console.log("School表中未找到对应与Restaurant表的SchoolId")
          }
            
          this.setData({
            GatePhoto: app.globalData.restaurantInfor.GatePhoto,
            EnvironmentPhoto: app.globalData.restaurantInfor.EnvironmentPhoto,
            schools: app.globalData.School.SchoolName,
            scoPicIndex: index_schlId,
            Description:app.globalData.restaurantInfor.Description,
            RestaurantName: app.globalData.restaurantInfor.RestaurantName,
            TelephoneNumber: app.globalData.restaurantInfor.TelephoneNumber,
            Address: app.globalData.restaurantInfor.Address 
          })
          that.data.dbRestaurantInfoId = res.data[0]._id
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
    //载入的时候从数据库加载详细信息
    this.isEdit(false)
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
    this.isEdit(false)
    //每次更新的时候查询SchoolId，将SchoolId更新到数据库
    this.getRestaurantInfor()
    //把School从数据库拉下来，放在数组中。同时将School等于全局SchoolName,
    
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