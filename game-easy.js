window.onload = function () {

    const holes = document.querySelectorAll('.hole');
    const scoreBoard = document.querySelector('.score');
    const moles = document.querySelectorAll('.mole');
    const startBtn = document.getElementById('start_btn');
    let titleH1 = document.getElementById('title');

    let lastHole;
    let timeUp = false;
    let score = 0;
    let gameTime = 10000;
    let reGameTime = 10000;


    startBtn.addEventListener('click', function () {
        showBtnAnimation();
        startGame();
    }, false);

    function showBtnAnimation() {
        event.preventDefault();

        startBtn.classList.add('animate');
        // 按钮动画延时，按钮动画结束后发生的事：换为正常状态（class中的animate去掉），开始按钮消失
        setTimeout(() => {
            startBtn.classList.remove('animate');
            startBtn.style.display = 'none';
        }, 700);
    }


    function startGame() {
        resetScoreAndTime();
        peep();
        setTimeout(() => {
            // TODO: 写当游戏时间结束后要发生的事
            startBtn.removeAttribute('style');
            startBtn.innerHTML = 'Replay';
            titleH1.innerHTML = 'Time Up!';
        }, gameTime)
    }

    /**
     * 初始化设置.
     */
    function resetScoreAndTime() {
        // TODO: 写游戏的初始化设置
        lastHole = null;
        timeUp = false;
        score = 0;
        gameTime = 10000;
        reGameTime = 10000;
        scoreBoard.innerHTML = score;
        titleH1.innerHTML = 'WHACK-A-MOLE!';
    }

    /**
     * 出洞.
     */
    function peep() {
        const time = randomTime(200, 1000);
        const hole = randomHole(holes);
        comeOutAndStop(hole, time);
    }

    /**
     * 随机生成地鼠出洞的停留时间. 该时间其实是[min, max]间的随机数.
     *
     * @param min 随机数的下界.
     * @param max 随机数的上界.
     * @returns {number}
     */
    function randomTime(min, max) {
        // 写生成随机数的逻辑，
        switch (arguments.length) {
            case 1:
                return parseInt(Math.random() * min + 1, 10);
                break;
            case 2:
                return parseInt(Math.random() * (max - min + 1) + min, 10);
                break;
            default:
                return 0;
                break;
        }
    }

    /**
     * 随机选择地鼠钻出的地洞，如果与上一个是相同地洞，则重新选择一个地洞.
     *
     * @param holes
     * @returns {*}
     */
    function randomHole(holes) {
        // TODO: 写地鼠随机选择钻出地洞的逻辑，如果与上一个是相同地洞，则重新选择一个地洞.
        var number = holes.length;
        var randomNum = Math.random() * number;
        var nowHole = parseInt(randomNum, 10); // 2
        while (nowHole == lastHole) {
            randomNum = Math.random() * number;;
            nowHole = parseInt(randomNum, 10);
        }
        lastHole = nowHole;
        return nowHole;
    }

    /**
     * 地鼠出洞并停留相应时间，如果游戏时间未结束(timeUp)，继续出洞(peep).
     *
     * @param hole 地鼠所出地洞.
     * @param time 地鼠停留时间.
     */
    function comeOutAndStop(hole, time) {
        // TODO: 写地鼠出洞并停留相应时间，如果游戏时间未结束(timeUp)，继续出洞(peep).
        if (!timeUp) {
            var which = holes[hole];
            var a = 10;
            console.log(reGameTime);
            which.classList.add('up');
            //console.log(hole+'出洞啦');
            setTimeout(() => {
                which.classList.remove('up');
                reGameTime -= time;
                console.log(gameTime);
                if (reGameTime <= 0) {
                    timeUp = true;
                } else {
                    peep();
                }
            }, time);
        }
    }

    /**
     * 打地鼠。为每个moles添加点击事件，点击后分数显示+1，地鼠入洞。
     */
    moles.forEach(function (mole, index) {
        mole.addEventListener('click', function () {
            holes[index].classList.remove('up');
            score++;
            scoreBoard.innerHTML = score;
            
        });
    });

};