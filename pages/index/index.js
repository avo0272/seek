// index.js
Page({
    data:{
        msgList:[{
            id:1,text:'我是第一个公告'
        },
        {
            id:2,text:'我是第二个公告'
        },
        {
            id:3,text:'我是第三个公告'
        }]
    },
    reserve: function(e) {
        wx.navigateTo({
          url: '/pages/reserve/reserve',
        })
    },
    lookup:function (e) {
        wx.navigateTo({
          url: '/pages/lookup/lookup',
        })
    },
    
})

