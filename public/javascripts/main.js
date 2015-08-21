
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
            return '您好，我们是地球外星生物研究中心中国分部的工作人员，您的生理特征已经被识别为“有90%以上可能性为外星生物”，工作人员将在10分钟内赶到，请您配合我们的工作。'
        }
        if (count > 45) {
            return '我们郑重的警告您，我们已经将您开挂玩游戏的行为报告给了公安局，警方将在30分钟内到达！请您牢记，坦白从宽，牢底坐穿，抗拒从严，回家过年！'
        }
        if (count > 40) {
            return '您的手速已经登峰造极了！加藤鹰都拜倒在您的手速之下！ ';
        }
        if (count > 35) {
            return '一天按坏一个鼠标，您的日常工作还能正常进行么？走过路过千万不要错过，支持亿万次级别点击的钛合金鼠标已经在天猫商城上架了，只要998，只要998，心动你就带回家。';
        }
        if (count > 30) {
            return '手速这么慢？想要提高吗？请准备好一口铁锅和10斤铁砂，以文火慢炖，再将双手轮流穿插其中，每天练习30分钟以上即可，本期的《铁砂掌修炼指南》就到这里。';
        }
        if (count > 20) {
            return '是不是还没有活动开？告诉您一个小技巧，往手指上哈两口热气，对手速提升大有帮助哦！';
        }
        if (count > 10) {
            return '我们是中国帕金森红十字基金会的工作人员，请问您需要我们的无偿经济援助么？';
        }
        return '请您不要用脚点，用手行么！';
    }
});

function showCover() {
    $("#mcover").css("display", "block");  // 分享给好友圈按钮触动函数
}
function hideCover() {
    $("#mcover").css("display", "none");  // 点击弹出层，弹出层消失
}
