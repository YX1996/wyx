//设置倒计时时间为2小时
var endTime = new Date(); 
endTime.setTime(endTime.getTime()+2*3600*1000);

var curShowTimeSeconds = 0;

//定义小球数组及小球颜色
var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

window.onload = function(){
    //自适应网页大小
	WINDOW_HEIGHT=document.documentElement.clientHeight-20;
    WINDOW_WIDTH=document.documentElement.clientWidth-20;
    
    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
    RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;

    MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
    //定义画布大小及画布2d上下文
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
    
    //获取倒计时的总秒数
    curShowTimeSeconds = getCurrentShowTimeSeconds();
    
    //setInterval函数实现动画效果
	setInterval(
		function(){
			render(context) //秒数变化时 画上彩色小球
			update();  //
		},50);
}
//定义获得倒计时总秒数方法
function getCurrentShowTimeSeconds(){
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();
	ret = Math.round(ret/1000);

	return ret>=0 ? ret : 0;
}

//定义update方法，若倒计时总秒数发生变化，则重新设置总秒数
function update(){
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nextHours = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt((nextShowTimeSeconds - nextHours*3600)/60);
	var nextSeconds = nextShowTimeSeconds % 60;

	var curHours = parseInt(curShowTimeSeconds/3600);
	var curMinutes = parseInt((curShowTimeSeconds - curHours*3600)/60);
	var curSeconds = curShowTimeSeconds % 60;
    //判断倒计时总秒数是否发生变化
	if(nextSeconds != curSeconds){
        //重新设置倒计时总秒数
		curShowTimeSeconds = nextShowTimeSeconds;
        //秒数变化时，添加彩色小球在变化数字位置上
		if( parseInt(curHours/10) != parseInt(nextHours/10) ){
            addBalls( MARGIN_LEFT + 0 , MARGIN_TOP , parseInt(curHours/10) );
        }
        if( parseInt(curHours%10) != parseInt(nextHours%10) ){
            addBalls( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(curHours/10) );
        }

        if( parseInt(curMinutes/10) != parseInt(nextMinutes/10) ){
            addBalls( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes/10) );
        }
        if( parseInt(curMinutes%10) != parseInt(nextMinutes%10) ){
            addBalls( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(curMinutes%10) );
        }

        if( parseInt(curSeconds/10) != parseInt(nextSeconds/10) ){
            addBalls( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(curSeconds/10) );
        }
        if( parseInt(curSeconds%10) != parseInt(nextSeconds%10) ){
            addBalls( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(nextSeconds%10) );
        }
	}
	updateBalls();
}
//定义运动小球在画布上位置方法
function updateBalls(){

    for( var i = 0 ; i < balls.length ; i ++ ){

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if( balls[i].y >= WINDOW_HEIGHT-RADIUS ){
            balls[i].y = WINDOW_HEIGHT-RADIUS;
            balls[i].vy = - balls[i].vy*0.75;
        }	
    }

    var cnt = 0;
	for(var i=0;i<balls.length;i++){
		if( (balls[i].x+RADIUS)>0 && (balls[i].x - RADIUS )< WINDOW_WIDTH){
			balls[cnt++] = balls[i];
		}
	}
	while(balls.length > Math.min(400,cnt) ){
		balls.pop();
	}
}

function addBalls( x , y , num ){

    for( var i = 0  ; i < digit[num].length ; i ++ )
        for( var j = 0  ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow( -1 , Math.ceil( Math.random()*1000 ) ) * 4,
                    vy:-5,
                    color: colors[ Math.floor( Math.random()*colors.length ) ]
                }

                balls.push( aBall )
            }
}

function render(ctx){
    //清空给定矩形内的指定像素
	ctx.clearRect(0 , 0 , WINDOW_WIDTH , WINDOW_HEIGHT);

	var hours = parseInt(curShowTimeSeconds/3600);
	var minutes = parseInt((curShowTimeSeconds - hours*3600)/60);
	var seconds = curShowTimeSeconds % 60;
    //数字显示位置设置
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ctx);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,ctx);
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ctx);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ctx);
    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,ctx);
    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx);

    //数字上画上彩色小球
    for( var i = 0 ; i < balls.length ; i ++ ){
        ctx.fillStyle=balls[i].color;

        ctx.beginPath();
        ctx.arc( balls[i].x , balls[i].y , RADIUS , 0 , 2*Math.PI , true );
        ctx.closePath();

        ctx.fill();
    }
}

function renderDigit(x,y,num,ctx){
	ctx.fillStyle = "rgb(0,102,153)";

	for(var i=0; i<digit[num].length;i++)
		for(var j=0;j<digit[num][i].length;j++)
			if (digit[num][i][j] == 1) {
				ctx.beginPath();
				ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				ctx.closePath();

                ctx.fill();
			}
}