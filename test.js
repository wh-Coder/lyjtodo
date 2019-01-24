function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}
const DELAY = 50
const LOG_DELAY = 1000
const counter = (function () {
    let count = 0
    let logCount = 0

    return function () {
        sleep(DELAY)
        if (++count > LOG_DELAY / DELAY) {
            count = 0
            console.log(++logCount, count)
        }
    }
})()

function p() {
    return new Promise(function (resolve, reject) {
        if (+new Date() % 2 === 0) {
            resolve()
        } else {
            reject()
        }
    })
}

do {
    counter();
    p().then(function () {
        console.log('ok')
    }).catch(function () {
        console.log('error')
    }).finally(function () {
        console.log('done')
    })

} while (true);