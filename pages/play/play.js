// pages/play/play.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        musicId:'',
        //播放状态
        action:{
            "method":"play"
        },
        date:"play",
        //歌曲名称
        name:'',
        //歌曲图片
        imgUrl:''
    },
    //播放状态，更改的方法
    playdata(){
        console.log(this.data.action.method);
        var date=this.data.action.method
        //判断
        if(date=='play'){
            this.setData({
                action:{
                    "method":"pause"
                },
                data:"pause"   
            })
        }else{
            this.setData({
                action:{
                    "method":"play"
                },
                data:"play"
            })
        }
    },
    //歌词显示和更新
    lrcShow(){
        //获取id
        let mid=this.data.musicId
        console.log(mid)
        //src拼接
        let src='http://music.163.com/api/song/lyric?os=pc&id='+mid+'&lv=-1&tv=-1'
        wx.request({
          url: src,
          success:(res)=>{
            //   console.log(res.data.lrc.lyric)
              let lrcStr=res.data.lrc.lyric
              //处理字符串
              //1 拆分字符串 一句一句
              //2 进行数据提出
              //3 进行时间和文本的拆分  再进行对应
          }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 通过options获取id
        console.log(options.id)
        let mid=options.id
        //更改data中数据
        this.setData({
            musicId:mid
        })
        //页面渲染
        //网络 请求
        wx.request({
          url: 'https://music.163.com/api/song/detail/?id=1359595520&ids=['+mid+']',
          success:(e)=>{
              console.log(e.data.songs[0].name)
              //获取歌曲名称
              let name=e.data.songs[0].name
              //歌曲图片
              console.log(e.data.songs[0].album.blurPicUrl)
              let imgUrl=e.data.songs[0].album.blurPicUrl
              //设置数据
              this.setData({
                  name:name,
                  imgUrl:imgUrl
              })
          }
        })
        this.lrcShow()
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