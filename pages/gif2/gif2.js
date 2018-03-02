
//获取应用实例
const app = getApp()

Page({
  data: {
    array:[],
    param: {
      showapi_appid: 57984,
      showapi_sign:"5c66fd40a0fc4103bc68be21af59e7b5",
      page: 1,
      maxResult: 20
    },
    isdone:false
  },
  onPullDownRefresh: function () {
    
    
    
    this.loaddata();
   
  },
  onReachBottom(){
      if(this.data.isdone)
      {
        wx.showToast({
          title: '没有更多了...',
        })
        return

      }
    wx.showLoading({
      title: '正在拼命加载...',
    })
    this.loadmore();
    
  },
  loaddata:function(success,fail){
   
    this.setData({
      "param.page": 1,
      isdone: false
    })
    var vm=this
    wx.request({
      url: 'https://route.showapi.com/341-3', //仅为示例，并非真实的接口地址
      data: this.data.param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.showapi_res_code == "0")
            
            vm.setData({
              array: res.data.showapi_res_body.contentlist
            })
    
        wx.stopPullDownRefresh();
      },
      fail:function(res){
        wx.stopPullDownRefresh();
        
      }
    })
  
  },
  loadmore(){
    this.setData({
      "param.page": this.data.param.page+1,

    })
    var vm = this
    console.log(this.data.param)
    wx.request({
      url: 'https://route.showapi.com/341-3', //仅为示例，并非真实的接口地址
      data: this.data.param,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
        if (res.data.showapi_res_code == "0")
        {
          if (vm.data.param.page == res.data.showapi_res_body.allPages)
          {
            vm.setData({
              isdone: true
            })
          
          }
          if (res.data.showapi_res_body.contentlist.length)
          vm.setData({
            array: [...vm.data.array,...res.data.showapi_res_body.contentlist]
          })
          else
          {
            this.setData({
              "param.page:": this.data.param.page - 1,

            })
          }
        }
        else
        {
          this.setData({
            "param.page:": this.data.param.page-1,

          })
        }
        wx.hideLoading()
        wx.stopPullDownRefresh();
      },
      fail: function (res) {
        wx.stopPullDownRefresh();
        wx.hideLoading()
        this.setData({
          "param.page:": this.data.param.page - 1,

        })
      }
    })
  },
  load:function(){
    var vm = this;
   
  },
  onLoad: function () {
    var vm=this;
    wx.startPullDownRefresh({

    })
  }
})

