//Create variables here
var dog, happydog;
var database;
var foodS;
var foodStock;
var lastFed;

function preload()
{
  DogImg1 = loadImage("images/dogImg.png");
  DogImg2 = loadImage("images/dogImg1.png");
  MilkImg = loadImage("images/Milk.png");
}

function setup() {
  createCanvas(800, 550);

  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  Dog = createSprite(475,250,50,50);
  Dog.addImage(DogImg1);
  Dog.scale = 0.2;

  feed = createButton("Feed Drago");
  feed.position(900,250);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(900,300);
  addFood.mousePressed(addFoods);

  var input =createInput("Name of your Pet");
  input.position(500,100);

var button = createButton('Play');
  button.position(700,100);

  var greeting =createElement('h3');
  button.mousePressed(function(){
  var name =input.value();

  input.hide();
  button.hide();

      greeting.html("Its eating time "+ name + "!");
      greeting.position(600,450);

  });

}


function draw() {
  background(31, 196, 118);
  foodObj.display();

  fedTime=database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
   
  drawSprites();

  fill(206, 0, 9);
  noStroke();
  textSize(30);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM", 380,140);
   }else if(lastFed==0){
     text("Last Fed : 12 AM",380,140);
   }else{
     text("Last Fed : "+ lastFed + " AM", 380,140);
   }

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  Dog.addImage(DogImg2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  Dog.addImage(DogImg1);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
