Page({
  data: {
    // 商品列表
    items: [{
      id: 1,
      title: '土豆丝拌面',
      price: 12,
      active: false,
      describe: '好吃',
      imageUrl: ''
    }, {
      id: 2,
      title: '豆角炒肉盖浇饭',
      price: 13,
      active: false,
      describe: '好吃',
      imageUrl: ''
    }, {
      id: 3,
      title: '大盘鸡盖饭',
      price: 14,
      active: false,
      describe: '好吃',
      imageUrl: ''
    }, {
      id: 4,
      title: '新疆拌面',
      price: 15,
      active: false,
      describe: '好吃',
      imageUrl: ''
    }, {
      id: 5,
      title: '西拉蛋拌面',
      price: 16,
      active: false,
      describe: '好吃',
      imageUrl: ''
    }, {
      id: 6,
      title: '土豆牛肉盖浇饭',
      price: 17,
      active: false,
      describe: '好吃',
      imageUrl: ''
    }, {
      id: 7,
      title: '可乐',
      price: 18,
      active: false,
      describe: '好吃',
      imageUrl: ''
    }, {
      id: 8,
      title: '温馨提示',
      price: 0.1,
      active: false,
      describe: '好吃',
      imageUrl: ''
    }]
  },
  onLoad: function (options) {
    var addFood = JSON.parse(options.addFood)
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
    console.log(this.data.items)

  },

  deleteFood: function(e) {
    var index = e.currentTarget.dataset.index
    var items = this.data.items
    
    items.splice(index, 1)
    this.setData({
      items: items,
    })
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 2000,
    })
  },
  addFood: function(e) {
    wx.navigateTo({
      url: "../addFood/addFood"
    })
  }
})