console.show();
device.keepScreenOn();
const DELAY = '1000'
const REDPACKET_ID = 'com.tencent.mm:id/ao4'
const BLANKPACKET_ID = 'com.tencent.mm:id/ape'
const VALIDPACKET_ID = 'com.tencent.mm:id/apf'
const OPENBUTTON_ID = 'com.tencent.mm:id/cv0'
const DETAIL_ID = 'com.tencent.mm:id/cra'
const RUNOUT_ID = 'com.tencent.mm:id/cs9'

auto();

function watchDetail() {
    let detail = id(DETAIL_ID).find()
    if (!detail.empty() && detail[0].text().indexOf('被抢光') > -1) {
        back();
        sleep(600);
    }
}

function watchRunout() {
    let runout = id(RUNOUT_ID).find()
    if (!runout.empty()) {
        runout.click();
        sleep(600);
    }
}

do {
    sleep(DELAY)
    log("查找")
    watchDetail();
    watchRunout();
    let redPackets = id(REDPACKET_ID).find()
    if (!redPackets.empty()) {
        redPackets.forEach(function (redPacket) {
            let blankPacket = redPacket.find(id(BLANKPACKET_ID))
            let validPacket = redPacket.find(id(VALIDPACKET_ID))
            if (blankPacket.empty() && !validPacket.empty()) {
                // 进入红包页面
                redPacket.click();

                let openButton = id(OPENBUTTON_ID).findOne(2000)

                if (openButton !== null) {
                    openButton.click()
                    watchDetail();
                } else {
                    watchDetail();
                    watchRunout();
                }
            }
        })
    } else {
        // log('没有红包')
    }
} while (true);