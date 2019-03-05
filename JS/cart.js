var cartForItems = {}; // create a CART - OBJECT for ITEMS(doors). click a button to place an item to it
var priceCollector = {}; //an object to store resuslt  of json file parse
var totalPrice = 0; // var to store cost of all items


window.onload = function(){
checkCart();
showItemsInCart();
setItemsInContent();
};//_______________onload

function setItemsInContent(){
//function loads doors to div class="contentForMain"
var xmlhttp = new XMLHttpRequest();
xmlhttp.open('GET', 'items.json', true);
xmlhttp.onreadystatechange = function(){
if (this.readyState == 4 && this.status == 200) {
var collectionItems = JSON.parse(this.responseText); //___________________!!!!
priceCollector = collectionItems;
console.log(collectionItems);
showChosenItems(); // function to show all chosen doors
};
};
xmlhttp.send();

  function showChosenItems(){
    // function to show all chosen doors in a DIV
  if(isEmpty(cartForItems)){
    document.querySelector('.item').innerHTML = '<div class="emptyCart">Корзина пуста. <a href="items.html">Выбрать товары</a></div>';
  }else{
  var chosenItem = '';
  for(var ref in cartForItems){
    chosenItem +='<p>' + '<button class="deleteItem" data-ref=' + ref + '>x</button>';
    chosenItem +='<span>' + priceCollector[ref].name +'</span>';
    chosenItem += '<img class="imgItem" src="'+ priceCollector[ref].picture +'">';
    chosenItem += 'количество: ' + '<button class="removeItem" data-ref='+ ref +'>' + ' - ' + '</button>' + cartForItems[ref] + '<button class="addItem" data-ref='+ ref +'>' + ' + ' + '</button>' + '<br>';
    chosenItem +=  'цена единицы: '+ priceCollector[ref].price + ' ' + 'стоимость всего: ' + (priceCollector[ref].price) * (cartForItems[ref]) + '</p>';
  }
  // insert all chosen doors in a DIV
  document.querySelector('.item').innerHTML = chosenItem;
    //sets an event for BUTTONS "+"
   var buttonPlusItemCollection = document.querySelectorAll('.addItem');
    for (var i = 0; i < buttonPlusItemCollection.length; i++) {
      buttonPlusItemCollection[i]. addEventListener('click', plusItem);
    }
    function plusItem(){
    var numItem = this.getAttribute('data-ref');
      cartForItems[numItem] = cartForItems[numItem] + 1;
      totalPrice = totalPrice + priceCollector[numItem].price;
        console.log(this);
        console.log(cartForItems);
        showItemsInCart();
        showChosenItems();
        setItemToLocalStorage();
    }
    //sets an event for BUTTONS "-"
   var buttonPlusItemCollection = document.querySelectorAll('.removeItem');
    for (var i = 0; i < buttonPlusItemCollection.length; i++) {
      buttonPlusItemCollection[i]. addEventListener('click', removeItem);
    }
    function removeItem(){
    var numItem = this.getAttribute('data-ref');
    if(cartForItems[numItem] > 1){
      cartForItems[numItem] = cartForItems[numItem] - 1;
      totalPrice = totalPrice - priceCollector[numItem].price;
    }else{
      totalPrice = totalPrice - priceCollector[numItem].price;
      delete cartForItems[numItem];
    }
        console.log(this);
        console.log(cartForItems);
        showItemsInCart();
        showChosenItems();
        setItemToLocalStorage();
    }
    //sets an event for BUTTONS "x" - delete
   var buttonPlusItemCollection = document.querySelectorAll('.deleteItem');
    for (var i = 0; i < buttonPlusItemCollection.length; i++) {
      buttonPlusItemCollection[i]. addEventListener('click', delItem);
    }
    function delItem(){
    var numItem = this.getAttribute('data-ref');
    totalPrice  = totalPrice - (cartForItems[numItem]*priceCollector[numItem].price);
    delete cartForItems[numItem];
        console.log(this);
        console.log(cartForItems);
        console.log(totalPrice);
        showItemsInCart();
        showChosenItems();
        setItemToLocalStorage();
    }
    };
    function isEmpty(inspectedObj){
      //function checks if there is no items in obj 'cartForItems'
      for(var val in inspectedObj){
        return false;
      }
      return true;
    };
  };
};



function checkCart(){
  //function to check if LOCAL STORAGE contains some items(doors) and total price of items
  // if it has some, if  it is not empty - when add it to cartForItems and variable totalPrice
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
  //then paste it to div class="cart"
  var itemsAmount = 0;
  //var out = '';
    for(var refItem in cartForItems){
      itemsAmount += cartForItems[refItem];
      // out += priceCollector[refItem].price;
      //document.querySelector('.item p').innerHTML = priceCollector[refItem].price;
    }
    document.querySelector('.cart span+span').innerHTML = itemsAmount;
    document.querySelector('.leftSide .priceCart').innerHTML =  totalPrice;
    console.log('total amount: ' + itemsAmount);
    //console.dir( priceCollector);
};

function setItemToLocalStorage(){
  //function puts items to LOCAL STORAGE
  localStorage.setItem('addedToCartItems', JSON.stringify(cartForItems));
  localStorage.setItem('addedTotalPrice', JSON.stringify(totalPrice));
};

sendButton.addEventListener('click', function(){
  // func to call MODAL WINDOW to Order Items
  var sendForm = document.querySelector('#modWindowOrder');
  sendForm.style.display = 'block';
});

orderButton.addEventListener('click', makeOrder);
  // func to send ordered Items to server -- put to TXT FILE 'apps.txt'
function makeOrder(){
  var formN = document.querySelector('form');
  formN.onsubmit = function(event){
    event.preventDefault();
  }

  var inputName = document.querySelector('#inp1').value; //takes user name
  var inputPhone = document.querySelector('#inp2').value; // takes user phone
  var doorOrdered = JSON.stringify(cartForItems); // make a string

  var reqstOrder = new XMLHttpRequest;
  reqstOrder.onload = function(){
  var responsServ = document.querySelector('form p');
  responsServ.innerHTML = "Ваша заявка прията, ожидайте звонок...";
  console.log('sent!');
  };
  reqstOrder.open('POST', 'order.php', true);
  reqstOrder.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  reqstOrder.send('userName=' + inputName +'&userPhone='+inputPhone+'&items='+doorOrdered);
};
