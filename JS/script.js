
//topMenu --appears then clicked
document.querySelector('.topMenu').addEventListener('click', function(){
  var drpdwnMenu = document.querySelector('.dropMenu');
  drpdwnMenu.hidden = !drpdwnMenu.hidden;
});

//loginButton --

logIn.addEventListener('click', function(event){
  var pressedButton = event.target;
  var atr = pressedButton.getAttribute('data-modal');
  if(!atr)
    return;
    document.getElementById(atr).style.display = 'block';
    });
//CALL CONSULTANT  modal window --
    document.querySelector('.rightSide').addEventListener('click', function(){
      document.getElementById('modWindowConsult').style.display = 'block';
    });

//banners

var banner = ['<a href="https://www.salomon.com/ru/" target="_blank"><img src="Banners/1.png"></a>',
'<a href="#" target="_blank"><img src="Banners/ads.png"></a>',
'<a href="#" target="_blank"><img src="Banners/ads2.png"></a>'];
// var rand = Math.trunc(Math.random() * (banner.length - 0) + 0);
var rand = Math.floor(Math.random() * (banner.length - 0) + 0);
//Math.trunc dosen't work with IE11 -- need some to replace
// var rand = 2;
var setBanner = document.querySelector('.banners');
setBanner.insertAdjacentHTML('afterBegin', banner[rand]);

setInterval(function(){
  // var rand = Math.trunc(Math.random() * (banner.length - 0) + 0);
  var rand = Math.floor(Math.random() * (banner.length - 0) + 0);
  banner2.innerHTML = banner[rand];
}, 2000);

// SLIDER
var slideNum = 1;
runSlide(slideNum);

//event for SLIDER
document.querySelector('.nextSlide').addEventListener('click', getNextSlide);
document.querySelector('.previousSlide').addEventListener('click',getPrevSlide);



//functions for SLIDER buttons
function getPrevSlide(){
  runSlide(slideNum = slideNum - 1);
  }
function getNextSlide(){
  runSlide(slideNum = slideNum + 1);
  }
//function for DOTS to show img
function showSlide(x){
  runSlide(slideNum = x);
}

function runSlide(x){
  var i;
  var slidesCollection = document.querySelectorAll('.slides');
  var dotsCollection = document.querySelectorAll('.dots');
if(x > slidesCollection.length){
  slideNum = 1;
}
if(x < 1){
  slideNum = slidesCollection.length;
}
  for(i = 0; i < slidesCollection.length; i ++){
    slidesCollection[i].style.display = "none";
  }

  for(i = 0; i <  dotsCollection.length; i++){
    dotsCollection[i].className = dotsCollection[i].className.replace(" active", "");
  }

  slidesCollection[slideNum - 1].style.display = "block";
  dotsCollection[slideNum - 1].className += " active";
};
