// pages/fullyUserInfo/fullyUserInfo.js
const app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    schools:['请选择','中山大学', '清华大学', '北京大学'],//由于数据库中存储的是index，所以这个列表不可以插入，只能追加
    scoPicIndex:0,

    genders:['请选择', '男', '女'],
    gendPicIndex:0,

    headImagePath:"",
    tempHeadImageUrl:"",
    userName:"",

    phoneNum:"",
    studentId:"",
    
    dbUserInfoId:"",
  
    animationData: {},
  },
  //如果edit=true，那么页面上的信息可以修改，否则不可以修改
  isEdit: function (edit) {

    if(edit==true)
    {
      this.setData({
        userNm_dis: false,
        school_dis: false,
        phnum_dis: false,
        gend_dis: false,
        studentId_dis:false,
        edit: true
      })
      
    }else{
      this.setData({
      edit:false,
      userNm_dis:true,
      school_dis: true,
      studentId_dis: true,
      phnum_dis: true,
      gend_dis: true
      })
    }
  },

//填写完成，提交修改
  bindOkClick(e){
    var that = this
    if(this.data.edit==false)
      return;
    console.log('ok发送点击，携带值为', e.detail.value)
    
    wx.showLoading({
      title: '正在提交',
    })
    const db = wx.cloud.database()
    
    //更新其它信息
    db.collection('User').doc(that.data.dbUserInfoId).update({
      data: {
        UserName: that.data.userName,
        School:that.data.scoPicIndex,
        UserTelephone:that.data.phoneNum,
        Gender:that.data.gendPicIndex,
        StudentId:that.data.studentId
      },
      success: res => {
        console.log("其它数据更新成功")

       // console.log("临时路径", that.data.tempHeadImageUrl)

        if (this.data.tempHeadImageUrl != "")//如果是新图片
        {
          const filePath = this.data.tempHeadImageUrl
          // 上传图片
          var timestamp = Date.parse(new Date());
          const cloudPath = 'UserProfileImage/' + app.globalData.userInfor.openid +timestamp+ filePath.match(/\.[^.]+?$/)[0]
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
              db.collection('User').doc(that.data.dbUserInfoId).update({
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

 

  bindEdit(e){
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

  bindGenderPicker(e){
    this.setData({
      gendPicIndex:e.detail.value
    })
  },

  changeHeadImage(e){
    if(this.data.edit==false)
      return;
    var that=this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        that.data.tempHeadImageUrl = res.tempFilePaths[0]
        that.setData( {
          headImagePath : res.tempFilePaths[0]
        })
      }
    })
  },

  bindUserNameInput(e) {
    this.data.userName = e.detail.value
  },

  bindPhoneNumInput(e) {
    this.data.phoneNum = e.detail.value
  },

  bindStudentIdInput(e){
    this.data.studentId = e.detail.value
  },
  
  updateUserInfo: function (e) {
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
        that.data.dbUserInfoId = res.data[0]._id

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
    
    this.updateUserInfo();
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
    this.updateUserInfo();
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
    this.updateUserInfo();
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