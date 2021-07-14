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
       //封面的url列表
       ImgUrl_list:[],
       Idlist:[],

        indicatorDots: true,
        autoplay: true,
        interval: 2000,
        duration: 500,
        circular: true,
    },
    //点击跳转播放页面
    jumpPlay(event){
        // console.log(event.currentTarget.dataset.id)
        console.log(this.data.Idlist)
        let idlist=this.data.Idlist
        //id传到另一个页面
        let mid=event.currentTarget.dataset.id
        wx.navigateTo({
          url: '/pages/play/play?id='+mid+'&idlist='+idlist,
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
        //定义储存id列表
        let Idlist=[]
        wx.request({
          url,
          success:(result)=>{
            //   console.log(result.data.result.songs)
              let songs=result.data.result.songs
              //音乐存储
              this.setData({
                musicList:songs
              })
              //获取列表当中的id存储
              for(let i=0;i<songs.length;i++){
                //   console.log(songs[i].id)
                  Idlist.push(songs[i].id)
                  this.setData({
                      Idlist:Idlist
                  })
              }
              //进行数组清空，防止下次搜索还是显示之前的数据
              this.setData({
                ImgUrl_list:[]
              })
              //调用找封面
              this.getMusicImge(Idlist,0,Idlist.length)
          }
        })
    },
    //通过id获取封面的方法  (id数组 递归下表 结束下标)
    getMusicImge(Idlist,i,length){
        let ImgUrl_list=this.data.ImgUrl_list
        let url="https://music.163.com/api/song/detail/?id=1359595520&ids=["+Idlist[i]+"]"
        wx.request({
          url,
          success:(res)=>{
            //   console.log(res.data.songs[0].album.blurPicUrl)
            //封面
            let img=res.data.songs[0].album.blurPicUrl
            ImgUrl_list.push(img)
            this.setData({
                ImgUrl_list
            })
              //跳出递归条件
              if(++i<length){
                  this.getMusicImge(Idlist,i,length)
              }
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
        
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})