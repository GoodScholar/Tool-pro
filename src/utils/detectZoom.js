/**
 * @description 解决按1920*1080设计图做的页面适配屏幕缩放并适配4K屏
 */

export const detectZoom = () => {
    let ratio = 0
    const screen = window.screen
    const ua = navigator.userAgent.toLowerCase()
    if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio
    } else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
            ratio = screen.deviceXDPI / screen.logicalXDPI
        }
    } else if (
        window.outerWidth !== undefined &&
        window.innerWidth !== undefined
    ) {
        ratio = window.outerWidth / window.innerWidth
    }
    if (ratio) {
        ratio = Math.round(ratio * 100)
    }
    return ratio
}