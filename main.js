let game = document.querySelector('.gameDiv')
let lineDiv = document.querySelector('.line_div')
let line = document.querySelector('.line')
let lineChild = document.querySelector('.line_child')
let btnGo = document.querySelector('.btn_go')
let lose = document.querySelector('.lose_div')
let timer = document.querySelector('.nums_timer')
let pulya = document.querySelector('.pulya')
let fire = document.querySelector('.fire')
let duration = 5;
let radius = 0;
let recordSum = 0;

btnGo.addEventListener('click', () => {
    game.classList.remove('gameAnim')
    if (btnGo.textContent != 'Stoped it!') {
        // появление таймера

        timer.children[0].hidden = false;
        setTimeout(() => {
            timer.children[0].hidden = true;
        }, 1000)

        setTimeout(() => {
            timer.children[1].hidden = false;
        }, 1000)
        setTimeout(() => {
            timer.children[1].hidden = true;
        }, 2000)

        setTimeout(() => {
            timer.children[2].hidden = false;
        }, 2000)
        setTimeout(() => {
            timer.children[2].hidden = true;
        }, 3000)
        lose.hidden = true;
        setTimeout(() => {
            // работы с баттном 
            
            line.classList.add('anim');
            btnGo.textContent = 'Stoped it!';
            btnGo.classList.add('btn_stop')
            duration = 5;
            line.style.setProperty('animation-Duration', '5s')
            radius = 0;
            game.style.setProperty('border-Radius', '0%')
        }, 3000)

    } else if (btnGo.textContent == 'Stoped it!') {

        // проверка местоположения

        let lineStyle = window.getComputedStyle(line, null).getPropertyValue("transform");
        var values = lineStyle.split('(')[1].split(')')[0].split(',');
        var a = +values[0];
        var b = +values[1];
        var c = +values[2];
        var d = +values[3];

        let value;

        if (a > -0.707107 && b < -0.707107 && c > 0.707107 && d > -0.707107) {
            value = 'right';
        } else if (a > 0.707107 && b > -0.707107 && c < 0.707107 && d > 0.707107) {
            value = 'bottom';
        } else if (a < 0.707107 && b > 0.707107 && c < -0.707107 && d < 0.707107) {
            value = 'left';
        } else if (a < -0.707107 && b < 0.707107 && c > -0.707107 && d < -0.707107) {
            value = 'top';
        }

        // взятие стороны дива

        let prop = 'border-' + value;
        let gameDiv = window.getComputedStyle(game, null).getPropertyValue(prop);
        let divColor = gameDiv.split('').splice(gameDiv.indexOf('r'), gameDiv.length - 1).join('')
        let lineColor = window.getComputedStyle(line, null).getPropertyValue('background-color');
        let win;

        let colors = ['rgb(234, 64, 164)', 'rgb(255, 112, 0)', 'rgb(0, 255, 0)', 'rgb(58, 130, 238)'];
        function makeRandomArr(a, b) {
            return Math.random() - 0.5;
        }
        colors.sort(makeRandomArr);

        let level = document.querySelector('.level span')
        let record = document.querySelector('.best_result span')


        // эффект пули 

        pulya.hidden = false;
        fire.hidden = false;
        setTimeout(() => {
            fire.hidden = true;
        }, 150)
        setTimeout(() => {
            pulya.hidden = true
        }, 300)

        setTimeout(() => {
            if (divColor == lineColor) {
                win = true;

                // смена текста баттна
                level.textContent++;

                line.classList.add('anim');
                btnGo.textContent = 'Stoped it!';

                // получение рандомного цвета
                let rand = Math.floor(Math.random() * 4);
                game.style.setProperty('border-Color', colors.join(' '))


                // смена танка

                let tankImg = window.getComputedStyle(lineDiv, null).getPropertyValue('background-image').split('/')
                let gunImg = window.getComputedStyle(line, null).getPropertyValue('background-image').split('/')
                let tankColor;
                let tankArr = tankImg[tankImg.length - 1].split('-');
                let gunArr = gunImg[gunImg.length - 1].split('-');
                if (colors[rand] == 'rgb(58, 130, 238)') {
                    tankColor = 'blue'
                } else if (colors[rand] == 'rgb(234, 64, 164)') {
                    tankColor = 'purple'
                } else if (colors[rand] == 'rgb(0, 255, 0)') {
                    tankColor = 'green'
                } else {
                    tankColor = 'orange'
                }
                tankArr[0] = tankColor;
                gunArr[0] = tankColor;
                tankImg[tankImg.length - 1] = tankArr.join('-')
                gunImg[gunImg.length - 1] = gunArr.join('-')
                let resultTankColor = tankImg.join('/')
                let resultGunColor = gunImg.join('/')
                lineDiv.style.setProperty('background-image', resultTankColor)
                line.style.setProperty('background-image', resultGunColor)

                // смена скорости и круга

                line.style.setProperty('background-color', colors[rand])
                duration = duration / 1.2;
                radius = radius + 5;
                line.style.setProperty('animation-Duration', duration + 's')
                game.style.setProperty('border-Radius', radius + '%')

                // смени текста сверху
                if (+level.textContent >= 4) {
                    game.classList.add('animation')
                }
                if (+level.textContent >= 7) {
                    game.classList.remove('animation')
                    game.classList.add('animNoLinear')
                }
            } else {
                win = false;
                line.classList.remove('anim');
                btnGo.textContent = 'Again now!';
                game.classList.remove('animNoLinear')
                game.classList.remove('animation')
                btnGo.classList.remove('btn_stop')
                lose.hidden = false;


                let result = +level.textContent
                level.textContent = 0;
                if (result > recordSum) {
                    recordSum = result
                    record.textContent = recordSum;
                }
            }

        }, 180)
    }
})