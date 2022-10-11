import router from '@/router'

export default {
  install(Vue) {
    Vue.prototype.$utils = {
      // 获取通过query传值的数据
      getUrlParams(name) {
        return router.history.current.query[name]
      },
      // 判断安卓、IOS、PC
      getSystemType() {
        const u = navigator.userAgent
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
        if (isAndroid) {
          return 'android'
        } else if (isiOS) {
          return 'ios'
        } else {
          return 'pc'
        }
      },
      // 校验手机号码
      isPhoneNum(val) {
        const phoneRule = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
        return phoneRule.test(val)
      },
      // 检验身份证号码
      isIdCardNum(val) {
        // 校验规则
        const idCardRule =
          /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
        return idCardRule.test(val)
      },
      // 检验密码
      isPassport(val) {
        const passportReg =
          /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/
        return passportReg.test(val)
      },
      // 时间格式化
      formatTime(date, format) {
        if (!date) return
        if (!format) format = 'yyyy-MM-dd'
        switch (typeof date) {
          case 'string':
            date = new Date(date.replace(/-/, '/'))

            break
          case 'number':
            date = new Date(date)
            break
        }
        if (!(date instanceof Date)) return
        const dict = {
          yyyy: date.getFullYear(),
          M: date.getMonth() + 1,
          d: date.getDate(),
          H: date.getHours(),
          m: date.getMinutes(),
          s: date.getSeconds(),
          MM: ('' + (date.getMonth() + 101)).substr(1),
          dd: ('' + (date.getDate() + 100)).substr(1),
          HH: ('' + (date.getHours() + 100)).substr(1),
          mm: ('' + (date.getMinutes() + 100)).substr(1),
          ss: ('' + (date.getSeconds() + 100)).substr(1)
        }
        return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
          return dict[arguments[0]]
        })
      },
      // 判断时候为生产环境
      isProduction() {
        return process.env.NODE_ENV === 'production'
      },
      // 数组去重（普通数组、数组对象）
      duplicateArr(array, type = 'id') {
        switch (typeof array[0]) {
          case 'object':
            return array.filter((item, index, selfArr) => {
              return (
                selfArr.findIndex((val) => val[type] === item[type]) === index
              )
            })
          default:
            return [...new Set(array)]
        }
      },
      // 将格林威治时间转为时间格式yyyy-mm-dd
      timeTrans(time, type) {
        if (time) {
          let date = new Date(new Date(time).getTime() + 8 * 3600 * 1000)
          date = date.toJSON()
          if (type === 1) {
            date = date.substring(0, 10)
          } else {
            date = date.substring(0, 19).replace('T', ' ')
          }
          return date
        }
      },
      // 判断文件类型
      formatType(fileName) {
        let fileType
        if (/(\.pdf)$/.test(fileName)) {
          fileType = 'pdf'
        } else if (/(\.doc|\.docx)$/.test(fileName)) {
          fileType = 'word'
        } else if (/(\.png|\.jpg|\.jpeg)$/.test(fileName)) {
          fileType = 'image'
        } else {
          fileType = 'text'
        }
        return fileType
      },
      // 压缩图片
      async compressImg(file, type) {
        const img = await this.readImg(file)
        return new Promise((resolve) => {
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          const { width: originWidth, height: originHeight } = img
          // 图片尺寸
          const targetWidth = originWidth
          const targetHeight = originHeight
          canvas.width = targetWidth
          canvas.height = targetHeight
          context.clearRect(0, 0, targetWidth, targetHeight)
          // 图片绘制
          context.drawImage(img, 0, 0, targetWidth, targetHeight)
          // 转二进制格式 toBlob 转Base64 toDataURL
          canvas.toBlob(
            function (blob) {
              resolve(blob)
            },
            type || 'image/png',
            0.92
          )
        })
      },
      // 防抖
      debounce(fn, delay) {
        let timer = null // 用于保存定时器
        return () => {
          // 如果timer存在 就清除定时器，重新计时
          if (timer) {
            clearTimeout(timer)
          }
          // 设置定时器，规定时间后执行真实要执行的函数
          timer = setTimeout(() => {
            fn.apply(this)
          }, delay)
        }
      },
      quickSort(arr) {
        if (arr.length <= 1) {
          return arr
        }
        const pivotIndex = Math.floor(arr.length / 2)
        const pivot = arr.splice(pivotIndex, 1)[0]
        const left = []
        const right = []
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] < pivot) {
            left.push(arr[i])
          } else {
            right.push(arr[i])
          }
        }

        // 递归调用排序左侧和右侧的元素
        return this.quickSort(left).concat([pivot], this.quickSort(right))
      }
    }
  }
}
