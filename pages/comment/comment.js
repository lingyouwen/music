// pages/comment/comment.js
// const moment = require('moment')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //歌曲id
        musicID:'',
        //储存评论
        lrcListMusic:[],
        //评论数量
        sum:20

    },

    hotComments(){
      let music_id=this.data.musicID
        //id传到另一个页面
        // let mid=event.currentTarget.id
        wx.redirectTo({
            url: '/pages/hotComment/hotComment?id='+music_id
          })
    },

     //获取评论
     lrcShowList(){
        //获取id
        let musicID=this.data.musicID
        let sum=this.data.sum
        // console.log(musicID)
        //评论url 
        let url='https://autumnfish.cn/comment/music?id='+musicID+'&limit='+sum
        wx.request({
          url,
          success:(res)=>{
              // console.log(res.data.hotComments)
              let list=res.data
              this.setData({
                lrcListMusic:list,
              })
          }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
         // 通过options获取id
        let mid=options.id
        console.log(mid)
         this.setData({
            musicID:mid
         })

        this.lrcShowList()
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
      {
        wx.showNavigationBarLoading() //在标题栏中显示加载
                        
        //模拟加载
        setTimeout(()=>
        {
        // complete
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
        },1500)      
    }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      //增加loading效果
      wx.showLoading({
        title: '加载中...',
      })
       //加载更多评论
       let music_comments=this.data.sum
       music_comments+=10
       this.setData({
         sum:music_comments
       })
      this.lrcShowList(music_comments)
      //结束loading动画
      wx.hideLoading()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})