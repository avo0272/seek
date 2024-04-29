// pages/userinfo/userinfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
    },
    getUserProfile: function(e){
        wx.getUserProfile({
          desc: '用于授权登录',
          success:(res)=>{
            wx.setStorageSync('userInfo', res.userInfo);
            console.log(res.userInfo);
            wx.showToast({
                title: '登录成功',
              })
              
              console.log("获取用户信息成功！", res);
              var pages = getCurrentPages()
              var CurrentPages = pages[pages.length - 1]
              CurrentPages.onShow()
              
          },
          fail: res => {
              wx.showToast({
                title: '登录失败',
              })
          }
        })
    },
    loginOut: function (e) {
        wx.removeStorageSync('userInfo')
        this.setData({
            userInfo :'',
            nickName :'',
        })
        
    },
    published:function (e) {
        wx.navigateTo({
          url: '/pages/published/published',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        // var userInfo = getApp().globalData.userInfo;
        // var nickName = getApp().globalData.nickName;
        var userInfo = wx.getStorageSync('userInfo');
        if (userInfo) {
            this.setData({
                userInfo:userInfo,
                nickName:userInfo.nickName,
            })
        }
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})
