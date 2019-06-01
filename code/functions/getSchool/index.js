//这个云函数用来把所有的School中的内容从数据库中读出来。并解析成两个数组SchoolId和SchoolName。
//两个数组中同一下标index,学校名称SchoolName[index]对应学校标识符 SchoolId[index]
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  // collection 上的 get 方法会返回一个 Promise，因此云函数会在数据库异步取完数据后返回结果
 return db.collection('School').get()
}