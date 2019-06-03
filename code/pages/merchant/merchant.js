Page({
  data: {
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
    var that=this;
    db.collection('MenuItem').get({
      success: function(res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        for (var i=0;i<res.data.length;i++) {
          
          menu.push(res.data[i])
        }

        console.log("111")
        //console.log(res.data)
        that.setData({items:menu});  //为什么必须把this换成that，直接调用this就不行?
    
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

  deleteFood: function(e) {
    var index = e.currentTarget.dataset.index
    var items = this.data.items
    //根据云开发数据库系统自带的_id进行静态！！！！删除
    /*
    const db = wx.cloud.database()
    db.collection('MenuItem').doc('6cd397ca5cf39c150a6745e63ce1b267').remove({
      success: function(res) {
        console.log(res.data)
      }
    })*/
  
    //真正的动态删除，根据自定义的id字段删除，不过需要系统有nodejs环境的支持!!!!!
    const cloud = require('wx-server-sdk')
    cloud.init()
    const db = cloud.database()
    const _ = db.command

    exports.main = async (event, context) => {
  
      try {    
        return await db.collection('MenuItem').where(      
          {
            id: index+1
          }
        ).remove()
      }
      catch (e) {
        console.error(e)
      }
    }
    items.splice(index, 1)
    this.setData({
      items: items,
    })
    console.log(this.data.items)
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000,
    })
    var that = this
    that.onLoad()
  },

  addFood: function(e) {
    wx.navigateTo({
      url: "../addFood/addFood"
    })
  }
})