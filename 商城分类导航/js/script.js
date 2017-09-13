
function $(ele) {
	return document.querySelectorAll(ele);
}
function $$(id) {
	return document.querySelector(id);
}

var timer = null;
var index = 0;
var dots = $$('#dots').getElementsByTagName('span');

// 鼠标移入侧边栏显示对应的菜单区域，移出隐藏菜单区域
for(let i = 0; i < $('.menu-item').length; i++) {
	//闭包只能得到最后的i值，添加属性 data-index，同步获取i的值
	$('.menu-item')[i].setAttribute("data-index", i);
	$(".menu-item")[i].onmouseover = function(num){
		var idx = this.getAttribute('data-index');
		this.style.background = "rgba(0,0,0,.2)";
		for(let j = 0; j < $('.menu-content').length; j++){
			$('.menu-content')[j].style.display = "none";
		}
		$$('#menu-box').style.display = 'block';
		$('.menu-content')[idx].style.display = "block";
	}
	$(".menu-item")[i].onmouseout = function(){
		this.style.background = "none";	
		$$('#menu-box').style.display = 'none';
	}
}

$$('#menu-box').onmouseover = function(){
	this.style.display = 'block';
}
$$('#menu-box').onmouseout = function(){
	this.style.display = 'none';
}

//封装播放图片函数
function playImg(){
	for(let i = 0; i < $('.banner-slide').length; i++) {
		$('.banner-slide')[i].style.display = 'none';
		dots[i].className = '';
	}
	$('.banner-slide')[index].style.display = 'block';
	dots[index].className = 'active';
	console.log(index);
}

//自动播放图片
function autoPlay(){
	timer = setInterval(function(){
		index ++;
		if(index >= $('.banner-slide').length) {
			index = 0;
		}
		playImg();
	},3000);
}
//停止播放
function stopPlay(){
	if (timer) {
		clearInterval(timer);
	}
}
//鼠标移入内容区域停止播放，移除在自动播放
$$('#container').onmouseout = function(){
	autoPlay();
}
$$('#container').onmouseover = function(){
	stopPlay();
}
$$('#container').onmouseout();

//点击按钮切换图片
$$('#pre').onclick = function(){
	index --;
	if (index < 0) {
			index = $('.banner-slide').length-1;
		}
	playImg();
}

$$('#aft').onclick = function(){
	index ++;
	if (index >= $('.banner-slide').length) {
			index = 0;
		}
	playImg();
}

for(let i=0; i<dots.length; i++) {
	dots[i].id = i;
	dots[i].onclick = function(){
		index = this.id;
		playImg();
	}
}
