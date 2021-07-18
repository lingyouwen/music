// pages/comment/comment.js
const moment = require('moment')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //歌曲id
        musicID:'',
        //储存评论
        lrcListMusic:[],
        time_id:''

    },

     //获取评论
     lrcShowList(){
        //获取id
        let musicID=this.data.musicID
        // console.log(musicID)
        //评论url 
        let url='https://autumnfish.cn/comment/music?id='+musicID+'&limit'
        wx.request({
          url,
          success:(res)=>{
            console.log(res)
              // console.log(res.data.comments)
              // console.log(res.data.comments[0].time)
              let data=res.data.comments
              for(let i=0;i<data.length;i++){
                // let time=data[i].time
                 //日期格式
               let dataTime=moment(data[i].time).format("YYYY年MM月DD日 HH:mm:ss")
               // console.log(dataTime)
                this.setData({
                  time_id:dataTime
                })
            }
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