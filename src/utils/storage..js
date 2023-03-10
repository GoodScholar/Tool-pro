/**
 * @description 封装本地存储操作模块，并设置localStorage设置过期时间
 * @author CSDN 追风少年
 */

// 存储到本地存储中
/* setItem({
    key: 'isLogin',
    value: isLog.data,
    expires: 1000 * 60 * 60 * 24
}) */

// 从存储中获取
// getItem('isLogin')

/**
 * 存储缓存数据
 */
export const setItem = (params) => {
  const obj = {
    key: '',
    value: '',
    expires: '',
    startTime: new Date().getTime() // 记录何时将值存入缓存，毫秒级
  }
  const options = {}
  // 将obj和传进来的params合并
  Object.assign(options, obj, params)
  if (options.expires) {
    // 如果options.expires设置了的话
    // 以options.name为key，options为值放进去
    localStorage.setItem(options.key, JSON.stringify(options))
  } else {
    // 如果options.expires没有设置，就判断一下value的类型
    const type = Object.prototype.toString.call(options.value)
    // 如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
    if (type === '[object Object]') {
      options.value = JSON.stringify(options.value)
    }
    if (type === '[object Array]') {
      options.value = JSON.stringify(options.value)
    }
    localStorage.setItem(options.key, options.value)
  }
}

/**
 * 获取缓存数据
 */
export const getItem = (key) => {
  const value = window.localStorage.getItem(key)
  if (value === null) {
    return false
  }
  let item = null
  // 先将拿到的试着进行json转为对象的形式
  try {
    item = JSON.parse(value)
  } catch (err) {
    // 如果不行就不是json的字符串，就直接返回
    item = value
  }

  // 如果有startTime的值，说明设置了失效时间
  if (item.startTime) {
    const date = new Date().getTime()
    // 何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
    if (date - item.startTime > item.expires) {
      // 缓存过期，清除缓存，返回false
      window.localStorage.removeItem(key)
      return false
    } else {
      // 缓存未过期，返回值
      return item.value
    }
  } else {
    // 如果没有设置失效时间，直接返回值
    return item
  }
}

/**
 * 删除单个缓存数据
 */
export const removeItem = (key) => {
  window.localStorage.removeItem(key)
}

/**
 * 移出全部缓存数据
 */
export const clear = () => {
  window.localStorage.clear()
}
