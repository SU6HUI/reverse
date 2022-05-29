//节流
export function throttle(fn, delay) {
    var prevTime = Date.now()

    return function () {
        var context = this, args = [...arguments], nowTime = Date.now()

        if (nowTime - prevTime >= delay) {
            prevTime = Date.now()
            return fn.apply(context, args)
        }
    }
}