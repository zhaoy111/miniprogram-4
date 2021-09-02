
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