// cx@kdxcxs.com
// |/  |¯\ \/ |¯ \/ |¯  
// |¯\ |_/ /\ |_ /\  ¯| 
//                   ¯  

console.log('%ccx@kdxcxs.com\n|/  |¯\\ \\/ |¯ \\/ |¯  \n|¯\\ |_/ /\\ |_ /\\  ¯| \n                  ¯  ', 'color: blue; font-size: 20px');

// https://www.cnblogs.com/starof/p/4988516.html
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}

function enterRoom() {
    $('#room-choosing').hide();
    $('#running-container').show();
    $('#control-button')[0].onclick = startCatching;
    connect(parseInt($('#roomid-input')[0].value));
    startCatching();
}

function startCatching() {
    console.clear();
    console.log('%ccx@kdxcxs.com\n|/  |¯\\ \\/ |¯ \\/ |¯  \n|¯\\ |_/ /\\ |_ /\\  ¯| \n                  ¯  ', 'color: blue; font-size: 20px');
    running = true;
    viewers = [];
    allViewers = 0;
    $('#viewers-count')[0].innerText = 0;
    $('#lottery-done').hide();
    $('#running-container').show();
    $('#running-status')[0].innerText = '开始记录!';
    $('#control-button')[0].innerText = '停止记录';
    $('#control-button')[0].onclick = stopCatching;
}

function stopCatching() {
    running = false;
    $('#running-status')[0].innerText = '准备抽奖';
    $('#control-button')[0].innerText = '随机抽奖';
    $('#control-button')[0].onclick = lottery;
}

function lottery() {
    $('#running-container').hide();
    $('#lottery-done').show();
    let luckyIndex = randomNum(1, viewers.length) - 1;
    $('#control-button')[0].innerText = '再抽一次';
    $('#control-button')[0].onclick = startCatching;
    $('#lucky-user')[0].innerText = viewerNames[luckyIndex] + '(' + viewers[luckyIndex].toString() + ')';
    $('#lucky-user')[0].onclick = () => {
        window.open('https://space.bilibili.com/' + viewers[luckyIndex].toString());
    };
    mdui.dialog({
        title: '幸运儿出来了!',
        content: viewerNames[luckyIndex] + '(' + viewers[luckyIndex].toString() + ')',
        buttons: [
            {
                text: '确认'
            }
        ]
    });
}