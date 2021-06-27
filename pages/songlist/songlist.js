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
        musicList:[
            //图片  歌名 人名 歌曲id
            {
                "src":"https://p2.music.126.net/KTo5oSxH3CPA5PBTeFKDyA==/109951164581432409.jpg",
                "musicName":"句号",
                "name":"G.E.M.邓紫棋",
                "id":"1405283464"
            },
            {
                "src":"https://p1.music.126.net/wldFtES1Cjnbqr5bjlqQbg==/18876415625841069.jpg",
                "musicName":"南方姑娘",
                "name":"赵雷",
                "id":"202373"
            },
            {
                "src":"https://p1.music.126.net/34YW1QtKxJ_3YnX9ZzKhzw==/2946691234868155.jpg",
                "musicName":"成都",
                "name":"赵雷",
                "id":"436514312"
            },
            {
                "src":"https://p2.music.126.net/Nze7lE61wH1bhTSXpVBvGQ==/109951163445284035.jpg",
                "musicName":"安和桥（Cover 宋东野）",
                "name":"宇西",
                "id":"416892296"
            },
            {
                "src":"https://p2.music.126.net/8rZiGb8K0zL75NnoVunnGg==/109951163733426036.jpg",
                "musicName":"莫妮卡",
                "name":"柳爽",
                "id":"486999661"
            },
        ],
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