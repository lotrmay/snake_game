class Snake {
    constructor() {
      this.score=0;
      this.alive=true;
      this.cubes = [];
      this.x=0;
      this.y=0;
      this.reward=new Cube;
      this.lastReward=new Cube;
    }
    verification(x,y,lastReward){
        var ret=true;
        for(var i=0;i<this.cubes.length-1;i++){
            if(x==this.cubes[i].x&&y==this.cubes[i].y||x==this.lastReward.x&&y==this.lastReward.y){
                ret=false;
            }
        }return ret;
    }
    verificationWithoutReward(x,y){ 
        var ret=true;
        for(var i=0;i<this.cubes.length-1;i++){
            if(x==this.cubes[i].x&&y==this.cubes[i].y){
                ret=false;
            }
        }
        return ret;
    }


    removeTail(cube){
        if(cube.x==this.lastReward.x&&cube.y==this.lastReward.y){
            ctx.clearRect(this.cubes[0].x, this.cubes[0].y, 10, 10);
            this.cubes.unshift(new Cube(this.lastReward.x,this.lastReward.y));
            for(var i=2;i<this.cubes.length;i++){
                this.cubes[i-1].x= this.cubes[i].x;
                this.cubes[i-1].y= this.cubes[i].y;
            } 
            this.cubes.splice(this.cubes.length-1,1);
            ctx.fillRect(this.cubes[0].x,this.cubes[0].y,10,10);
            this.lastReward=this.reward;
        }
        else{
            ctx.clearRect(this.cubes[0].x, this.cubes[0].y, 10, 10);
            for(var i=1;i<this.cubes.length;i++){
                this.cubes[i-1].x= this.cubes[i].x;
                this.cubes[i-1].y= this.cubes[i].y;
            } 
            this.cubes.splice(this.cubes.length-1,1);
            ctx.fillRect(this.reward.x,this.reward.y,10,10);   
     }
    }
    addCube(x,y) {
            let cube = new Cube(x,y);
            ctx.fillStyle = "white";
            ctx.fillRect(x,y,10,10);
            this.cubes.push(cube);
            this.x+=10;
            this.y+=0;
        }
    moveRight(){
        if(this.alive){
            var head=this.cubes[this.cubes.length-1];
            if(head.x+10<400&&this.verificationWithoutReward(head.x+10,head.y)){
            ctx.fillRect(head.x+10,head.y,10,10);
            this.cubes.push(new Cube((head.x+10),head.y));
            this.removeTail(this.cubes[0]);
         }
            else{
                konec();    
            }
        }
        
    }  
    moveLeft(){
        if(this.alive){
            var head=this.cubes[this.cubes.length-1];
            console.log(this.verificationWithoutReward(head.x-10,head.y));
            if(head.x-10>=0&&this.verificationWithoutReward(head.x-10,head.y)){
            ctx.fillRect(head.x-10,head.y,10,10);
            this.cubes.push(new Cube((head.x-10),head.y));
            this.removeTail(this.cubes[0]);
            }
            else{
                konec();      
            }
        }
    }
    moveDown(){
        if(this.alive){
            var head=this.cubes[this.cubes.length-1];
            console.log(this.verificationWithoutReward(head.x,head.y+10));
            if(head.y+10<400&&this.verificationWithoutReward(head.x,head.y+10)){
            ctx.fillRect(head.x,head.y+10,10,10);
            this.cubes.push(new Cube(head.x,(head.y+10)));
            this.removeTail(this.cubes[0]);
            }
            else{
                konec();   
            }
        }
    }
    moveUp(){
        if(this.alive){
            var head=this.cubes[this.cubes.length-1];
            console.log(this.verificationWithoutReward(head.x,head.y-10));
            if(head.y-10>=0&&this.verificationWithoutReward(head.x,head.y-10)){
            ctx.fillRect(head.x,head.y-10,10,10);
            this.cubes.push(new Cube(head.x,(head.y-10)));
            this.removeTail(this.cubes[0]);
            }
            else{
                konec(); 
            }
       }
    }
}
    
