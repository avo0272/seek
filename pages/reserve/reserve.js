// pages/yyxc/yyxc.js
Page({

    /**
     * 页面的初始数据
     */
    onLoad() {
        // 页面加载时检查用户登录状态
        this.checkAuth();
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
    data: {
        startPoint: '',
        endPoint: '', 
        date: '20xx-xx-xx',  
        time: 'xx:xx',
        contact: '',
        imageSrc: '',
        remark: ''
      },  
      inputStartPoint: function(e) {  
        this.setData({  
          startPoint: e.detail.value  
        });  
      },  
        
      inputEndPoint: function(e) {  
        this.setData({  
          endPoint: e.detail.value  
        });  
      },  
        
      bindDateChange: function(e) {  
        this.setData({  
          date: e.detail.value  
        });  
      },  
      bindTimeChange: function(e) {  
        this.setData({  
          time: e.detail.value  
        });  
      },

      inputContact: function(e) {  
        this.setData({  
          contact: e.detail.value
        });  
      },  
        
      inputRemark: function(e) { 
        this.setData({ 
          remark: e.detail.value 
        });
      },
     
      // 上传图片到云存储
      uploadImage() {
        wx.chooseImage({
          count: 1, 
          sizeType: ['compressed'], 
          sourceType: ['album', 'camera'], 
          success: res => {
            const tempFilePath = res.tempFilePaths[0];
            this.setData({
              imageSrc: tempFilePath,
            });
          },
          fail: err => {
            console.error('选择图片失败', err);
          }
        });
      },


      formSubmit(e) {
          const formData = this.data
          const check = this.checkformData(formData)
          if (check.status) {
            // 如果数据验证通过，可以执行表单提交操作
            console.log('表单数据验证通过，可以提交表单');
            wx.cloud.database().collection('reserveinfo').add({
                data: {
                  startPoint: this.data.startPoint,
                  endPoint: this.data.endPoint,
                  date: this.data.date,
                  time: this.data.time,
                  contact: this.data.contact,
                  remark: this.data.remark,
                  imageSrc:this.data.imageSrc
                },
                success: res => {
                    const _openid=res._openid
                    console.log(_openid)
                    wx.navigateTo({
                      url: '/pages/published/published?_openid=' + _openid,
                    })
                  wx.showToast({
                    title: '提交成功',
                    icon: 'success'
                  });
                  // 清空表单数据
                  this.setData({
                    startPoint: '',
                    endPoint: '',
                    date: '20xx-xx-xx',  
                    time: 'xx:xx',
                    contact: '',
                    remark: '',
                    imageSrc:''
                  });
                },
                fail: err => {
                  wx.showToast({
                    title: '提交失败',
                    icon: 'none'
                  });
                }
              });
          } else {
            // 数据验证不通过
            wx.showToast({
              title: '请完善信息',
              icon: 'none'
            });
            
          }
       
        
      },
      checkformData(formData){
          
        if (formData.startPoint=='') {
            return{
                status:false,
            }
        }
        else if (formData.endPoint=='') {
            return{
                status:false,
            }
        }
        else if (formData.date=='') {
            return{
                status:false,
            }
        }
        else if (formData.time=='') {
            return{
                status:false,
            }
        }
        
        else{
            return{
                status:true
            }
        }
      },
      
    
})