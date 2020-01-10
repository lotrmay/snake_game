var canvas = document.getElementById("can");
var ctx = canvas.getContext("2d");
const sn=new Snake();
var rndX;
var rndY;
var intervals=[];
var lastMove="R";
for(var i=0;i<40;i+=10){
    sn.addCube(i,sn.y);
}

function genReward(){
    do{
     rndX=Math.floor(Math.random() *  (canvas.width/10));
     rndY=Math.floor(Math.random() * (canvas.height/10));
    }while(!sn.verification(rndX*10,rndY*10));
    ctx.fillStyle = "white";
    ctx.fillRect(rndX*10,rndY*10,10,10);
    sn.reward=new Cube(rndX*10,rndY*10);
    if(sn.lastReward.x==null){
        sn.lastReward=sn.reward;
    }
}

function intersection(cubeX,cubeY,rndX,rndY){
    if(cubeX==rndX&&cubeY==rndY){
        sn.score++;
        genReward();
        document.getElementById("scoreCount").innerHTML="Score:"+sn.score;
    }
   
}
genReward();

function movement(event) {
    if(sn.alive){
    var x = event.which || event.keyCode;//event.which cause of firefox
    //console.log("The Unicode value is: " + x); //w=119 s=115 a=97 d=100
   
    switch(x){
        
        case(119):
        if(lastMove!="D"){
            clearIntervals();
            intervals.push(setInterval(movingU, 100));
            function movingU() {
                sn.moveUp();intersection(sn.cubes[sn.cubes.length-1].x,sn.cubes[sn.cubes.length-1].y,rndX*10,rndY*10);
            }
            lastMove="U";
        }
        break; 
        case(115):
        if(lastMove!="U"){
        clearIntervals();
        intervals.push(setInterval(movingD, 100));
        function movingD() {
            sn.moveDown();intersection(sn.cubes[sn.cubes.length-1].x,sn.cubes[sn.cubes.length-1].y,rndX*10,rndY*10);
        }
        lastMove="D";
        }
        break; 
        case(97):
        if(lastMove!="R"){
        clearIntervals();
        intervals.push(setInterval(movingL, 100));
        function movingL() {
           sn.moveLeft();intersection(sn.cubes[sn.cubes.length-1].x,sn.cubes[sn.cubes.length-1].y,rndX*10,rndY*10);
        }
        lastMove="L";
        }
        break; 
        case(100):
        if(lastMove!="L"){
        clearIntervals();
        intervals.push(setInterval(movingR, 100));
        function movingR() { 
            sn.moveRight();intersection(sn.cubes[sn.cubes.length-1].x,sn.cubes[sn.cubes.length-1].y,rndX*10,rndY*10);
        }
        lastMove="R";
        }
        break; 
        default:break;
        }
    }
    else{
        clearIntervals();
    }

  }
    function buttonU(){
        if(lastMove!="D"){
        clearIntervals();
        intervals.push(setInterval(U, 100));
        function U(){
            sn.moveUp();intersection(sn.cubes[sn.cubes.length-1].x,sn.cubes[sn.cubes.length-1].y,rndX*10,rndY*10);
        }
        lastMove="U";
        }
    }
    function buttonD(){
        if(lastMove!="U"){
        clearIntervals();
        intervals.push(setInterval(D, 100));
        function D(){
            sn.moveDown();intersection(sn.cubes[sn.cubes.length-1].x,sn.cubes[sn.cubes.length-1].y,rndX*10,rndY*10);
        }
        lastMove="D";
        }
    }
    function buttonR(){
        if(lastMove!="L"){
        clearIntervals();
        intervals.push(setInterval(R, 100));
        function R(){
            sn.moveRight();intersection(sn.cubes[sn.cubes.length-1].x,sn.cubes[sn.cubes.length-1].y,rndX*10,rndY*10);
        }
        lastMove="R";
        }
    }
    function buttonL(){
        if(lastMove!="R"){
        clearIntervals();
        intervals.push(setInterval(L, 100));
        function L() {
           sn.moveLeft();intersection(sn.cubes[sn.cubes.length-1].x,sn.cubes[sn.cubes.length-1].y,rndX*10,rndY*10);
        }
        lastMove="L";
        }
    }
    
  function clearIntervals(){
    for (var i=0; i < intervals.length; i++) {
        clearInterval(intervals[i]);
    }
    intervals=[];
}
function konec(){
    alert("Game over! Your final score is:"+sn.score);
    document.getElementById("score").value=sn.score;
    document.getElementById("mainForm").style.visibility="visible";
    sn.alive=false;
    clearIntervals();    
}
