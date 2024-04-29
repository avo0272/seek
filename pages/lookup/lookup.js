// reserve.js

Page({
  data: {
    formList: [], // 存储从数据库获取的表单信息列表
  },

  onLoad() {
    this.getFormList();
  },

  // 从数据库获取集合中的所有表单信息
  getFormList() {
    wx.cloud.database().collection('reserveinfo').get()
    .then(res => {
      console.log('获取表单信息列表成功', res.data);
      this.setData({
        formList: res.data
      });
    }).catch(err => {
      console.error('获取表单信息列表失败', err);
    });
  },
  
});
