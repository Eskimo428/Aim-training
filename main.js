window.addEventListener('DOMContentLoaded', () => {

    const startBtn = document.querySelector('#start')
    const screens = document.querySelectorAll('.screen')
    const timeList = document.querySelector('#time-list')
    let time = 0
    const timeEl = document.querySelector('#time')
    const board = document.querySelector('#board')
    let score = 0
    const colors = ['#CD5C5C', '#FF0000', '#FF69B4', '#C71585', '#FFA500', '#FFFF00', '#F0E68C', '#EE82EE', '#FF00FF', '#00FF00', '#006400', '#008080', '#00008B', '#800000', '#808000',]
    let circle
    let reset = document.querySelector('#reset')
    let scoreString
    let intervalId

    startBtn.addEventListener('click', (event) => {
        event.preventDefault()
        screens[0].classList.add('up')
    })

    timeList.addEventListener('click', event => {
        if (event.target.classList.contains('time-btn')) {
            time = parseInt(event.target.getAttribute('data-time'))
            screens[1].classList.add('up')
            startGame()
            setColor(circle)
        }
    })

    board.addEventListener('click', event => {
        if (event.target.classList.contains('circle')) {
            score++
            event.target.remove()
            createRandomCircle()
            setColor(circle)
        }
    })

    reset.addEventListener('click', (event) => {
        event.preventDefault()
        startOver()
    })

    function startOver() {
        time = setTime()
        score = 0
        timeEl.parentNode.classList.remove('hide')
        reset.classList.remove('reset-active')
        screens[1].classList.remove('up');
        screens[0].classList.add('up');
        scoreString = ''
        board.innerHTML = ''
        clearInterval(intervalId)
       
    }

    function getRandomColor() {
        const index = Math.floor(Math.random() * colors.length)
        return colors[index]
    }

    function setColor(element) {
        const color = getRandomColor()
        console.log(color)
        element.style.background = color
        element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
    }


    function startGame() {
        intervalId = setInterval(decreaseTime, 1000)
        createRandomCircle()
        setTime(time)
    }




    function decreaseTime() {
        if (time === 0) {
            finishGame()          
        }
        else {
            let current = --time
            if (current < 10) {
                current = `0${current}`
            }
            setTime(current)
        }
      
    }
 
    function setTime(value) {
        timeEl.innerHTML = `00:${value}`
    }

    function finishGame() {
        timeEl.parentNode.classList.add('hide')
        if (score > 1 && score <= 4 || score > 21 && score <= 24 || score > 31 && score <= 34 || score > 41 && score <= 44 || score > 51 && score <= 54|| score > 61 && score <= 64) {
            scoreString = 'очка';
        } else if (score >= 5 && score <= 20 || score >= 25 && score <= 30 || score >= 35 && score <= 40| score >= 45 && score <= 50| score >= 55 && score <= 60) {
            scoreString = 'очков';
        }
         else if (score === 1 || score === 21 || score === 31|| score === 41 || score === 51 || score === 61) {
            scoreString = 'очко';
        }
         else if (score === 0) {
            scoreString = 'очков';
        }
        board.innerHTML = `<h1> Вы набрали: <span class="primary"> ${score} ${scoreString}</span></h1>`
        board.after(reset)
        reset.classList.add('reset-active')
        
    }

    function createRandomCircle() {
        circle = document.createElement('div')
        const size = getRandomNumber(10, 60)
        const { width, height } = board.getBoundingClientRect()
        const x = getRandomNumber(0, width - size)
        const y = getRandomNumber(0, height - size)


        circle.classList.add('circle')
        circle.style.width = `${size}px`
        circle.style.height = `${size}px`
        circle.style.top = `${y}px`
        circle.style.left = `${x}px`

        board.append(circle)
    }

    function getRandomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min)
    }
});

