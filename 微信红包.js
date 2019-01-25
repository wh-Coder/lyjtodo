const DELAY = 50
const LOG_DELAY = 3000
// 0 监听列表; 1 监听通知栏
const AUTO_MODE = 1

// WECHAT 7.0.0
const PACKAGE = 'com.tencent.mm'
const CLOSE_ID = PACKAGE + ':id/k5' // 关闭按钮
const LISTROW_ID = PACKAGE + ':id/b4m' // 每一列容器的 ID
const NUMBERPOINT_ID = PACKAGE + ':id/mm' // 数字红点
const ADD_BUTTON_ID = PACKAGE + ':id/alr' // 聊天框的＋按钮
const PACKET_OPEN_ID = PACKAGE + ':id/cv0' // 红包按钮开
const PACKET_LATE_ID = PACKAGE + ':id/cuz' // ‘手慢了’文字
const DETAIL_TEXT_ID = PACKAGE + ':id/cqt' // 详情页红包描述
const REDPACKET_ID = PACKAGE + ':id/ao4' // 对话框里面的红包消息
const BLANKPACKET_ID = PACKAGE + ':id/ape' // 消息中‘已被领完’
const VALIDPACKET_ID = PACKAGE + ':id/apf' // 消息中‘微信红包’

// cqv 金额
const DETAIL_ACT = 'com.tencent.mm.plugin.luckymoney.ui.LuckyMoneyDetailUI'
const RECEIVE_ACT = 'com.tencent.mm.plugin.luckymoney.ui.LuckyMoneyNotHookReceiveUI'
const LAUNCHER_ACT = 'com.tencent.mm.ui.LauncherUI'

console.show();
console.setSize(200, 200);
device.keepScreenOn();
auto();

function watchNotification() {
    auto();
    events.observeNotification();
    events.onNotification(function (notification) {
        if (notification.getPackageName() === PACKAGE && notification.getText().indexOf('[微信红包]')) {
            notification.click();
            printNotification(notification)
            // 没有红包 50*50 ms 退出
            for (let i = 0; i < 50; i++) {
                sleep(50);
                if (watchDialog()) {
                    break;
                }
            }
            home();
        }
    });
}

function printNotification(notification) {
    log("应用包名: " + notification.getPackageName());
    log("通知文本: " + notification.getText());
    log("通知优先级: " + notification.priority);
    log("通知目录: " + notification.category);
    log("通知时间: " + new Date(notification.when));
    log("通知数: " + notification.number);
    log("通知摘要: " + notification.tickerText);
}

const counter = (function () {
    let count = 0
    let logCount = 0

    return function () {
        sleep(DELAY)
        if (++count > LOG_DELAY / DELAY) {
            count = 0
            log("查找", ++logCount)
        }
    }
})()

/**
 * @param {*} myID
 * @returns UiObject or null
 */
function findByID(myID, delay) {
    return id(myID).findOne(1000)
}

function judgePage() {

    if (id(LISTROW_ID).exists()) return 'listPage'

    if (id(ADD_BUTTON_ID).exists()) return 'dialogPage'

    if (id(PACKET_OPEN_ID).exists()) return 'openPage'

    if (id(PACKET_LATE_ID).exists()) return 'latePage'

    if (id(DETAIL_TEXT_ID).exists()) return 'detailPage'
}

function jumpTo(toPage, resolve, reject) {
    let _id = ''
    if (toPage === 'dialogPage') {
        _id = ADD_BUTTON_ID
    } else if (toPage === 'openPage') {
        _id = PACKET_OPEN_ID
    } else if (toPage === 'detailPage') {
        _id = DETAIL_TEXT_ID
    }

    let _UiObject = findByID(_id)
    if (_UiObject) {
        eventStack.push(toPage)
        log('进入：', toPage)
        resolve(_UiObject)
    } else {
        if (toPage === 'openPage') {
            let _obj = findByID(PACKET_LATE_ID)
            let _toPage = 'latePage'
            if (_obj) {
                eventStack.push(_toPage)
                log('进入：', _toPage)
                resolve()
            } else {
                reject()
            }
        } else {
            log(toPage, 'id拿不到')
            reject()
        }
    }
}

function myback() {
    sleep(600)
    let btn = findByID(CLOSE_ID)
    if (btn) {
        if (!btn.click()) {
            back();
        }
    } else {
        back();
    }
    log('退出：', eventStack.pop())
}

function myclick(_UiObject, toPage) {
    return new Promise(function (resolve, reject) {
        if (_UiObject.click()) {
            toPage && jumpTo(toPage, resolve, reject)
        } else {
            log(_UiObject.id(), '不可以点击')
            reject()
        }
    })
}

function watchList() {
    let listRows = id(LISTROW_ID).find()
    if (!listRows.empty()) {
        listRows.every(function (listRow) {
            let numberPoint = listRow.find(id(NUMBERPOINT_ID))

            if (!numberPoint.empty()) {
                return myclick(listRow, 'dialogPage')
                    .then(function () {
                        watchDialog()
                        myback();
                        return false
                    }, function () {
                        log('dialogPage错误')
                        myback();
                        return false
                    })
            }
            return true
        })
    }
}

function watchDialog() {
    let redPackets = id(REDPACKET_ID).find()
    if (!redPackets.empty()) {
        redPackets.every(function (redPacket) {
            let blankPacket = redPacket.find(id(BLANKPACKET_ID))
            let validPacket = redPacket.find(id(VALIDPACKET_ID))

            if (blankPacket.empty() && !validPacket.empty()) {
                return myclick(redPacket, 'openPage')
                    .then(function (_UiObject) {
                        if (_UiObject) {
                            myclick(_UiObject, 'detailPage').then(function () {

                                // 从红包开页面到详情回来时不走红包开页面
                                if (eventStack.slice(-2, -1)[0] === 'openPage') {
                                    eventStack.splice(-2, 1)
                                }
                                myback();
                            }, function () {
                                myback();
                            })
                        } else {
                            myback();
                        }
                        return false
                    }, function () {
                        log('openPage错误')
                        myback();
                        return false
                    })
            }
            return true
        })
        return true
    } else {
        return false
    }
}

var eventStack = []

threads.start(function () {
    log('监听列表')
    do {
        counter();
        let page = judgePage()
        if (page === 'listPage') {
            watchList()
        } else if (page === 'dialogPage') {
            watchDialog()
        }
    } while (true);
})

if (AUTO_MODE === 1) {
    log('监听通知栏')
    watchNotification()
}
