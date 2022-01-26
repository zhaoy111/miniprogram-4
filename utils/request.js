
export const http=(params)=>{
  return new Promise((resolve, reject)=>{
    wx.request({
      ...params,
      timeout:10000,
      success : (result)=>{
        resolve(result);
      },
      fail: (err) => {
        reject(err);
      }
    })
  })
}


export const shareImage=(img)=>{
  return new Promise((resolve, reject)=>{
    wx.downloadFile({
      url: img,
      success: (res) => {
        console.log(res.tempFilePath);
        wx.showShareImageMenu({
          path: res.tempFilePath
        })
        resolve(res)
      },
      fail:(res) => {
        reject(res)
      },
      err:(res) => {
        console.log(res);
      }
    })
  })
}
