console.show();
var DELAY = 100
// 设备信息
var WIDTH = device.width,
    HEIGHT = device.height,
    TYPE = device.brand + ' ' + device.model;
device.keepScreenOn();
log('欢迎使用微信红包辅助');
// log(WIDTH)
console.setSize(parseInt(WIDTH * 0.58), parseInt(WIDTH * 0.7));
console.setPosition(parseInt(WIDTH * 0.36), 0);

// 获取截图权限
if (!requestScreenCapture()) {
    toast('请求截图失败，程序结束');
    exit();
}

// 启动微信
// launchApp('微信');
sleep(5000);

var search = true

do {
    if(search){
        // 寻找红包颜色
        var chat = captureScreen();
        log('查找红包');
        for (let k = parseInt(HEIGHT * 0.9); k > parseInt(HEIGHT * 0.1); k--) {
            var point = images.pixel(chat, parseInt(WIDTH * 0.5), k);
            var red = colors.red(point),
                green = colors.green(point),
                blue = colors.blue(point);
            if (Math.abs(red - 250) + Math.abs(green - 158) + Math.abs(blue - 59) <= 15) {
                // 找到红包
                sleep(DELAY);
                log('点开红包');
                click(parseInt(WIDTH * 0.5), k);
                sleep(500);
                search = false
                break;
            }
        }
    }

    if (!search) {
        for (var i = 10; i > 0; i--) {
            // 寻找“开”
            var chat = captureScreen();
            log('打开红包');
            var count = 0;
            for (let y = parseInt(HEIGHT * 0.4); y < parseInt(HEIGHT * 0.8); y++) {
                var point = images.pixel(chat, parseInt(WIDTH * 0.5), y);
                var red = colors.red(point),
                    green = colors.green(point),
                    blue = colors.blue(point);
                if (Math.abs(red - 235) + Math.abs(green - 205) + Math.abs(blue - 153) <= 15) {
                    count += 1;
                }
            }
            log('匹配颜色：' + count)
            if (count > HEIGHT * 0.4 * 0.1) {
                // 有“开”，点击！
                click(parseInt(WIDTH * 0.5), parseInt(HEIGHT * 0.65));
                sleep(500);
                break;
            }
        }
        search = true
        log("back")
        sleep(1000);
        click(40,100);
        sleep(1000);
        log("back2222")
    }
} while (true)