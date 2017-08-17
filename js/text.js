
var screenAnimateElements = {
    '.header' : [
        '.header'           
    ],

	'.screen-1' : [
        '.screen-1__heading',
        '.screen-1__subheading'
	],

	'.screen-2' : [
        '.screen-2__heading',
        '.screen-2__subheading',
        '.screen-2__redline',
        '.screen-2__pic1',
        '.screen-2__pic2'
	],

	'.screen-3' : [
        '.screen-3__heading',
        '.screen-3__subheading',
        '.screen-3__redline',
        '.screen-3__pic',
        '.screen-3__list'
	],

	'.screen-4' : [
        '.screen-4__heading',
        '.screen-4__subheading',
        '.screen-4__redline',
        '.screen-4__way-item_i_1',
        '.screen-4__way-item_i_2',
        '.screen-4__way-item_i_3',
        '.screen-4__way-item_i_4'
	],

	'.screen-5' : [
        '.screen-5__heading',
        '.screen-5__subheading',
        '.screen-5__redline',
        '.screen-5__pic',
    ]
}

function setScreenAnimate(screenCls){

   var screen = document.querySelector(screenCls); //获取当前屏的元素
   var animateElements= screenAnimateElements[screenCls]; //需要设置动画的元素
   
   var isSetAnimateClass= false; //是否有初始化子元素的样式
   var isSetAnimateDone = false; //当前屏幕下所有子元素的状态是done？
   screen.onclick=function(){

   	//初始化样式 ，增加init
   	if (isSetAnimateClass===false) {
   		for(var i=0; i<animateElements.length; i++){
  			var element = document.querySelector(animateElements[i]);
   			var baseCls = element.getAttribute('class');
   			element.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'_animate_init');
   		}
   		isSetAnimateClass = true;
   		return;
   	}
    //切换所有 animateElements的 init-> done
    if (isSetAnimateDone === true) {

   		for(var i=0; i<animateElements.length; i++){
   			var element = document.querySelector(animateElements[i]);
   			var baseCls = element.getAttribute('class');
   			element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
   		}
   		isSetAnimateDone = false;
   		return;
   }
   //切换所有 animateElements的 done-> init
   if (isSetAnimateDone === false) {
   		for(var i=0; i<animateElements.length; i++){
   			var element = document.querySelector(animateElements[i]);
   			var baseCls = element.getAttribute('class');
   			element.setAttribute('class',baseCls.replace('_animate_done','_animate_init'));
   		}
   		isSetAnimateDone=true;
   		return;
    }
   }
}

for( k in screenAnimateElements){
	setScreenAnimate(k);
}