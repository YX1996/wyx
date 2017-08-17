//获取元素
var getElem = function(selector){
	return document.querySelector(selector);
}
var getAllElem = function(selector){
	return document.querySelectorAll(selector);
}

//获取元素样式
var getCls = function(element){
	return element.getAttribute('class');
}

//设置元素样式
var setCls = function(element ,cls){
	return element.setAttribute('class',cls);
}

//为元素添加样式
var addCls = function(element, cls){
	var baseCls = getCls(element);
	if (baseCls.indexOf(cls) == -1) {
		setCls(element,baseCls+' '+cls);
	}
}
//为元素删除样式
var delCls = function(element, cls){
	var baseCls = getCls(element);
	if (baseCls.indexOf(cls)!= -1) {
		setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));
	}
}

//第一步，初始化样式 init, 设置屏内元素为初始状态
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
};

var setScreenAnimateInit = function(screenCls){
	var screen = document.querySelector(screenCls); //获取当前屏的元素
    var animateElements= screenAnimateElements[screenCls]; //需要设置动画的元素

	for(var i=0; i<animateElements.length; i++){
  			var element = document.querySelector(animateElements[i]);
   			var baseCls = element.getAttribute('class');
   			element.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'_animate_init');
   		}
}
//设置播放屏内的元素动画
var palyScreenAnimateDone = function(screenCls){
	var screen = document.querySelector(screenCls); //获取当前屏的元素
    var animateElements= screenAnimateElements[screenCls]; //需要设置动画的元素

	for(var i=0; i<animateElements.length; i++){
   			var element = document.querySelector(animateElements[i]);
   			var baseCls = element.getAttribute('class');
   			element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
   		}
	}

window.onload = function () {
	for( k in screenAnimateElements){
		if(k==='.screen-1'||k==='.header'){
			continue;
		}
	    setScreenAnimateInit(k);
    }
    
}

//第二步：滚动到哪就播放到哪
var navItems = getAllElem('.header__nav-item');
var outlineItems = getAllElem('.outline__item');
var navTip = getElem('.header__nav-tip');

var switchNavItemsActive = function(idx){
	for (var i = 0; i < navItems.length; i++) {
		delCls(navItems[i],'header__nav-item_status_active');
		navTip.style.left=(idx*100)+'px';
	}
	addCls(navItems[idx],'header__nav-item_status_active');
}


window.onscroll = function(){
	var top = document.body.scrollTop;
    if (top > 60) {
        addCls(getElem('.header'),'header_status_back');
        addCls(getElem('.outline'),'outline_status_in');
    }else{
        delCls(getElem('.header'),'header_status_back');
        delCls(getElem('.outline'),'outline_status_in');
        switchNavItemsActive(0);
    }
	if (top > 1) {
		palyScreenAnimateDone('.header');
		palyScreenAnimateDone('.screen-1');
		switchNavItemsActive(0);
	}
	if (top > 1*640-300) {
		palyScreenAnimateDone('.screen-2');
		switchNavItemsActive(1);
	}
	if (top > 2*640-300) {
		palyScreenAnimateDone('.screen-3');
		switchNavItemsActive(2);
	}
	if (top > 3*640-300) {
		palyScreenAnimateDone('.screen-4');
		switchNavItemsActive(3);
	}
	if (top > 4*640-300) {
		palyScreenAnimateDone('.screen-5');
		switchNavItemsActive(4);
	}
}
//第三步：双向定位

var setNavJump = function(i,lib){
	var item = lib[i];
	item.onclick = function(){
		document.body.scrollTop = i*640;
	}
}
for(var i=0;i<navItems.length;i++){
	setNavJump(i,navItems);
}
for(var i=0;i<outlineItems.length;i++){
	setNavJump(i,outlineItems);
}

//滑动门特效
var setTip = function(idx,lib){
	lib[idx].onmouseover = function(){
		navTip.style.left=(idx*100) + 'px';
	}

    var activeIdx=0; 
    lib[idx].onmouseout = function(){
    	for (var i = 0; i < lib.length; i++) {
    		if (getCls(lib[i]).indexOf('header__nav-item_status_active')>-1) {
    			activeIdx=i;
    			break;
    		}
    	}
    	navTip.style.left=(activeIdx * 100) + 'px';
    }
}
for (var i = 0; i < navItems.length; i++) {
	setTip(i,navItems);
}

setTimeout(function(){
	palyScreenAnimateDone('.screen-1');
    palyScreenAnimateDone('.header');
},200);