var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: false,
    description: "",
    school: {
      name: "店铺属于哪个学校",
      code: ""
    },
    imageUrl: [

    ],
    owner: "",
    btncolor: "#AEAEAE",
    canSub: false,
    navto: false,
  },

  selectSch: function () {
    var that = this
    wx.showActionSheet({
      itemList: ['中山大学', '清华大学', '北京大学'],
      success: function (res) {
        var sch = ""
        switch (res.tapIndex) {
          case 0: that.data.school.name = "中山大学"; that.data.school.code = "quanbuxiaoqu"; break;
          case 1: that.data.school.name = "清华大学"; that.data.school.code = "youyixiaoqu"; break;
          case 2: that.data.school.name = "北京大学"; that.data.school.code = "changanxiaoqu"; break;
          default: that.data.school.name = "全部校区"; that.data.school.code = "quanbuxiaoqu"; break;
        }
        that.setData({
          school: that.data.school
        })
      }
    })
  },

  inputPrice: function (e) {
    var v = e.detail.value
    if (v >= 99999.9) {
      wx.showToast({
        title: '价格超限啦~,上限99999.9哦~',
        icon: "none",
        duration: 3000
      })
      this.setData({
        price: null
      })
    }
  },

  formSubmit(e) {
    var that = this
    if (this.data.canSub) {
      var data = e.detail.value
      if (this.data.description == "") {
        console.log('未填写介绍')
        wx.showToast({
          title: '未填写介绍',
          icon: "none"
        })
      } else if (this.imgupload1.data.image.length == 0 || this.imgupload2.data.image.length == 0 || this.imgupload3.data.image.length == 0 || this.imgupload4.data.image.length == 0 || this.imgupload5.data.image.length == 0) {
        wx.showToast({
          title: '未添加图片',
          icon: "none"
        })
      } else if (this.data.school.name == "店铺属于哪个学校") {
        wx.showToast({
          title: '未填写所属学校',
          icon: "none"
        })
      } else if (this.data.owner == "") {
        wx.showToast({
          title: '未填写联系人姓名',
          icon: "none"
        })
      } else if (this.data.shopname == "") {
        wx.showToast({
          title: '未填写店铺名',
          icon: "none"
        })
      } else if (this.data.phoneNum == "" || his.data.phone.length != 11) {
        wx.showToast({
          title: '未填写联系电话',
          icon: "none"
        })
      } else {
        wx.getStorage({
          key: 'cookie',
          success: function (res) {
            var Mstring = res.data
            var goods_id = that.data.goods_id
            var image = that.imgupload.data.image
            var rs = 0
            wx.showLoading({
              title: '图片上传中',
              success: function () {
                var imgupload = new Array()
                for (var i = 0; i < image.length; i++) {
                  wx.uploadFile({
                    url: 'https://pg.npupaogua.cn/paogua/home/release/editImages',
                    filePath: image[i],
                    name: 'image',
                    header: {
                      "content-type": "multipart/form-data",
                      "Cookie": app.globalData.cookie
                    },
                    formData: {
                      Mstring: Mstring,
                      goods_id: goods_id,
                      order: i
                    },
                    success: function (res) {
                      console.log(res)
                      var jsonStr = res.data
                      //去掉字符串中的空格
                      jsonStr = jsonStr.replace(" ", "");
                      //typeof https://www.cnblogs.com/liu-fei-fei/p/7715870.html
                      if (typeof jsonStr != 'object') {
                        //去掉饭斜杠
                        jsonStr = jsonStr.replace(/\ufeff/g, "")
                        var jsonObj = JSON.parse(jsonStr)
                        res.data = jsonObj
                      }

                      console.log(res)
                      if (res.data.code == 1) {
                        rs++
                        imgupload[rs - 1] = res.data.filePath
                      } else if (res.data.code == -1) {
                        wx.hideLoading()
                        wx.showToast({
                          title: '图片上传失败',
                          icon: 'none'
                        })
                      }
                      if (rs == image.length) {
                        wx.request({
                          url: 'https://pg.npupaogua.cn/paogua/Home/Release/saveEdit',
                          method: "POST",
                          header: {
                            "content-type": "application/x-www-form-urlencoded",
                            "Cookie": app.globalData.cookie
                          },
                          data: {
                            Mstring: Mstring,
                            goods_id: goods_id,
                            title: e.detail.value.title,
                            description: e.detail.value.description,
                            price: e.detail.value.price,
                            category: that.data.category.code,
                            school: that.data.school.code,
                            phoneNum: e.detail.value.phoneNum,
                            wxId: e.detail.value.wxid,
                            qqNum: e.detail.value.qqNum,
                            imageUrl: JSON.stringify(image)
                          },
                          success: function (res) {
                            console.log(res)
                            if (res.data == '400') {
                              wx.hideLoading()
                              wx.showToast({
                                title: '发布失败',
                                icon: 'none'
                              })
                            } else if (res.data.code == '502') {

                            } else if (res.data.code == '401') {

                            } else if (res.data == '200') {
                              wx.hideLoading()
                              wx.navigateBack({
                                url: '../myrelease/myrelease',
                              })
                            }
                          },
                          fail: function () {
                            wx.showToast({
                              title: '请重试',
                              icon: 'none'
                            })
                          }
                        })
                      }
                    },
                    fail: function () {
                      wx.showToast({
                        title: '请重试',
                        icon: 'none'
                      })
                    }

                  })
                }
              }
            })


          },
        })

      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取imgupload组件
    this.imgupload = this.selectComponent("#imgupload");
    var that = this
    if (options.goods_id != "") {
      that.data.goods_id = options.goods_id
      wx.getStorage({
        key: 'cookie',
        success: function (res) {
          if (res.data) {
            wx.request({
              url: 'https://pg.npupaogua.cn/paogua/Home/Self/editMyRelease',
              method: "POST",
              header: {
                "content-type": "application/x-www-form-urlencoded",
                "cookie": app.globalData.cookie,
              },
              data: {
                Mstring: res.data,
                goods_id: options.goods_id,
              },
              success: function (res) {

                if (res.data) {
                  console.log(res.data)
                  that.data.limit[0].current = res.data.title.length
                  that.data.limit[1].current = res.data.description.length
                  var a = res.data.category.split("-")
                  that.imgupload.setData({
                    image: res.data.imageUrl
                  })
                  that.setData({
                    title: res.data.title,
                    description: res.data.description,
                    imageUrl: res.data.imageUrl,
                    price: res.data.price,
                    category: {
                      name: util.parseCate(a[0], a[1], 1),
                      code: res.data.category
                    },
                    school: {
                      name: util.parseSch(res.data.school),
                      code: res.data.school
                    },
                    phoneNum: res.data.phoneNum,
                    qqNum: res.data.qqNum,
                    wxId: res.data.wxId,
                    limit: that.data.limit,
                    btncolor: "#F36778",
                    canSub: true
                  })
                }
              }
            })
          }
        },
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
    var isNpu = app.globalData.isNPU
    console.log(isNpu)
    if (isNpu == '201') {
      wx.showModal({
        title: '温馨提示',
        content: '绑定翱翔账号后才可以编辑已发布哦~点击“去绑定”即可跳转翱翔账号绑定页面',
        showCancel: true,
        confirmText: "去绑定",
        confirmColor: '#01C000',
        success: function (res) {
          if (res.confirm) {
            wx.navigateTo({
              url: '../confirm/confirm',
            })
          } else {
            wx.navigateBack({
              delta: 1
            })
          }
        }
      })
    } else if (isNpu == '502') {
      wx.showToast({
        title: '微信登陆过期',
        icon: "icon",
        success: function () {
          wx.switchTab({
            url: '../../home/home',
          })
        }
      })
    } else if (isNpu == '401') {
      wx.showToast({
        title: '请求失败',
        icon: 'none',
        success: function () {
          wx.switchTab({
            url: '../../home/home',
          })
        }
      })
    } else if (isNpu == '300' || app.globalData.login == '401') {
      wx.showToast({
        title: '网络开小差了',
        icon: 'loading',
        mask: true,
        success: function () {
          wx.switchTab({
            url: '../../home/home',
          })
        }
      })

    }


    var that = this
    var navto = this.data.navto
    if (navto) {
      //navto回归
      that.setData({
        navto: false
      })
      wx.getStorage({
        key: 'category',
        success: function (res) {
          var a = res.data.split(" ")
          that.data.category.name = a[0]
          that.data.category.code = a[1]
          that.setData({
            category: that.data.category
          })
          wx.removeStorage({
            key: 'category'
          })
        },
      })
    }
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