// pages/find/find.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotlist:[1,2,3,4,5,6],
        newlist:[1,2,3,4,5,6],
        hotsum:6,
        newsum:6

    },
    //热门推荐数据获取
    getHotMusic(sum){
        let hotlist=this.data.hotlist
        wx.request({
          url: 'https://autumnfish.cn/personalized',
          success:(res)=>{
              console.log(res.data.result)
              let result=res.data.result
              if(sum>result.length){
                  wx.showLoading({
                    title: '数据已加载完毕',
                  })
                  setTimeout(()=>{
                  wx.hideLoading()
                },2000)
                  return
              }
              for(let i=0;i<sum;i++){
                  hotlist[i]=result[i]
              }
              this.setData({
                  hotlist,
              })
          }
        })
    },
    //新歌推荐
    getNewMusic(total){
        let newlist=this.data.newlist
        wx.request({
          url: 'https://autumnfish.cn/top/song',
          success:(res)=>{
            //   console.log(res.data.data)
              let result=res.data.data
              if(total>result.length){
                wx.showLoading({
                  title: '数据已加载完毕',
                })
                setTimeout(()=>{
                wx.hideLoading()
              },2000)
                return
            }
              for(let i=0;i<total;i++){
                newlist[i]=result[i]
              }
              this.setData({
                newlist,
              })
          }
        })
    },
    //热门歌曲加载更多方法
    changeHot(){
        let sum=this.data.hotsum
        sum+=3
        //覆盖数据
        this.setData({
            hotsum:sum
        })
        this.getHotMusic(sum)
    },
    //新歌推荐加载更多方法
    changeNew(){
        let total=this.data.newsum
        total+=3
        //覆盖数据
        this.setData({
            newsum:total
        })
        this.getNewMusic(total)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let sum=this.data.hotsum
        this.getHotMusic(sum)
        let total=this.data.newsum
        this.getNewMusic(total)
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