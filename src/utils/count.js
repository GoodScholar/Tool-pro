// count.js
/**
 * 数字累加滚动，支持两种方式：
 * 1. 指定速度，通过interval控制，即控制帧与帧的间隔
 * 2. 指定时间，即：无论数字多大，指定时间内必须完成累加
 * @param {Object}   option              配置
 * @param {Number}   option.start        起始数字
 * @param {Number}   option.end          结束数字
 * @param {Number}   option.interval     帧与帧之间的间隔(ms)
 * @param {Boolean}  option.limitTime    指定时间
 * @param {Function} option.callback     回调函数，参数为每次累加后的数字
 */

export default function Count({
  start = 0,
  end = 100,
  interval = 0,
  limitTime = 0,
  callback
}) {
  // 每帧所需的时间(ms)
  // 按照MDN介绍，通常是每秒60帧
  const frameTime = 1000 / 60

  // 帧数
  let frameAmount

  // 步长
  // 即每次的累加值，默认: 1
  let frameStep = 1

  // 计数器
  // 当指定interval时，计数器才起作用
  // 作用：用于与interval比较，等于interval时，执行回调，然后清零重新计数，达到控制速度的效果
  let counter = 0

  // 如果指定了limitTime，则重新计算步长
  if (limitTime && !interval) {
    const length = end - start

    // 指定时间内可以完成多少帧
    frameAmount = limitTime / frameTime

    // 帧数与真实长度取两者之间最小值
    if (frameAmount > length) {
      frameAmount = length
    }

    frameStep = Math.round((end - start) / frameAmount)
  }

  // 帧的回调函数
  function step() {
    let req

    // 方式1和2的公共逻辑部分
    function commonLogic() {
      start += frameStep

      // 防止最后一次累加时出现数字越界的情况
      if (start >= end) {
        callback(end)
      } else {
        callback(start)
        window.cancelAnimationFrame(req)
        req = window.requestAnimationFrame(step)
      }
    }

    // 方式1：按时间间隔
    if (interval !== 0) {
      counter++

      if (counter === interval) {
        commonLogic()
        counter = 0
      } else {
        window.cancelAnimationFrame(req)
        req = window.requestAnimationFrame(step)
      }
      // 方式2：按指定时间
    } else {
      if (start < end) {
        commonLogic()
      }
    }
  }

  window.requestAnimationFrame(step)
}
