
var cartForItems = {}; // create a CART - OBJECT for ITEMS(doors). click a button to place an item to it
var priceCollector = {}; //an object to store resuslt  of json file parse
var totalPrice = 0; // var to store cost of all items


window.onload = function(){
checkCart();
showItemsInCart();
};//_______________onload



function checkCart(){
  //function to check if LOCAL STORAGE contains some items(doors) and total price of items
  // if it has some - when add it to cartForItems and variable totalPrice
  if(localStorage.addedToCartItems !=null){
    cartForItems = JSON.parse(localStorage.getItem('addedToCartItems'));
  }
  if(localStorage.addedTotalPrice !=null){
    totalPrice = JSON.parse(localStorage.getItem('addedTotalPrice'));
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
