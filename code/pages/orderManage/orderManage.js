//获取应用实例
var app = getApp()
Page({
  data: {
    navBar: ['全部', '待付款', '已完成', '已取消'],
    currTab: 0,
    hasData: true,
    orderStatus: ['待付款', '已完成', '已取消'],
    totalOrder: {
      hasData: true,
      array: [
        {
          timeStamp: 1558775684,
          logo: 'http://p1.meituan.net/deal/455f72aee0980f5f8427ff9088afb349150930.jpg',
          name: '麦当劳',
          status: 0,
          food: [
            {
              name: '麦辣鸡翅',
              price: 11.5,
              num: 2
            },
            {
              name: '原味板烧鸡腿堡',
              price: 20,
              num: 1
            },
            {
              name: '经典麦辣鸡腿汉堡',
              price: 20,
              num: 2
            },
          ],
          num: 5,
          price: 83
        },
        {
          timeStamp: 1558775694,
          logo: 'https://upload.wikimedia.org/wikipedia/zh/thumb/1/18/KFC.svg/1200px-KFC.svg.png',
          name: '肯德基',
          status: 1,
          food: [
            {
              name: '热辣香骨头鸡T',
              price: 11.5,
              num: 4
            },
            {
              name: '新奥尔良烤鸡腿堡ST',
              price: 19.5,
              num: 1
            },
          ],
          num: 5,
          price: 65.5
        },
        {
          timeStamp: 1558775684,
          logo: 'http://p1.meituan.net/deal/455f72aee0980f5f8427ff9088afb349150930.jpg',
          name: '麦当劳',
          status: 2,
          food: [
            {
              name: '麦辣鸡翅',
              price: 11.5,
              num: 2
            },
            {
              name: '原味板烧鸡腿堡',
              price: 20,
              num: 1
            },
          ],
          num: 3,
          price: 43
        },
        {
          timeStamp: 1558775684,
          logo: 'http://p1.meituan.net/deal/455f72aee0980f5f8427ff9088afb349150930.jpg',
          name: '麦当劳',
          status: 1,
          food: [
            {
              name: '麦辣鸡翅',
              price: 11.5,
              num: 2
            },
            {
              name: '原味板烧鸡腿堡',
              price: 20,
              num: 1
            },
          ],
          num: 3,
          price: 43
        },
        {
          timeStamp: 1558775684,
          logo: 'http://p1.meituan.net/deal/455f72aee0980f5f8427ff9088afb349150930.jpg',
          name: '麦当劳',
          status: 2,
          food: [
            {
              name: '麦辣鸡翅',
              price: 11.5,
              num: 2
            },
            {
              name: '原味板烧鸡腿堡',
              price: 20,
              num: 1
            },
          ],
          num: 3,
          price: 43
        }
      ]
    },

    waitOrder: {
      hasData: true,
      array: [
        {
          timeStamp: 1558775684,
          logo: 'http://p1.meituan.net/deal/455f72aee0980f5f8427ff9088afb349150930.jpg',
          name: '麦当劳',
          status: 0,
          food: [
            {
              name: '麦辣鸡翅',
              price: 11.5,
              num: 2
            },
            {
              name: '原味板烧鸡腿堡',
              price: 20,
              num: 1
            },
            {
              name: '经典麦辣鸡腿汉堡',
              price: 20,
              num: 2
            },
          ],
          num: 5,
          price: 83
        }
      ]
    },

    finishOrder: {
      hasData: true,
      array: [
        {
          timeStamp: 1558775694,
          logo: 'https://upload.wikimedia.org/wikipedia/zh/thumb/1/18/KFC.svg/1200px-KFC.svg.png',
          name: '肯德基',
          status: 1,
          food: [
            {
              name: '热辣香骨头鸡T',
              price: 11.5,
              num: 4
            },
            {
              name: '新奥尔良烤鸡腿堡ST',
              price: 19.5,
              num: 1
            },
          ],
          num: 5,
          price: 65.5
        },
        {
          timeStamp: 1558775684,
          logo: 'http://p1.meituan.net/deal/455f72aee0980f5f8427ff9088afb349150930.jpg',
          name: '麦当劳',
          status: 1,
          food: [
            {
              name: '麦辣鸡翅',
              price: 11.5,
              num: 2
            },
            {
              name: '原味板烧鸡腿堡',
              price: 20,
              num: 1
            },
          ],
          num: 3,
          price: 43
        }
      ]
    },

    cancelOrder: {
      hasData: true,
      array: [
        {
          timeStamp: 1558775684,
          logo: 'http://p1.meituan.net/deal/455f72aee0980f5f8427ff9088afb349150930.jpg',
          name: '麦当劳',
          status: 2,
          food: [
            {
              name: '麦辣鸡翅',
              price: 11.5,
              num: 2
            },
            {
              name: '原味板烧鸡腿堡',
              price: 20,
              num: 1
            },
          ],
          num: 3,
          price: 43
        },
        {
          timeStamp: 1558775684,
          logo: 'http://p1.meituan.net/deal/455f72aee0980f5f8427ff9088afb349150930.jpg',
          name: '麦当劳',
          status: 2,
          food: [
            {
              name: '麦辣鸡翅',
              price: 11.5,
              num: 2
            },
            {
              name: '原味板烧鸡腿堡',
              price: 20,
              num: 1
            },
          ],
          num: 3,
          price: 43
        }
      ]
    }

  },

  navBarTap: function (e) {
    this.setData({
      currTab: e.currentTarget.dataset.idx
    })
  },

  onPullDownRefresh: function () {
    //this.myRecordingA(1, answerUrl);
    wx.stopPullDownRefresh();
  },

  goDeatailEvent: function () {
    wx.navigateTo({ url: '../orderManage/orderDeatail/orderDeatail' });
  },

})
