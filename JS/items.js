
var cartForItems = {}; // create a CART - OBJECT for ITEMS(doors). click a button to place an item to it
var priceCollector = {}; //an object to store resuslt  of json file parse
var totalPrice = 0; // var to store cost of all items


window.onload = function(){
setItemsInContent();
checkCart();
showItemsInCart();
};//_______________onload

function setItemsInContent(){
//function loads doors to div class="contentForMain"
var xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', 'items.json', true);
xmlhttp.onreadystatechange = function(){
  if (this.readyState == 4 && this.status == 200) {
  var collectionItems = JSON.parse(this.responseText); //___________________!!!!
  priceCollector = collectionItems;
  var item = '';
    for(var propName in collectionItems){
    item += '<section class="dItem">' + '<h4>' + collectionItems[propName]['name'] + '</h4>';
    item += '<p>Цена: ' + collectionItems[propName]['price'] + ' грн.</p>';
    item += '<img src="'+ collectionItems[propName]['picture'] + '"height="142">';
    item += '<button class="addItemToCart"  data-button-propName="'+ propName + '">Добавить в корзину</button>' + '</section>'; //уникальность кнопки "купить" - добавление атрибута конкретного товара. Добавить событие JS для последующей передачи в корзину
    }
  var insertContent = document.querySelector('.contentForMain');
  insertContent.innerHTML = item;
  var colBut= document.querySelectorAll('.addItemToCart');// add JS EVENTS for BUTTONS to put items to cart
    for (var i = 0; i < colBut.length; i++) {
    colBut[i].addEventListener('click', addToCart);//________________add Event for a button_____________________________
    };
    console.log(item);
  };
};
xmlhttp.send();
};

function addToCart(){
//the function to add chosen door to a cart
//and put it to a LOCAL STORAGE
var chosenItem = this.getAttribute('data-button-propName'); // chosen item is an unique item, chosen with a button click and added to CARTFORITEMS object
  if(cartForItems[chosenItem] != undefined){
  cartForItems[chosenItem] = cartForItems[chosenItem]+1;
    }else{
  cartForItems[chosenItem] = 1;
  }
  totalPrice += priceCollector[chosenItem].price;
localStorage.setItem('addedToCartItems', JSON.stringify(cartForItems));
localStorage.setItem('addedTotalPrice', JSON.stringify(totalPrice));
console.log(cartForItems[chosenItem]);
console.log(totalPrice);
showItemsInCart();
renderDiv();
};

//render popup then clicked the button купить
  function renderDiv(){
    newDiv = document.createElement('div');
    var newDiv2 = document.createElement('div');
    // var newP = document.createElement('p');
    newDiv.classList.add('popup');
    newDiv2.classList.add('popup-inner');
    newDiv2.innerHTML += '<h3>' + "Товар добавлен в корзину" + '</h3>';
    newDiv2.innerHTML += '<p>' +'Продолжить покупки'+ '</p>';
    newDiv2.innerHTML += '<p>' + '<a href="cart.html"> Перейти в корзину ' + '</a>' + '</p>';
    // htmlEl.appendChild(newDiv);
    document.body.appendChild(newDiv);
    newDiv.appendChild(newDiv2);
    newDiv.addEventListener('click', function(){
      document.body.removeChild(newDiv);
    })
  };

function checkCart(){
  //function to check if LOCAL STORAGE contains some items(doors) and total price of items
  // if it has some - when add it to cartForItems and variable totalPrice
  if(localStorage.addedToCartItems !=null){
    cartForItems = JSON.parse(localStorage.getItem('addedToCartItems'));
    //console.dir(cartForItems);
  }
  if(localStorage.addedTotalPrice !=null){
    totalPrice = JSON.parse(localStorage.getItem('addedTotalPrice'));
    //console.dir(cartForItems);
  }
};

function showItemsInCart(){
  //function that runs through "cartForItems", summs an amount of items
  //then paste it to div class="miniCart" and "cart"
  var itemsAmount = 0;
    for(var refItem in cartForItems){
      itemsAmount += cartForItems[refItem];
    }
    document.querySelector('.miniCart p').innerHTML = 'товаров: ' + itemsAmount;
    document.querySelector('.miniCart p+p').innerHTML = 'на сумму: ' + totalPrice;
    document.querySelector('.cart span+span').innerHTML =  itemsAmount;
    document.querySelector('.leftSide .priceCart').innerHTML =  totalPrice;


    console.log('total amount: ' + itemsAmount);
};
