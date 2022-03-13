function countdown() {
  // действующие элементы на странице
  const year = document.querySelector('#year');
  const days = document.querySelector('#days');
  const hours = document.querySelector('#hours');
  const minutes = document.querySelector('#minutes');

  //делаем расчеты:
  //дата текущего года
  const currentYear = new Date().getFullYear(); 

  //следующий год
  const nextYear = new Date(`January 01 ${currentYear + 1} 00:00:00`);
  
  year.innerHTML = currentYear + 1;

  function updateCunter() {
    //текущее время
    const currentTime = new Date();

    // сколько времени осталось до в миллисекундах
    const diff = nextYear - currentTime;

    //перевод в дни
    const daysLeft = Math.floor(diff / 1000 / 60 / 60 / 24);

    //перевод в часы
    const hoursLeft = Math.floor(diff / 1000 / 60 / 60) % 24;

    //перевод в минуты
    const minutesLeft = Math.floor(diff / 1000 / 60) % 60;

    //перевод в минуты
    const secondsLeft = Math.floor(diff / 1000) % 60;

    // Установка данных на страницу
  
    days.innerText = daysLeft < 10 ? '0' + daysLeft : daysLeft;
    hours.innerText = hoursLeft < 10 ? '0' + hoursLeft : hoursLeft;
    minutes.innerText = minutesLeft < 10 ? '0' + minutesLeft : minutesLeft ;
    seconds.innerText = secondsLeft <10 ? '0' + secondsLeft : secondsLeft;
  } 
  updateCunter()

  // запуск расчета каждую секунду
  setInterval(updateCunter, 1000)
}  

function counterLoading() {
  const timer = document.querySelector('#timer');
  const preloader = document.querySelector('#preloader');
  setTimeout(function () {
    preloader.remove();
    timer.style.display = 'flex';
 
  }, 1000);

}

counterLoading()
countdown()



//снегопад
$(document).ready(documentReady);

function documentReady() {
  var MAX_SNOW = 250;
  var MAX_SNOW_SIZE = 7;
  var MAX_SNOW_SPEED = 2;

  snowStart();

  function snowStart() {
    // console.log("// Snow animation start");
    createSnows();
  }

  function createSnows() {

    var container = $("#snow-animation-container");

    for (var i = 0; i < MAX_SNOW; i++) {
      var appendItem = getRandomItem(i);
              container.append(appendItem);
      var animateItem = $(".snow" + String(i));
      var randomTime = Math.random() * MAX_SNOW_SPEED;
      goAnimate(animateItem, i, randomTime);
      goAnimate2(animateItem);
    };

    // console.log("// Create snows");
  }

  function goAnimate(item, id, randomTime) {
    TweenMax.to(item, randomTime, {
      css: {
        marginTop: "+=100"
      },
      ease: Linear.easeNone,
      onComplete: function() {
        var topPosition = item.css("margin-top").replace("px", "");
        if (topPosition > $(window).height()) {
          changePosition(item);
          randomTime = Math.random() * MAX_SNOW_SPEED;
          goAnimate(item, id, randomTime);
        } else {
          goAnimate(item, id, randomTime);
        }

      }
    });
  }

  function goAnimate2(item) {

    var directionTime = 1 + Math.floor(Math.random() * 5);
    var randomDirection = 1 + Math.floor(Math.random() * 4);
    var delayTime = 1 + Math.floor(Math.random() * 3);

    if (randomDirection == 1) {

      TweenMax.to(item, directionTime, {
        css: {
          marginLeft: "+=100"
        },
        ease: Linear.easeOut,
        onComplete: function() {

          TweenMax.to(item, directionTime, {
            css: {
              marginLeft: "-=100"
            },
            delay: delayTime,
            ease: Linear.easeOut,
            onComplete: function() {
              goAnimate2(item);
            }
          });
        }
      });
    } else if (randomDirection == 2) {

      TweenMax.to(item, directionTime, {
        css: {
          marginLeft: "-=100"
        },
        ease: Linear.easeOut,
        onComplete: function() {
          TweenMax.to(item, directionTime, {
            css: {
              marginLeft: "+=100"
            },
            delay: delayTime,
            ease: Linear.easeOut,
            onComplete: function() {

              goAnimate2(item);

            }
          });
        }
      });
    } else if (randomDirection == 3) {

      TweenMax.to(item, directionTime, {
        css: {
          marginLeft: "+=100"
        },
        ease: Linear.easeOut,
        onComplete: function() {
          goAnimate2(item);
        }
      });
    } else if (randomDirection == 4) {

      TweenMax.to(item, directionTime, {
        css: {
          marginLeft: "-=100"
        },
        ease: Linear.easeOut,
        onComplete: function() {
          goAnimate2(item);
        }
      });
    }
  }

  function changePosition(item) {
    var _width = Math.floor(Math.random() * MAX_SNOW_SIZE);
    var _height = _width;
    var _blur = Math.floor(Math.random() * 5 + 2);
    var _left = Math.floor(Math.random() * ($(window).width() - _width));
    var _top = -$(window).height() + Math.floor(Math.random() * ($(window).height() - _height));

    item.css("width", _width);
    item.css("height", _height);
    item.css("margin-left", _left);
    item.css("margin-top", _top);
    item.css("-webkit-filter", "blur(" + String(_blur) + "px)");
    item.css("-moz-filter", "blur(" + String(_blur) + "px)");
    item.css("-o-filter", "blur(" + String(_blur) + "px)");
    item.css("-ms-filter", "blur(" + String(_blur) + "px)");
    item.css("filter", "blur(" + String(_blur) + "px)");
  }

  function getRandomItem(id) {
    var _width = Math.floor(Math.random() * MAX_SNOW_SIZE);
    var _height = _width;
    var _blur = Math.floor(Math.random() * 5 + 2);
    var _left = Math.floor(Math.random() * ($(window).width() - _width));
    var _top = -$(window).height() + Math.floor(Math.random() * ($(window).height() - _height));
    var _id = id;

    return getSmallSnow(_width, _height, _blur, _left, _top, _id);
  }

  function getSmallSnow(width, height, blur, left, top, id) {
    var item = "<div class='snow" + id + "' style='position:absolute; margin-left: " + left + "px; margin-top: " + top + "px; width: " + width + "px; height: " + height + "px; border-radius: 50%; background-color: white; -webkit-filter: blur(" + blur + "px); -moz-filter: blur(" + blur + "px); -o-filter: blur(" + blur + "px); -ms-filter: blur(" + blur + "px); filter: blur(" + blur + "px);'></div>"
    return item;
  }

}