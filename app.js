// app.js
App({
    onLaunch(){
        wx.cloud.init({
            env:'seek-7g5ykxxf807c4d48',
        })
        wx.cloud.callFunction({
            name:'getDataList',
          }).then(res=>{
            // console.log(res)
            const openid = res.result.openid;
            this.globalData.openid = openid;
          }).catch(err =>{
            console.log(err)
          });
        
    },
    globalData:{
        openid: null,
        nickName:false,
    },
    
})
