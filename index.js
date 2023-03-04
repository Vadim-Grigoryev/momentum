import playList from './playlist.js'

const time=document.querySelector('.time')
const day=document.querySelector('.date')


function showDate() {
    const date= new Date()
    let options= { weekday: 'long', month: 'long', day: 'numeric' }
    const currentDay1= date.toLocaleDateString('ru-RU', options)
    const currentDay2= date.toLocaleDateString('en-US', options)
    day.textContent= currentDay1+' / '+currentDay2
    }

 const date= new Date()
 const hours= date.getHours()
 
 let timeOfDay;
 function getTimeOfDay() {
     const date= new Date()
     const hours= date.getHours()
     if (hours>=0 && hours<6) {
         timeOfDay='night'
     }
     else if (hours>=6 &&hours<12) {
         timeOfDay='morning'
     }
     else if (hours>=12 &&hours<18) {
         timeOfDay='afternoon'
     }
     else timeOfDay='evening' 
    return timeOfDay
  }
  
 function showGreeting () {
 const greeting= document.querySelector('.greeting')
 if (timeOfDay==='night') {
    greeting.textContent= 'Good night/Доброй ночи/Дабранач'
 }
else if (timeOfDay==='morning') {
    greeting.textContent= 'Good morning / Доброе утро / Добрай раніцы'
}
else if (timeOfDay==='afternoon') {
    greeting.textContent= 'Good afternoon / Добрый день / Добры дзень'
}
else if (timeOfDay==='evening') {
    greeting.textContent= 'Good evening / Добрый вечер / Добры вечар'
}
}

 function setLocalStorage() {
    const name=document.querySelector('.name')
    localStorage.setItem('name', name.value);
   }
  window.addEventListener('beforeunload', setLocalStorage)

  function getLocalStorage() {
    const name=document.querySelector('.name')
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
  }
  window.addEventListener('load', getLocalStorage)
   
function showTime() {
    showDate()
    getTimeOfDay()
    showGreeting ()
    const date= new Date()
    const currentTime=date.toLocaleTimeString()
    time.textContent=currentTime
    setTimeout(showTime, 1000)
    }
 showTime(); 
 
 const body=document.querySelector('.body')
 
 let bgNum;
 let randomNum;
 
 const getRandomNum=()=> {
     randomNum=Math.round((Math.random()*20))
    if (randomNum===0) { 
        randomNum=Math.round((Math.random()*20));
    }    
    return randomNum
  }
 getRandomNum()

const slidePrev= document.querySelector('.slide-prev')
const slideNext= document.querySelector('.slide-next')

const getSlidePrev=()=>{
    if (randomNum>=2 &&randomNum<=20) {
        randomNum=randomNum-1
    } else if (randomNum===1){
        randomNum=20
    }
    return randomNum
}

slidePrev.addEventListener('click', getSlidePrev)

const getSlideNext=()=>{
    if (randomNum>=1 &&randomNum<20) {
        randomNum=randomNum+1
    } else if (randomNum===20){
        randomNum=1
    }
    return randomNum
 }
 
 slideNext.addEventListener('click', getSlideNext)

 const setBg=() => {
   let b=String(randomNum) 
   bgNum=b.padStart(2, '0') 
   const img = new Image() 
   img.src = `https://raw.githubusercontent.com/Vadim-Grigoryev/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`
   img.onload = () => { 
   body.style.backgroundImage = `url('https://raw.githubusercontent.com/Vadim-Grigoryev/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg')`
    setTimeout(setBg, 1000)
}
} 
 setBg()


 const weatherIcon = document.querySelector('.weather-icon');
 const temperature = document.querySelector('.temperature');
 const wind= document.querySelector('.wind')
 const humidity= document.querySelector('.humidity')
 const weatherDescription = document.querySelector('.weather-description');
 const city= document.querySelector('.city')
 
 function myCity () {
    localStorage.setItem('city', city.value)
 }
 
 city.addEventListener('change', myCity)

 function weatherCity () {
     if(localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
    }
    else {
        city.value='Могилёв'
        }
   }

window.addEventListener('load', weatherCity)
async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
    const res = await fetch(url);
    if (res.ok==true) {
    const data = await res.json(); 
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent= `Wind speed / Скорость ветра: ${Math.round(data.wind.speed)} m/s`
    humidity.textContent=`Humidity / Влажность: ${Math.round(data.main.humidity)} %`
    }
    else alert('Введите корректное значение')
}
 city.addEventListener('change', getWeather)
 window.addEventListener('load', getWeather)
 
const quotePlace= document.querySelector('.quote')
const authorName= document.querySelector('.author')
const changeBtn= document.querySelector('.change-quote')

 async function getQuotes() {  
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
    let a= Math.round(Math.random()*(data.length-1))
    quotePlace.textContent= data[a].text
    authorName.textContent= data[a].author 
    }
 window.addEventListener('load', getQuotes);
 changeBtn.addEventListener('click', getQuotes)

 let isPlay = false;
 const playStop = document.querySelector('.play')
 const playStop1 =document.querySelector('.playpausebtn') 
 
 const audio = new Audio();
 let playNum=0;
 const playPrevBtn= document.querySelector('.play-prev') 
 const playNextBtn= document.querySelector('.play-next')

 function playPrev() {
    if (playNum>0 && playNum<playList.length) {
        playNum=playNum-1
        audio.src=playList[playNum].src
        audio.play()
    }
    else if (playNum==0) {
        playNum=3
        audio.src=playList[playNum].src
        audio.play()
    }
}
   
playPrevBtn.addEventListener('click', playPrev)

function playNext() {
    if (playNum>=0 &&playNum<playList.length-1) {
        playNum=playNum+1
        audio.src=playList[playNum].src
        audio.play()
    }
    else if (playNum==3) {
        playNum=0
        audio.src=playList[playNum].src
        audio.play()
    }
}

playNextBtn.addEventListener('click', playNext)
audio.addEventListener('ended', playNext)
let playTime=0
audio.addEventListener('timeupdate', ()=> {playTime=audio.currentTime})

 function playAudio () {
    if(isPlay==false&&audio.paused==false) {
        isPlay=true
    audio.src=playList[playNum].src
    audio.currentTime=0
    audio.play()
    playStop.classList.toggle('pause')
    playStop1.classList.toggle('pause')
    }
   else if (isPlay==true) {
    audio.pause()
    isPlay=false
    playStop.classList.toggle('pause')
    playStop1.classList.toggle('pause')
   }
   else if (isPlay==false&&audio.paused==true) {
    isPlay=true
    audio.src=playList[playNum].src
    audio.currentTime=playTime
    audio.play()
    playStop.classList.toggle('pause')
    playStop1.classList.toggle('pause')
    }
}

playStop.addEventListener('click', playAudio)
playStop1.addEventListener('click', playAudio)

const playListContainer = document.querySelector('.play-list')

playList.forEach((element)=> {
    const li=document.createElement('li')
    li.classList.add('play-item')
    li.textContent= element.title
    playListContainer.append(li)
   })

const timeProgress=document.querySelector('.timeprogress') 
const allTime = document.querySelector('.alltime')
const songName = document.querySelector('.songname')
  
 
const liArr=document.querySelectorAll('.play-item')

const markSongs=()=>{
liArr.forEach((element,index)=>{
    if (index==playNum) {
    element.classList.add('colorMark')
    } else element.classList.remove('colorMark')
}) }
audio.addEventListener('timeupdate', markSongs)

const progressLine= document.querySelector('.progress')
audio.addEventListener('timeupdate', ()=>{
progressLine.style.width=`${(audio.currentTime/audio.duration)*100}%`
timeProgress.textContent=`${(Math.round((audio.currentTime)*10))/10}`
allTime.textContent=`${(Math.round((audio.duration)*10))/10}`
songName.textContent= `${(playList[playNum].title)}`
})

const progressLineInnerContainer=document.querySelector('.progresslineinnercontainer')

const showTotalLength=(event) => {
    audio.pause()
    playTime=`${(event.offsetX/195)*audio.duration}`
    playAudio ()
    playAudio ()
    }

progressLineInnerContainer.addEventListener('click', showTotalLength)
 