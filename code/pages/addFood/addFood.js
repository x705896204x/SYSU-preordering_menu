Page({  
    data: {  
      tempFilePaths: "",
      hasImage: 0,
      name: "",
      describe: "",
      countNum: 0,
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
        const db = wx.cloud.database()
        var that = this
        db.collection('MenuItem').get({
            success: function(res) {
                var num = res.data.length+1
                that.setData({countNum:num});  //为什么必须把this换成that，直接调用this就不行?
            }
        })
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
            MenuItemName: "",
            Price: 0,
            active: false,
            ItemDescription: "",
            ImageUrl: "",
            countNum: 0
        }
        model.MenuItemName = this.data.name
        model.Price = this.data.price
        model.ItemDescription = this.data.describe
        model.ImageUrl = this.data.tempFilePaths

        this.setData({
            food: model,
        })
        var addFood = JSON.stringify(this.data.food)

        //添加数据
        const db = wx.cloud.database()
        console.log(this.data.countNum)
        model.countNum = this.data.countNum
        db.collection('MenuItem').add({

            data: {
                ItemDescription: model.ItemDescription,
                MenuItemName: model.MenuItemName,
                Price: model.Price,
                id: model.countNum,
                RestaurantId: 1,
                Photo: model.ImageUrl,
                Class: "hh"
            },
            success: function(res) {
                console.log(res)
            },
            fail: console.error

        })

        console.log(addFood)

        wx.navigateTo({
            url: "../merchant/merchant?addFood=" + addFood
        })
    },


  })