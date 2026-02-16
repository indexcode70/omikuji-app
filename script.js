// 1.データのリスト(配列)を作る
const results = ["大吉","中吉","小吉","吉","末吉","凶"];

const soundsDaikiti = new Audio('sounds/koto.mp3');
const soundsNormal = new Audio('sounds/taiko.mp3')

//2.HTMLの部品を捕まえる(ゲットエレメントバイアイディー)
const button = document.getElementById('draw-button');
const resultArea = document.getElementById('result-area');

//3.ボタンがクリックされた時の動きを決める
button.addEventListener('click', () => {

    // ボタン連打の対策
    button.disabled = true; // ボタンを押せなくする
    button.style.cursor = "not-allowed"; // カーソルを禁止マークに
    
    // 連打対策(前回の音を止める)音源を一度止めて最初に戻す
    soundsDaikiti.pause();
    soundsDaikiti.currentTime = 0;
    soundsNormal.pause();
    soundsNormal.currentTime = 0;

    // 出席番号をランダムで作る(0~5の整数)
    const randomIndex = Math.floor(Math.random() * results.length);

    // 選ばれた結果を取り出す
    const finalResult = results[randomIndex];

    // 画面に表示する
    resultArea.innerHTML = finalResult;

    // ちょっとした演出、文字の色を変えてみる
    resultArea.style.color = finalResult === "大吉" ? "#e74c3c" : "#333";

    // 音の分岐
    if (finalResult === "大吉") {
        soundsDaikiti.play(); // 大吉の音を鳴らす

    // 桜を降らせる関数を呼び出す
    createSakuraStorm();

    // 大吉の時は3秒間ボタンを無効化
    setTimeout(() => {
        button.disabled = false;
        button.style.cursor = "pointer";
    }, 3000);

    } else {
        soundsNormal.play();   // それ以外の時の音を鳴らす

        // 通常は1秒後にまた押せるようにする
            setTimeout(() => {
                button.disabled = false;
                button.style.cursor = "pointer";
            }, 1000);
    }

});


// 桜吹雪を作る関数
function createSakuraStorm() {
    for (let i = 0; i < 150; i++) {     //  150枚降らせる

        // setTimeoutを使って、 １枚毎に発生タイミングをずらす
        setTimeout(() => {
        const petal = document.createElement('div');
        petal.classList.add('sakura-petal');

        // 出現位置をランダムに
        petal.style.left = (Math.random() * 100) + 'vw';
        // 大きさをランダムに
        const size = (Math.random() * 10 + 10) + 'px';
        petal.style.width = size;
        petal.style.height = size;
        // 落ちる速度をランダムに(4~8秒)
        petal.style.animationDuration = (Math.random() * 4 + 4) + 's';
        // 振り始めるタイミングをバラバラにする
        petal.style.animationDelay = (Math.random() * 2) + 's';
        // 遠近感を出す
        petal.style.opacity = Math.random() * 0.7 + 0.3;  // 0.3(薄い)~1.0(濃い)の間でランダムに

        document.body.appendChild(petal);

        // アニメーションが終わったら要素を消す(メモリ節約)
        setTimeout(() => {
            petal.remove();
        }, 10000);
         
        }, i * 20);  // 20ミリ秒(0.02秒)ずつずらして発生させる合計(150枚×0.02秒=)3秒間降り続ける
    }
}
