// pages/fullyUserInfo/fullyUserInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schools:['中山大学', '清华大学', '北京大学'],//由于数据库中存储的是index，所以这个列表不可以插入，只能追加
    scoPicIndex:0,

    genders:['请选择', '男', '女'],
    gendPicIndex:0,

    headImagePath:"",
    userName:"",

    edit:false, //是否处于编辑信息的状态
    userNm_dis:true,//默认所有信息不可修改，直到按过“修改按钮"
    school_dis:true,
    phnum_dis:true,
    gend_dis:true,
    
  },

  bindOkClick(e){
    if(this.data.edit==false)
      return;
    console.log('ok发送点击，携带值为', e.detail.value)
    //把修改后的头像图片存储到“云开发存储”
    //把云开发存储中的图片路径存储到数据库中相应的表
    //存储其它信息
    this.setData({
      userNm_dis: true,
      school_dis: true,
      phnum_dis: true,
      gend_dis: true,
      edit: false,
    })
  },

  bindEdit(e){
    console.log('edit发送点击，携带值为', e.detail.value)
    
    this.setData({
      userNm_dis: false,
      school_dis: false,
      phnum_dis: false,
      gend_dis: false,
      edit: true,
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
        that.setData( {
          headImagePath : res.tempFilePaths
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userName:options.userNameIn,
      headImagePath:options.headImagePathIn
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

  }
})