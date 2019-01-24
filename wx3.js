
const DELAY = 50
const LOG_DELAY = 5000

// wechat 7.0.0
const WECHAT = 'com.tencent.mm:id/'
const LISTROW_ID = WECHAT + 'b4m' // 每一列容器的 ID
const ADD_BUTTON_ID = WECHAT + 'alr' // 聊天框的＋按钮
const PACKET_OPEN_ID = WECHAT + 'cv0' // 红包按钮开
const PACKET_LATE_ID = WECHAT + 'cuz' // 手慢了文字
const CLOSE_ID = WECHAT + 'k5' // 关闭按钮

const DETAIL_ACT = 'com.tencent.mm.plugin.luckymoney.ui.LuckyMoneyDetailUI'
const RECEIVE_ACT = 'com.tencent.mm.plugin.luckymoney.ui.LuckyMoneyNotHookReceiveUI'
const LAUNCHER_ACT = 'com.tencent.mm.ui.LauncherUI'

const REDPACKET_ID = WECHAT + 'ao4'
const BLANKPACKET_ID = WECHAT + 'ape'
const VALIDPACKET_ID = WECHAT + 'apf'
const OPENBUTTON_ID = WECHAT + 'cv0'
const DETAIL_ID = WECHAT + 'cqz'
const RUNOUT_ID = WECHAT + 'cs9'
const REDPOINT_ID = WECHAT + 'b4n'
const NUMBERPOINT_ID = WECHAT + 'mm'
const ROWTEXT_ID = WECHAT + 'b4q'

console.show();
console.setSize(200, 200);
device.keepScreenOn();
auto();

const counter = (function () {
    let count = 0
    let logCount = 0

    return function () {
        sleep(DELAY)
        if (++count > LOG_DELAY / DELAY) {
            count = 0
            log("查找", ++logCount, currentActivity())
        }
    }
})()

function watchDetail() {
    let detail = id(DETAIL_ID).find()
    if (!detail.empty() && detail[0].text().indexOf('已存入零钱') > -1) {
        back();
        sleep(600);
        return true
    } else {
        return false
    }
}

function watchRunout() {
    let runout = id(RUNOUT_ID).find()
    if (!runout.empty()) {
        runout.click();
        sleep(600);
        return true
    } else {
        return false
    }
}

function findByID(myID) {
    if (!id(myID).findOne(1000)) return false
    return id(myID).find()
}

function watchDialog() {
    let redPackets = findByID(REDPACKET_ID)

    if (redPackets && !redPackets.empty()) {
        redPackets.every(function (redPacket) {
            let blankPacket = redPacket.find(id(BLANKPACKET_ID))
            let validPacket = redPacket.find(id(VALIDPACKET_ID))
            if (blankPacket.empty() && !validPacket.empty()) {
                // 进入红包页面
                myclick(redPacket, 'openPage',
                    function (_UiObject) {
                        myclick(_UiObject, 'detailPage', function () {
                            myback();
                        })
                    })
                return false
            } else {
                return true
            }
        })
        return true
    } else {
        return false
    }
}

function judgePage() {

    if (id(LISTROW_ID).exists()) return 'listPage'

    if (id(ADD_BUTTON_ID).exists()) return 'dialogPage'

    let act = currentActivity()
    if (act === RECEIVE_ACT) {
        if (id(PACKET_OPEN_ID).exists()) {
            return 'openPage'
        } else if (id(PACKET_LATE_ID.exists())) {
            return 'latePage'
        } else {
            log('红包页面没有获取到ID', id(PACKET_OPEN_ID), id(PACKET_LATE_ID))
        }
    }

    if (act === DETAIL_ACT) return 'detailPage'
}

function jumpTo(toPage, resolve, reject) {
    let _id = ''
    if (toPage === 'dialogPage') {
        _id = ADD_BUTTON_ID

    } else if (toPage === 'openPage') {
        _id = PACKET_OPEN_ID
    }

    let _UiObject = findByID(_id)
    if (_UiObject) {
        log('进入：', toPage)
        resolve(_UiObject)
    } else {
        reject()
    }
}

function myback() {
    let btn = id(CLOSE_ID).findOne(1000) // or findOnce()
    if (btn !== null) {
        btn.click()
    } else {
        back();
    }
    log('退出：', eventStack.pop())
}

function myclick(_UiObject, toPage, resolve, reject) {
    if (_UiObject.click()) {
        toPage && jumpTo(toPage, resolve, reject)
    } else {
        log(_UiObject.id(), '不可以点击')
    }
}

function watchList() {
    let listRows = id(LISTROW_ID).find()
    if (!listRows.empty()) {
        listRows.every(function (listRow) {
            let numberPoint = listRow.find(id(NUMBERPOINT_ID))
            let redPoint = listRow.find(id(LISTROW_ID))
            let rowText = listRow.find(id(ROWTEXT_ID))

            if (!numberPoint.empty()) {
                myclick(listRow, 'dialog',
                    function () {
                        watchDialog()
                        myback();
                        return false
                    },
                    function () {
                        myback();
                        return false
                    });
            }
            return true
        })
    }
}

var eventStack = []

do {
    counter();
    let page = judgePage()
    if (page === 'listPage') {
        watchList()
    }
} while (true);