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

        playBar:"bar",
        //歌曲名称
        name:'',
        //歌曲图片
        imgUrl:'',
        //存储歌词
        lrcList:[],
        //当前播放歌词的下标
        idnex:-1,
        //滚动条位置
        top:0,
        //播放模式
        mode:"loop1",
        //id列表
        idlist:[],
        //当前播放时间
        playtime:"00:00",
        //总时长
        timelength:"00:00",
        //进度条最大值
        max:0,
        //当前播放位置
        move:0
    },
    //点击跳转评论页面 传参id
    comment(){
        console.log(this.data.musicId)
        let music_id=this.data.musicId
        //id传到另一个页面
        // let mid=event.currentTarget.id
        wx.navigateTo({
            url: '/pages/hotComment/hotComment?id='+music_id
          })
    },
    //切换模式 图标更改
    changemode(){
    if(this.data.mode=="loop1"){
        this.setData({
            mode:'loop'
        })
    }else{
        this.setData({
            mode:'loop1'
        })
    }

    },
    //当歌曲播放完毕执行
    changeMusic(){
        // console.log("播放完毕")
        //判段当前模式来进行切换
        let mode=this.data.mode
        //loop1单曲 loop循环
        if(mode=="loop"){
            this.setData({
                musicId:this.data.musicId
            })
            //刷新播放状态
            this.setData({
                action:{
                    method:"play"
                }             
            })
        }else{
            //调用下一曲方法
            this.nextSong()
        }
    },
    //上一首方法
    listSong(){
 //去idlist列表当中进行检索
        let id=this.data.musicId
        let idlist=this.data.idlist
        //下标
        let index=-1
        //找当前歌曲下表
        for(let i=0;i<idlist.length;i++){
            //判断当前歌曲是否是最后一位，如果是的则循环到第0位，不是则往后更换
            if(id==idlist[i]){
                index=i;
                break
            }
        }
        if(index==0){
            this.setData({
                musicId:idlist[idlist.length-1]
            })
        }else{
            this.setData({
                musicId:idlist[index-1]
            })
        }
        //更新播放
        this.setData({
            action:{
                method:"play"
            },
            data:"play",
            playBar:"bar" 
        })
        //更新歌词和歌曲详情
        this.musicShow()
        this.lrcShow()
    },
    //循环下一首方法
    nextSong(){
        //去idlist列表当中进行检索
        let id=this.data.musicId
        let idlist=this.data.idlist
        //下标
        let index=-1
        //找当前歌曲下表
        for(let i=0;i<idlist.length;i++){
            //判断当前歌曲是否是最后一位，如果是的则循环到第0位，不是则往后更换
            if(id==idlist[i]){
                index=i;
                break
            }
        }
        if(index==idlist.length-1){
            this.setData({
                musicId:idlist[0]
            })
        }else{
            this.setData({
                musicId:idlist[index+1]
            })
        }
        //更新播放
        this.setData({
            action:{
                method:"play"
            },
            data:"play",
            playBar:"bar" 
        })
        //更新歌词和歌曲详情
        this.musicShow()
        this.lrcShow()
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
                data:"pause",
                playBar:"play_bar" 
            })
        }else{
            this.setData({
                action:{
                    "method":"play"
                },
                data:"play",
                playBar:"bar" 
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
    //进度条拖动
    sliderChange(e){
        console.log(e.detail.value)
        //当前拖动的值
        let v=e.detail.value
        //进行move修改
        // this.setData({
        //     move:v
        // })
        //修改当前时间
        this.setData({
            action:{
                method:'setCurrentTime',
                data:v
            }
        })
        //更新播放状态位play
        this.setData({
            action:{
                method:'play'
                
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 通过options获取id
        // console.log(options.idlist)
        let idliststr=options.idlist
        //拆分字符串为列表
        let idlist=idliststr.split(",")
        // console.log(idlist)
        let mid=options.id
        //更改data中数据
        this.setData({
            musicId:mid,
            idlist,
        })
        
        this.lrcShow()
        this.musicShow()

        wx.setStorage({
            key:"key",
            data:"value"
          })
    },
    //歌曲详情
    musicShow(){
        let mid=this.data.musicId
        //页面渲染
        //网络 请求
        wx.request({
            url: 'https://music.163.com/api/song/detail/?id=1359595520&ids=['+mid+']',
            success:(e)=>{
              //   console.log(e.data.songs[0].name)
                //获取歌曲名称
                let name=e.data.songs[0].name
                //歌曲图片
                // console.log(e.data.songs[0].album.blurPicUrl)
                let imgUrl=e.data.songs[0].album.blurPicUrl
                //设置数据
                this.setData({
                    name:name,
                    imgUrl:imgUrl
                })
            }
          })
    },
    //播放进度触发
    timechange(result){
        // console.log(result.detail.currentTime)
        //播放当前时间
        let playtime=result.detail.currentTime
        //歌词时间
        let lrcList=this.data.lrcList
        //遍历歌词二维数组
        for(let i=0;i<lrcList.length-1;i++){
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
        //进度条时间的数据更新

        //总时长
        let timelength=result.detail.duration
        let sum_m=Math.floor(timelength/60)
        let sum_s=Math.floor(timelength%60)
        //个位数补齐0的操作
        if(sum_m<10){
            sum_m="0"+sum_m
        }
        if(sum_s<10){
            sum_s="0"+sum_s
        }
        // close.log(sum_m+" "+sum_s)
        let play_m=Math.floor(playtime/60)
        let play_s=Math.floor(playtime%60)
        if(play_m<10){
            play_m="0"+play_m
        }
        if(play_s<10){
            play_s="0"+play_s
        }
        //进行数据更新
        this.setData({
            playtime:play_m+":"+play_s,
            timelength:sum_m+":"+sum_s,
            max:timelength,
            move:playtime
        })
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
    //     let pages = getCurrentPages().length - 1;
    //     console.log('songlist：'+pages);
    //     wx.navigateBack({
    //     delta: pages
    // })
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