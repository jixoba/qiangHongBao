// JavaScript Document
		
		var daojishi60_t = 0;
		var count = 2;
		var game_t = null;
window.onload = function(){
		var rucang = document.getElementById('rucang');
		var guize = document.getElementById('guize');
		var guanyu = document.getElementById('guanyu');
		var youxi = document.getElementById('youxi');
		var score = document.getElementById('score');
		addRucangAnimate();
		rucang_show();
		w_event();
	}
//首页动画效果
function addRucangAnimate(){
		var oDiv = document.getElementById('rucang');
		var aSpan = oDiv.getElementsByTagName('span');
		function addClass(obj){
				obj.className = "rucang_animate";
			}
		addClass(aSpan[0]);
		setTimeout(function(){
				addClass(aSpan[1]);
			},700);	
		setTimeout(function(){
				addClass(aSpan[2]);
			},1300);	
			
	}
//首页文字添加点击事件
function w_event(){
		var w_guize = document.getElementById('w_guize');
		var w_kaisi = document.getElementById('w_kaisi');
		var w_guanyu = document.getElementById('w_guanyu');
		w_guize.onclick = function(){
				rucang.style.display = "none";
				guize.style.display = "block";
				setTimeout(function(){
					guize.className = "show";
				},20);
				guize_fanhui ();
			}
		w_kaisi.onclick = function(){
				rucang.style.display = "none";
				youxi.style.display = "block";
				setTimeout(function(){
					youxi.className = "show";
				},20);
				daojishi();
				setTimeout(function(){
						game();
						daojishi60();
					},4500);
			}
		w_guanyu.onclick = function(){
				rucang.style.display = "none";
				guanyu.style.display = "block";
				setTimeout(function(){
					guanyu.className = "show";
				},20);
				guanyu_fanhui ();
			}
		
	}
//一分钟倒计时
function daojishi60(){
		
		var oSpan = s("daojishi60").getElementsByTagName('span')[0];
		
		daojishi60_t = setInterval(function(){
				oSpan.innerHTML = count--;
				if(count < 0){
						clearInterval(daojishi60_t);
						clearInterval(game_t);
						over();
					}
			},1000);
	}
//游戏结束弹出结束画面
function over(){
		s('over').style.display = "block";
		//sClass('.defen').innerHTML = "500";
		sClass('.defen').innerHTML = "您抢到了"+s('score').getElementsByTagName('span')[0].innerHTML+"元红包哦!!!";
		sClass('.fhsy').onclick = function(){
				location.reload();   
			}
		sClass('.cxks').onclick = function(){
				count = 60;
				s('panel_bottom').style.display = "none";
				
				s('over').style.display = "none";
				s("daojishi60").getElementsByTagName('span')[0].innerHTML = count;
				s("score").getElementsByTagName('span')[0].innerHTML = "0";
				/*setTimeout(function(){
					youxi.className = "show";
				},20);*/
				daojishi();
				setTimeout(function(){
						s('panel_bottom').style.display = "block";
						game();
						daojishi60();
					},4500);
			}
		//保存成绩
		sClass('.bccj').onclick = function(){
				s('cjpm').style.display = "block";
				s('cjpm_close').onclick = function(){
						s('cjpm').style.display = "none";
					}
				paiming();
				tijiao_bth_event();
				
			}
	}
//进入游戏界面倒计时效果
function daojishi(){
		var aSpan = document.getElementById('daojishi').getElementsByTagName('span');
		for(var i = 0; i < aSpan.length; i++){
								aSpan[i].style.display = "block";
								aSpan[i].style.opacity = 0;
								aSpan[i].style.filter = "alpha(opacity:0)";
							}
		setTimeout(function(){
				//aSpan[0].style.opacity = 1;
				startMove(aSpan[0],{opacity:100},1000,function(){
						aSpan[0].style.display = "none";
						startMove(aSpan[1],{opacity:100},1000,function(){
								aSpan[1].style.display = "none";
								startMove(aSpan[2],{opacity:100},1000,function(){
										aSpan[2].style.display = "none";
										startMove(aSpan[3],{opacity:100},1000,function(){
												aSpan[3].style.display = "none";
											});
									});
							});
					})
			},500);
	}
//首页显示
function rucang_show(){
	rucang.style.display = "block";
	setTimeout(function(){
			rucang.className = "show";
		},20);
	}
//游戏规则页面和关于页面返回首页按钮事件
function guize_fanhui(){
		sClass(".guize_fanhui").onclick = function(){
		location.reload();
		}
}
function guanyu_fanhui(){
		sClass(".guanyu_fanhui").onclick = function(){
		location.reload();
		}
}

//游戏部分
function game(){
	var oDiv=document.getElementById('panel_bottom');
	var aA=oDiv.getElementsByTagName('a');
	var i=0;
	for(i=0;i<aA.length;i++)
	{
		aA[i].style.top = 410+"px";
		aA[i].pause=1;
		aA[i].time=null;
		initialize(aA[i]);
		aA[i].onmouseover=function()
		{
			this.pause=0;	
		};
		aA[i].onmouseout=function()
		{
			this.pause=1;
		};
		aA[i].ondragstart= function(){
				return false;
			}
		//添加点击事件,增加分数
		aA[i].onclick = function(){
				this.style.display = "none";
				//var a = parseInt(this.getAttribute("val"));
				//var b = parseInt(score.getElementsByTagName('span')[0].innerHTML);
				score.getElementsByTagName('span')[0].innerHTML = parseInt(this.getAttribute("val")) + parseInt(score.getElementsByTagName('span')[0].innerHTML);
			}
	}
	game_t = setInterval(starmove,24);
	function starmove()
	{
		for(i=0;i<aA.length;i++)
		{
			if(aA[i].pause)
			{
				domove(aA[i]);
			}
		}
	}
	function domove(obj)
	{
		if(obj.offsetTop<=-obj.offsetHeight)
		{
			obj.style.top=oDiv.offsetHeight+"px";
			initialize(obj);
		}
		else
		{
			obj.style.top=obj.offsetTop-obj.ispeed+"px";	
		}
	}
	function initialize(obj)
	{
		var iLeft=parseInt(Math.random()*oDiv.offsetWidth);
		var scale=Math.random()*1+1;
		var iTimer=parseInt(Math.random()*1500);
		obj.pause=0;
		obj.style.display = "block";
		
		obj.style.fontSize=12*scale+'px';

		if((iLeft-obj.offsetWidth)>0)
		{
			obj.style.left=iLeft-obj.offsetWidth+"px";
		}
		else
		{
			obj.style.left=iLeft+"px";
		}
		clearTimeout(obj.time);
		obj.time=setTimeout(function(){
			obj.pause=1;
		},iTimer);
		obj.ispeed=Math.ceil(Math.random()*4)+1;
		}
	}

//cookie操作函数
	var ck = {};
	//设置
	ck.setCookie = function(name,value,iDay){
			var oDate = new Date();
			oDate.setDate(oDate.getDate() + iDay); 
			document.cookie = name + '=' + value + ';expires=' + oDate;
		}
	//获取返回数组
	ck.getCookies = function(){
			var aCookie = [];
			aCookie = document.cookie.split('; ');
			return aCookie;
		}
	//数组排序
	ck.getPaiming = function(arr){
			arr.sort(function(x,y){
			return y[1]-x[1];
			});
			return arr;
		}
	//清空cookie函数
	ck.claerAll = function(){
		var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
		if (keys) {
		for (var i = keys.length; i--;)
		document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString()
		}
	} 

function paiming(){
		var oName = document.getElementsByName('userName')[0];
		var score = document.getElementById('score').getElementsByTagName('span')[0].innerHTML;
		var oTijiao = document.getElementsByName('tijiaoBtn')[0];
		var tab = document.getElementsByTagName('table')[0];
		var l = tab.tBodies[0].rows.length;
		for(var i = 1; i < l; i++){
						tab.tBodies[0].removeChild(tab.tBodies[0].rows[1]);
					}
		(function cakan(){
			var arr = ck.getCookies();
			var arr1 = [];
			for(var i = 0; i < arr.length; i++ ){
					var arr3 = arr[i].split('=');
					arr1.push(arr3);
				}
			var arr1_length = arr1.length;
			if(arr1_length > 10){arr1_length = 10;}
			var arr2 = ck.getPaiming(arr1);
			for(var i = 0; i < arr1_length; i++ ){
					var tr = document.createElement('tr');
					var td1 = document.createElement('td');
					var td2 = document.createElement('td');
					var td3 = document.createElement('td');
					td1.innerHTML = i+1;
					td2.innerHTML = arr1[i][0];
					td3.innerHTML = arr1[i][1];
					tr.appendChild(td1);
					tr.appendChild(td2);
					tr.appendChild(td3);
					tab.tBodies[0].appendChild(tr);
					
				}
		})();
	}
	function tijiao_bth_event(){
			var oName = document.getElementsByName('userName')[0];
			var score = document.getElementById('score').getElementsByTagName('span')[0].innerHTML;
			document.getElementsByName('tijiaoBtn')[0].onclick = function(){
				ck.setCookie(oName.value,score,365);
				paiming();
			}
		}
		




























