// pages/songlist/songlist.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        background: ['http://p1.music.126.net/bIiSEZZ5LzUpBH7855pWlQ==/109951166121360496.jpg?imageView&quality=89', 
        'http://p1.music.126.net/Es7b5qCSAHauaOQ40QSuSQ==/109951166121754768.jpg?imageView&quality=89',
        'http://p1.music.126.net/MQ3q6pcYkx6jrF3GOMgI-g==/109951166121753124.jpg?imageView&quality=89', 
        'http://p1.music.126.net/JOaT-B9TcLnDVkWtEvqVnQ==/109951166121627798.jpg?imageView&quality=89'],
        //歌曲遍历
        musicList:[],
       //输入框的值
       word:"",

        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        circular: true,
    },
    //点击跳转播放页面
    jumpPlay(event){
        console.log(event.currentTarget.dataset.id)
        //id传到另一个页面
        let mid=event.currentTarget.dataset.id
        wx.navigateTo({
          url: '/pages/play/play?id='+mid,
        })
    },
    //监听input输入框值
    keychange(result){
        // console.log(result)
        //进行数据修改
        let w=result.detail.value
        //data数据修改
        this.setData({
            word:w
        })
    },
    //触发搜索按钮执行方法
   
    search(){
        console.log(this.data.word)
        // 搜索思路 //拿到用户值 // 改变接口中关键字 // 网络请求// 获取json // 解析拿到data数据// 渲染数据
        let data=this.data.word
        let url="https://music.163.com/api/search/get?s="+data+"&type=1&limit=6";
        // let that=this
        wx.request({
          url,
          success:(result)=>{
              console.log(result.data.result.songs)
              let songs=result.data.result.songs
              this.setData({
                musicList:songs
              })
          }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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