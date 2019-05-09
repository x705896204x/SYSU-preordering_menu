//作者：吉阁尔
//index.js
//获取应用实例

const app = getApp()

Page({
  data: {
    tabIndex: 0,
    // 统计商品数量和价格
    orderCount: {
      num: 0,
      money: 0
    },
    bottomFlag: false,
    // 提交的订单
    orders: true,
    menus: [{
      id: 1,
      menu: '菜单一'
    }, {
      id: 1,
      menu: '菜单二'
    }, {
      id: 1,
      menu: '菜单三'
    }, {
      id: 1,
      menu: '菜单四'
    }, {
      id: 1,
      menu: '菜单五'
    }, {
      id: 1,
      menu: '菜单六'
    }, {
      id: 1,
      menu: '菜单七'
    }],
    // 商品列表
    items: [{
      id: 1,
      title: '土豆丝拌面',
      price: 12,
      active: false,
      num: 0
    }, {
      id: 2,
      title: '豆角炒肉盖浇饭',
      price: 13,
      active: false,
      num: 0
    }, {
      id: 3,
      title: '大盘鸡盖饭',
      price: 14,
      active: false,
      num: 0
    }, {
      id: 4,
      title: '新疆拌面',
      price: 15,
      active: false,
      num: 0
    }, {
      id: 5,
      title: '西拉蛋拌面',
      price: 16,
      active: false,
      num: 0
    }, {
      id: 6,
      title: '土豆牛肉盖浇饭',
      price: 17,
      active: false,
      num: 0
    }, {
      id: 7,
      title: '可乐',
      price: 18,
      active: false,
      num: 0
      
    },{
      id:8,
      title: '温馨提示',
      price: 0.1,
      active:false,
      num:0
    }]
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    setTimeout(()=>{
      wx.showToast({
        title: '成功加载数据',
        icon: 'success',
        duration: 500
      });
      wx.stopPullDownRefresh()
    }, 500);
  },
  tabMenu: function(event) {
    let that=this;
    let index = event.target.dataset.index;
    this.setData({
      tabIndex: index
    });
    
      
    
    
  },
  // 点击去购物车结账
  card: function() {
    let that = this;
    // 判断是否有选中商品
    if (that.data.orderCount.num !== 0) {
      // 跳转到购物车订单也
      wx.redirectTo({
        url: '../order/order'
      });
    } else {
      wx.showToast({
        title: '您未选中任何商品',
        icon: 'none',
        duration: 2000
      })
    }
  },
  /*addOrder: function(event) {
    let that = this;
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];
    let subOrders = []; // 购物单列表存储数据
    param.active ? param.active = false : param.active = true;
    // 改变添加按钮的状态
    this.data.items.splice(index, 1, param);
    that.setData({
      items: this.data.items
    });
    // 将已经确定的菜单添加到购物单列表
    this.data.items.forEach(item => {
      if (item.active) {
        subOrders.push(item);
      }
    });
    // 判断底部提交菜单显示隐藏
    if (subOrders.length == 0) {
      that.setData({
        bottomFlag: false
      });
    } else {
      that.setData({
        bottomFlag: true
      });
    }
    let money = 0;
    let num = subOrders.length;
    subOrders.forEach(item => {
      money += item.price; // 总价格求和
    });
    let orderCount = {
      num,
      money
    }
    // 设置显示对应的总数和全部价钱
    this.setData({
      orderCount
    });
    // 将选中的商品存储在本地
    wx.setStorage({
      key: "orders",
      data: subOrders
    });
  },*/
  onLoad: function() {
    

  },
  // 点击对应菜单添加按钮
  del: function (event) {
    let that = this;
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];
    let subOrders = []; // 购物单列表存储数据
    if (param.num > 0) {
      param.num--; // 每点一次减少1
    } else {
      param.num = 0; // 最低为0
    }
    // 改变添加按钮的状态
    this.data.items.splice(index, 1, param);
    that.setData({
      items: this.data.items
    });
    let money = 0;
    let num = 0;
    // 将已经确定总价格和数量求和
    this.data.items.forEach(item => {
      money += item.price * item.num;
      num += item.num;
    });
    let orderCount = {
      num,
      money
    }
    // 设置显示对应的总数和全部价钱
    this.setData({
      orderCount
    });
  },
  // 点击对应菜单添加按钮
  add: function (event) {
    let that = this;
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];
    let subOrders = []; // 购物单列表存储数据
    
    param.num++; // 每点一次增加1
    // 改变添加按钮的状态
    console.log(param);
    this.data.items.splice(index, 1, param);
    that.setData({
      items: this.data.items
    });
    let money = 0;
    let num = 0;
    // 将已经确定总价格和数量求和
    this.data.items.forEach(item => {
      money += item.price * item.num;
      num += item.num;
    });
    let orderCount = {
      num,
      money
    }
    // 设置显示对应的总数和全部价钱
    this.setData({
      orderCount
    });
  },
  getin:  function(event){
    wx.redirectTo({
      url: '',
    })
  }
})