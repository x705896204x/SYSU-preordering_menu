Page({  
    data: {  
      tempFilePaths: "",
      hasImage: 0,
      name: "",
      describe: "",
      price: 0,
      food: {
        title: "",
        price: 12,
        active: false,
        describe: "",
        imageUrl: ""
      }
    },  
    onLoad: function () {

    },  

    chooseImage: function () {
      var _this = this;  
      wx.chooseImage({  
        count: 1, // 默认9  
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: function (res) {  
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
          _this.setData({
            tempFilePaths:res.tempFilePaths[0],
            hasImage: 1 
          })  
        }
      })  
    },

    inputDescribe: function(e) {
        this.setData({
            describe: e.detail.value
        })
    },

    inputFood: function(e) {
        this.setData({
            name: e.detail.value
        })
    },

    inputPrice: function(e) {
        this.setData({
            price: e.detail.value
        })
    },

    addImageSuccess: function() {
        var model = {
            title: "",
            price: 0,
            active: false,
            describe: "",
            imageUrl: ""
        }
        model.title = this.data.name
        model.price = this.data.price
        model.describe = this.data.describe
        model.imageUrl = this.data.tempFilePaths

        this.setData({
            food: model,
        })
        var addFood = JSON.stringify(this.data.food)
        console.log(addFood)

        wx.navigateTo({
            url: "../merchant/merchant?addFood=" + addFood
        })
    },


  })