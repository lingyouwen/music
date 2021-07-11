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
        imgUrl:'',
        //存储歌词
        lrcList:[],
        //当前播放歌词的下标
        idnex:-1,
        //滚动条位置
        top:0
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
        let that=this
        console.log(mid)
        //src拼接
        let src='http://music.163.com/api/song/lyric?os=pc&id='+mid+'&lv=-1&tv=-1'
        wx.request({
          url: src,
          success:(res)=>{
            //   console.log(res.data.lrc.lyric)
              let lrcStr=res.data.lrc.lyric
              //处理字符串  拿时间和歌词对应的数据
              //1 拆分字符串 一句一句
              let lrcstrList=lrcStr.split("\n")
              //存储最终数据列表
              let lrctimeList=[]
             //设置正则
             let re=/\[\d{2}:\d{2}\.\d{2,3}\]/
              for(let i=0;i<lrcstrList.length;i++){
                //进行拆分时间和歌词的拆分
                let data=lrcstrList[i].match(re)
                //判断时间数组不能为空
                if(data!=null){
                    //拿到歌词  替换字符串
                    let lrc=lrcstrList[i].replace(re,"")
                    //那时间字符串
                    let timestr=data[0]
                    //判断时间字符串是否为空
                    if(timestr!=null){
                        //处理时间
                    let timestr_slice=timestr.slice(1,-1)
                    //时间和秒数拆分
                    let splitlist=timestr_slice.split(":")
                    let f=splitlist[0]
                    let m=splitlist[1]
                    //计算秒数
                    let time=parseFloat(f)*60+parseFloat(m)
                    //列表追加数据
                    lrctimeList.push([time,lrc])
                    }
                }
            }
            // for(let i=0;i<lrctimeList.length;i++){
            //     console.log(lrctimeList[i])
            // }
            //存储数组到data中
            that.setData({
                lrcList:lrctimeList
              
            })
            
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
        // console.log(options.id)
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
            //   console.log(e.data.songs[0].name)
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
    //播放进度触发
    timechange(result){
        // console.log(result.detail.currentTime)
        //播放当前时间
        let playtime=result.detail.currentTime
        //歌词时间
        let lrcList=this.data.lrcList
        //遍历歌词二维数组
        for(let i=0;i<lrcList.length;i++){
            //每一句歌词区间判断
            if(lrcList[i][0]<playtime&&playtime<lrcList[i+1][0]){
                //拿到当前播放歌词下标
                this.setData({
                    index:i
                })
            }
            //定位自动东滚
            let index=this.data.index
            if(index>5){
                this.setData({
                    top:(index-5)*24
                })
            }
        }
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