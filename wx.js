console.show();

// 设备信息
var WIDTH = device.width,
    HEIGHT = device.height,
    TYPE = device.brand + ' ' + device.model;
device.keepScreenOn();
log('欢迎使用微信红包辅助', WIDTH);
console.setSize(parseInt(WIDTH * 0.4), parseInt(WIDTH * 0.7));
console.setPosition(parseInt(WIDTH * 0.36), 0);

// 获取截图权限
if (!requestScreenCapture()) {
    toast('请求截图失败，程序结束');
    exit();
}

// 启动微信
// launchApp('微信');
sleep(5000);

var check = false; // 是否检测过布局
var lineHeight; // 每行消息的高度
var redX = 0; // 消息红点X坐标
var startX; // 每行消息开始的X坐标
var startY; // 第一行消息开始的Y坐标
var white = 255; // 消息行背景色
var gray = 153; // 文字的颜色
var totalCount = 0; // 总共获取的红包数量
var loopCount = 0; // 已循环的次数
var img

do {
    // 获取截图
    img = captureScreen();
    // 检测布局
    if (!check) {
        log('===== 检测布局中 =====');
        // 寻找有像素的X起点
        var sx = 0;
        for (let c = 0; c < WIDTH; c++) {
            if (colors.red(images.pixel(img, c, parseInt(HEIGHT * 0.4))) > 0 && colors.red(images.pixel(img, c, parseInt(HEIGHT * 0.6))) > 0) {
                sx = c;
                log('起始像素点', sx)
                break;
            }
        }
        // 寻找startY
        for (let r = 0; r < HEIGHT; r++) {
            var point = images.pixel(img, sx, r);
            var red = colors.red(point),
                green = colors.green(point),
                blue = colors.blue(point);
            if (Math.abs(red - white) + Math.abs(green - white) + Math.abs(blue - white) <= 15) {
                // 找到startY
                startY = r;
                log('第一行起始Y坐标', startY);
                break;
            }
        }
        // 寻找lineHeight
        var lineY = []
        for (let r = HEIGHT * 0.3; r < HEIGHT * 0.6; r++) {
            var point = images.pixel(img, WIDTH - 10, r);
            var red = colors.red(point),
                green = colors.green(point),
                blue = colors.blue(point);
            if (Math.abs(red - white) + Math.abs(green - white) + Math.abs(blue - white) > 60) {
                lineY.push(r)
            }
            if (lineY.length >= 2) {
                lineHeight = lineY[1] - lineY[0]
                log('行高', lineHeight)
                break;
            }
        }
        // 寻找startX
        var y1 = startY + parseInt(lineHeight * 0.581),
            y2 = startY + parseInt(lineHeight * 0.806);
        var error = {};
        for (let c = lineHeight; c < parseInt(HEIGHT * 0.5); c++) {
            error[c] = 0; // 每列的颜色误差
            for (let y = y1; y < y2; y++) {
                var point = images.pixel(img, c, y);
                var red = colors.red(point),
                    green = colors.green(point),
                    blue = colors.blue(point);
                error[c] += Math.abs(red - white) + Math.abs(green - white) + Math.abs(blue - white);
            }
            // if (error[c] == 0 && redX == 0) {
            //     // 找到redX
            //     redX = c;
            //     log('红点X坐标：', redX);
            // }
            if (c > lineHeight && error[c - 1] <= 15 * (y2 - y1) && error[c] > error[c - 1]) {
                // 找到startX 
                startX = c;
                redX = c - 40;
                log('消息起始X坐标', startX);
                break;
            }
        }
        log('===== 布局检测完毕 =====');
        check = true;
    }

    // 检查前三条消息
    for (let m = 0; m < 3; m++) {
        var redY = startY + parseInt((0.15 + m) * lineHeight)
        let point_red = images.pixel(img, redX, redY);
        var red = colors.red(point_red),
            green = colors.green(point_red),
            blue = colors.blue(point_red);

        if (red > 240 && green < 100 && blue < 100) {
            // 有未读消息
            click(redX, redY + parseInt(0.5 * lineHeight));
            log("有未读消息");
            sleep(600);
            // 寻找红包颜色
            img = captureScreen();
            for (let k = parseInt(HEIGHT * 0.9); k > parseInt(HEIGHT * 0.1); k--) {
                var point = images.pixel(img, parseInt(WIDTH * 0.5), k);
                var red = colors.red(point),
                    green = colors.green(point),
                    blue = colors.blue(point);
                if (Math.abs(red - 250) + Math.abs(green - 158) + Math.abs(blue - 59) <= 15) {
                    // 找到红包
                    click(parseInt(WIDTH * 0.5), k);
                    sleep(800);
                    // 寻找“开”
                    img = captureScreen();
                    var count = 0;
                    for (let y = parseInt(HEIGHT * 0.4); y < parseInt(HEIGHT * 0.8); y++) {
                        var point = images.pixel(img, parseInt(WIDTH * 0.5), y);
                        var red = colors.red(point),
                            green = colors.green(point),
                            blue = colors.blue(point);
                        if (Math.abs(red - 235) + Math.abs(green - 205) + Math.abs(blue - 153) <= 15) {
                            count += 1;
                        }
                    }
                    if (count > HEIGHT * 0.4 * 0.1) {
                        // 有“开”，点击！
                        click(parseInt(WIDTH * 0.5), parseInt(HEIGHT * 0.65));
                        sleep(1000);
                        // 查看是否抢到了
                        img = captureScreen();
                        var count = 0;
                        for (let y = parseInt(HEIGHT * 0.4); y < parseInt(HEIGHT * 0.8); y++) {
                            var point = images.pixel(img, parseInt(WIDTH * 0.5), y);
                            var red = colors.red(point),
                                green = colors.green(point),
                                blue = colors.blue(point);
                            if (Math.abs(red - 255) + Math.abs(green - 255) + Math.abs(blue - 255) <= 15) {
                                count += 1;
                            }
                        }
                        if (count > HEIGHT * 0.4 * 0.3) {
                            totalCount += 1;
                        }
                    }
                    back();
                    sleep(600);
                    break;
                }
            }
            back();
            sleep(600);
        }
    }
    loopCount += 1;
    log('已监测', loopCount, '次，抢到', totalCount, '个');
    sleep(1000);
    // break;
} while (true);