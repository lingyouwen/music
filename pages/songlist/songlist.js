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
                "src":"https://bkimg.cdn.bcebos.com/pic/9f2f070828381f30d0ec6f7fa3014c086f06f06b?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg",
                "musicName":"安河桥",
                "name":"宋冬野",
                "id":"1"
            },
            {
                "src":"https://imgessl.kugou.com/stdmusic/20200620/20200620111646799439.jpg",
                "musicName":"南方姑娘",
                "name":"赵雷",
                "id":"2"
            },
        ],
        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        circular: true,
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