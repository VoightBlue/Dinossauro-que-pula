var trex, trex_running, edges;
var groundImage;
var ground
var ground2
var nuvens
var nuvensimg
var cacto
var cactoimg1
var cactoimg2
var cactoimg3
var cactoimg4
var cactoimg5
var cactoimg6
var score = 0
var cactogroup
var nuvemgroup
var PLAY = 1
var END = 0 
var gamestate = PLAY
var trexMorto
var gameOver
var gameOverpng
var restart
var restartpng
var jump
var die
var checkpoint

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png")
  nuvensimg = loadImage("cloud (1).png")
 cactoimg1 = loadImage ("obstacle1.png")
 cactoimg2 = loadImage ("obstacle2.png")
 cactoimg3 = loadImage ("obstacle3.png")
 cactoimg4 = loadImage ("obstacle4.png")
 cactoimg5 = loadImage ("obstacle5.png")
 cactoimg6 = loadImage ("obstacle6.png")
trexMorto = loadAnimation ("trex_collided.png")
gameOverpng = loadImage ("gameOver.png")
restartpng = loadImage ("restart.png")
jump = loadSound("jump.mp3")
die = loadSound("die.mp3")
checkpoint = loadSound("checkpoint.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
 
cactogroup = new Group ()
nuvemgroup = new Group ()

  //criando o trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("die", trexMorto)
  edges = createEdgeSprites();

gameOver = createSprite(width/2,140)
restart = createSprite(width/2,100)
gameOver.addImage(gameOverpng)
restart.addImage(restartpng)
restart.scale = 0.5 
gameOver.scale = 2.0

trex.debug = false
trex.setCollider("circle",0,0,40)

  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50

  ground = createSprite(200, 180, 400, 20)
  ground.addImage(groundImage)

  ground2 = createSprite(200, 200,400,20) 
  ground2.visible = false

 
  
}


function draw() {
  //definir a cor do plano de fundo 
  background("white");
  text("Score: "+score,width-100,50)
  

if (gamestate == PLAY ){
  gameOver.visible = false
  restart.visible = false
  ground.velocityX = -(2+score/100)
  score = score+Math.round(getFrameRate() / 60)
  if (ground.x < 0) {
    ground.x = ground.width / 2
  }
    if (touches.length>0||keyDown("space")&& trex.y >=147 ) {
      trex.velocityY = -10;
      jump.play()
    }

  gerarNuvens()
  trex.velocityY = trex.velocityY + 0.5;
  gerarCactos()
 
  if (cactogroup.isTouching(trex)){
    gamestate = END
    die.play()
  }

if (score>0 && score%100==0){
  checkpoint.play()
}



}
else if (gamestate == END){
 gameOver.visible = true
 restart.visible = true
  trex.velocityY = 0
 ground.velocityX = 0   
  trex.changeAnimation("die")

  cactogroup.setVelocityXEach(0)
  nuvemgroup.setVelocityXEach(0)
  cactogroup.setLifetimeEach(-1)
  nuvemgroup.setLifetimeEach(-1)

  if(mousePressedOver(restart)){

   reset()      


  }





}
  
  
    

  

  //impedir que o trex caia
  trex.collide(ground2)
  drawSprites();
}
function gerarNuvens(){
  
  if(frameCount%60 == 0){
    nuvens = createSprite(width,100,40,10)
  nuvens.velocityX = -(2+score/100)
  nuvens.addImage(nuvensimg)
  nuvens.y = Math.round(random(20,80))
  nuvens.lifetime = width/nuvens.velocityX
  trex.depth = nuvens.depth
  trex.depth = trex.depth+1
  nuvemgroup.add (nuvens)

}
}


function gerarCactos(){
if(frameCount%60 == 0){
cacto = createSprite(width,160,20,20)
cacto.velocityX = -(5+score/100)
var sorteio = Math.round(random(1,6))
switch(sorteio){
  case 1:cacto.addImage(cactoimg1)
  break;

  case 2:cacto.addImage(cactoimg2)
  break;

  case 3:cacto.addImage(cactoimg3)
  break;

  case 4:cacto.addImage(cactoimg4)
  break;

  case 5:cacto.addImage(cactoimg5)
  break;

  case 6:cacto.addImage(cactoimg6)
  break;
  default:break
}
cacto.lifetime = width/cacto.velocityX
cacto.scale = 0.6

cactogroup.add (cacto)

}

}

function reset(){

gamestate = PLAY
cactogroup.destroyEach()
nuvemgroup.destroyEach()
score = 0
trex.changeAnimation("running")










}