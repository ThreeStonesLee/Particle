window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
            window.setTimeout(callback, 1000 / 60);
        };
})();
var dots=[];
(function(){
    var canvas = document.getElementById('ID');
    var ctx = canvas.getContext('2d');
    const time=1;
    const num=20;
    canvas.width = window.innerWidth ;
    canvas.height = window.innerHeight ;

    function dot(x,y,vx,vy){
        this.x=x;
        this.y=y;
        this.vx=vx;
        this.vy=vy;
        this.size=Math.ceil(Math.random()*3+2);
        this.ctx={};
    }
    //渲染粒子
    dot.prototype.render = function(ctx) {
        ctx.save();
        this.ctx=ctx;
        this.ctx.beginPath();
        this.ctx.fillStyle='red';
        this.ctx.arc(this.x-this.size/2,this.y-this.size/2,this.size,0,Math.PI*2);
        this.ctx.closePath();
        this.ctx.fill();
        ctx.restore();
    };
    dot.prototype.update = function() {
        //this.ctx.clearRect(0,0,canvas.width,canvas.height);
        this.x=this.x+this.vx*time;
        this.y=this.y+this.vy*time;
        //console.log(this.vx*time);
        this.vx = (this.x < canvas.width && this.x > 0) ? this.vx : (-this.vx);
        this.vy = (this.y < canvas.height && this.y > 0) ? this.vy : (-this.vy);
        this.render(this.ctx);
    };
    for(var i=0;i<num;i++){
        var x=Math.ceil(Math.random()*canvas.width);
        var y=Math.ceil(Math.random()*canvas.height);
        var vx=Math.ceil(Math.random()*2);
        var vy=Math.ceil(Math.random()*2);
        var d=new dot(x,y,vx,vy);
        d.render(ctx);
        dots.push(d);
    }
    requestAnimFrame(anim);
    function anim(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(var i=0;i<dots.length;i++){
            dots[i].update();
        }
        requestAnimFrame(anim);
    }
}());