// pages/published/published.js
Page({

    data: {
        list:[],
    },
   
      onLoad(){
        this.checkAuth();
        const openid = getApp().globalData.openid;
        wx.cloud.database().collection('reserveinfo').where({
            _openid: openid
          }).get().then(res => {
            this.setData({
                list:res.data
            });
            
          }).catch(err => {
            console.error(err);
          });
      },
      checkAuth() {
        const userInfo = wx.getStorageSync('userInfo');
        if (!userInfo) {
          // 用户未登录授权，跳转到授权页面
          wx.switchTab({
            url: '/pages/userinfo/userinfo'
          });
          wx.showToast({
            title: '请授权登录',
            icon:'none'
          })
        } else {
          // 用户已登录授权，可以继续打开当前页面
          console.log('用户已登录授权');
        }
      },

      delete(e) {
        const _id = e.currentTarget.dataset.id; // 获取当前点击按钮的数据id
        wx.showModal({
          title: '提示',
          content: '确定要删除吗？',
          success: (res) => {
            if (res.confirm) {
              wx.cloud.database().collection('reserveinfo').doc(_id).remove()
                .then(res => {
                  console.log("删除成功", res);
                  // 删除成功后重新获取数据
                  this.getData();
                })
                .catch(err => {
                  console.log("删除失败", err);
                });
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
      },
      getData() {
        wx.cloud.database().collection('reserveinfo').get()
          .then(res => {
            this.setData({
              list: res.data
            });
            console.log("数据获取成功", res.data);
          })
          .catch(err => {
            console.error("数据获取失败", err);
          });
      },



})