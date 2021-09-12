//Create variables here
var food
var gameState="hungry"
var bedroomImg,gardenImg,washroomImg
function preload()
{
	//load images here
  dogHappy=loadImage("images/dogImg1.png")
  dogSad=loadImage("images/dogImg.png")
  bedroomImg=loadImage("images/Bed Room.png")
  gardenImg=loadImage("images/Garden.png")
  washroomImg=loadImage("images/Wash Room.png")
  spaceImg=loadImage("images/space.png")

}

function setup() {
	createCanvas(800, 700);
  database=firebase.database()
  database.ref('food').on("value", readPosition)

  dog= createSprite(700,400,50,50)
  dog.addImage(dogSad)
  dog.scale=0.2

  bathButton = createButton("I want to take a bath")
  bathButton.position(400,200)

  sleepButton = createButton("I am very sleepy")
  sleepButton.position(600,200)

  playButton = createButton("let's play")
  playButton.position(750,200)

  hungryButton = createButton("I am hungry")
  hungryButton.position(850,200)

  spaceButton = createButton("I want to go to space")
  spaceButton.position(950,200)

  milk1=new Food()
  milk1.getfeedTime()

  database.ref('gameState').on("value",(data)=>{
    gameState=data.val()
  })
}


function draw() {  
background(0)
  drawSprites();
  //add styles here
 text("feedtime:   "+milk1.feedtime, 200,50) 
 milk1.buttons()
milk1.milkImg()

bathButton.mousePressed(()=>{
  gameState = "bathing"
})

sleepButton.mousePressed(()=>{
  gameState = "sleeping"
})

playButton.mousePressed(()=>{
  gameState = "playing"
})

hungryButton.mousePressed(()=>{
  gameState = "hungry"
})

spaceButton.mousePressed(()=>{
  gameState = "space"
})

currentTime= hour() 
if(gameState==="playing"){
milk1.updateState ("playing")
milk1.garden()
}
else if(gameState==="sleeping"){
  milk1.updateState ("sleeping")
  milk1.bedRoom()

}

else if(gameState==="bathing"){
  milk1.updateState ("bathing")
  milk1.washRoom()

}

else if(gameState==="space"){
  milk1.updateState ("space")
  milk1.space()

}

else if(gameState==="hungry"){
  milk1.updateState ("hungry")
}

 if(gameState!=="hungry"){

  milk1.button1.hide()
  milk1.button2.hide()
  dog.remove()
}

else{

  milk1.button1.show()
  milk1.button2.show()
  dog.addImage(dogSad)
  dog.scale=0.2 
}


if(food===0){
  dog.addImage(dogHappy)
  dog.scale=0.2 
}



}

function readPosition(data){

  food= data.val()
}

function writeStock(data){
  database.ref('/').set({
    food:data,
    feedtime:hour()
  })
}
