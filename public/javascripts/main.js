
$(function () {
        var $time = $('#time'),         // 获得显示时间的<span>
        $btn = $('#btn'),               // 获得显示按钮的<a>
        $replay = $('#replay'),
        $message = $('#message'),
        time = 5000,                    // 计时5秒！5000毫秒
        count = 0,                      // 戳了多少下！初始值为0
        prepareSecond = 3,
        status = 'init';

    init();
    $btn.on('touchstart click', function () {
        switch (status) {
            case 'init':
                prepare();
                break;
            case 'preparing':
                break;
            case 'started':
                $btn.html(++count);
                flash($btn);
                break;
        }
    });

    $replay.click(init);

    var clickTime;

    function flash($btn) {
        clickTime = new Date();
        $btn.addClass('glowing');
        (function (activeTime) {
            setTimeout(function () {
                if (activeTime != clickTime) return;

                $btn.removeClass('glowing');
            }, 100);
        })(clickTime);
    }

    function init() {
        status = 'init';
        count = 0;
        time = 5000;
        $btn.html('Ready?').removeClass('glowing');
        $time.html((time / 1000).toFixed(3) + ' 秒');
        hideCover();
    }

    function prepare() {
        status = 'preparing';
        count = 0;
        $btn.html('3...');

        var second = prepareSecond;
        var prepareTimer = setInterval(function () {
            second--;
            if (second == 0) {
                $btn.html('Go!');
                flash($btn);
                clearInterval(prepareTimer);
                start();
            }
            else {
                $btn.html(second + '...');
            }
        }, 1000);
    }

    function start() {
        status = 'started';
        var counter = setInterval(timer, 7);
        var curTime;

        function timer() {
            time -= 7;
            if (time <= 0) {
                time = 0;
                clearInterval(counter);
                stop();
            }

            curTime = (time / 1000).toFixed(3);
            if (curTime == '0.000') {
                $time.html('时间到');
            }
            else {
                $time.html(curTime + ' 秒');
            }
        }
    }

    function stop() {
        status = 'stopped';
        $message.html('戳了' + count + '下！' + titles(count));
        showCover();
    }

    function titles(count) {
        if (count > 50) {
            return '你的指尖，有改变世界的力量，距离超越大神还剩970小时，加油！'
        }
        if (count > 45) {
            return '如果你用不畏惧，马上就举世无双了!'
        }
        if (count > 40) {
            return '如果你用不畏惧，马上就万夫莫敌了！ ';
        }
        if (count > 35) {
            return '如果你用不畏惧，马上就一骑当千了！';
        }
        if (count > 30) {
            return '如果你用不畏惧，马上就勇冠三军了！';
        }
        if (count > 20) {
            return '如果你用不畏惧!';
        }
        if (count > 10) {
            return '你的指尖，有改变世界的力量';
        }
        return '你不知道，你的指尖的能力';
    }
});

function showCover() {
    $("#mcover").css("display", "block");  // 分享给好友圈按钮触动函数
}
function hideCover() {
    $("#mcover").css("display", "none");  // 点击弹出层，弹出层消失
}
