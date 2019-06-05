var app = getApp()

Page({
  data: {
    temp: [{

    }],
    _id: "",
    idNum: 0,
    // 商品列表
    items: [{
      id: 0,
      ItemDescription: "",
      MenuItemName: "",
      Price: 0,
    }]
  },


  onLoad: function () {
    const db = wx.cloud.database()
    var menu = []
    var that = this;

    db.collection('MenuItem').where({
      id: app.globalData.id
    }).get({
      success: function (res) {
        that.setData({ _id: res.data[0]._id });
      }
    })

    db.collection('MenuItem').get({
      success: function (res) {
        console.log(res.data.length)
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        for (var i = 0; i < res.data.length; i++) {
          menu.push(res.data[i])
        }
        that.setData({ items: menu });  //为什么必须把this换成that，直接调用this就不行?
        console.log(that.data.items)
      }
    })

    /*
    db.collection('MenuItem').add({
      data: {
        ItemDescription: "好吃",
        MenuItemName: "宫保鸡丁",
        Price: 15
      },
      success: function(res) {
        console.log(res)
      }
    })*/

    /*var addFood = JSON.parse(options.addFood)
    var model = {
      id: 0,
      title: '',
      price: 0,
      active: false,
      describe: '',
      imageUrl: ''
    }
    var num = this.data.items.length
    model.id = num+1
    model.title = addFood.title
    model.price = addFood.price
    model.active = addFood.active
    model.describe = addFood.describe
    model.imageUrl = addFood.imageUrl
    var items = this.data.items
    items.push(model)
    this.setData({
      items: items 
    })
    console.log(this.data.items.length)
    console.log(this.data.items)*/
  },

  onReady: function () {
  },


  deleteFood: function (e) {
    var index = e.currentTarget.dataset.index  //类型问题，为什么wxml那里改成data-index就好了
    var items = this.data.items

    app.globalData.id = index + 1

    console.log(app.globalData.id)
    var that = this;

    const db = wx.cloud.database()

    db.collection('MenuItem').where({
      id: app.globalData.id
    }).get({
      success: function (res) {
        db.collection('MenuItem').doc(res.data[0]._id).remove({
          success: function (res) {
            console.log(res.data)
          }
        })
      }
    })

    items.splice(index, 1)
    this.setData({
      items: items,
    })
    console.log(this.data.items)
    wx.showToast({
      title: '正在删除中',
      icon: 'success',
      duration: 5000,
    })

  },


  addFood: function (e) {
    wx.navigateTo({
      url: "../addFood/addFood"
    })
  }
})