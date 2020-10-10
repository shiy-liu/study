function fun(id,op) {
	document.getElementById(id).style.display=op;
	}
function my_jdShow() {
	var jd=document.getElementById('my_jd');
		jd.style.backgroundColor ="#fff";
		jd.style.borderBottomColor="#fff";
		$(" #my_jd_dropdown").css("display","block");

}
function my_jdHide() {
	var jd=document.getElementById('my_jd');
		jd.style.backgroundColor ="#f7f7f7";
		jd.style.borderBottomColor="#efefef";
		$(" #my_jd_dropdown").css("display","none");

}
function settle_upShow() {
	var settle=document.getElementById('settle_up');
		settle.style.backgroundColor ="#fff";
		settle.style.borderBottomColor="#fff";
		$(" #settle_dropdown").css("display","block");

}
function settle_upHide() {
	var jd=document.getElementById('settle_up');
		jd.style.backgroundColor ="#f7f7f7";
		jd.style.borderBottomColor="#efefef";
		$(" #settle_dropdown").css("display","none");

}
			window.onload=function(){
			var imgs=document.getElementsByClassName("imgg");
			for (var i = 0; i < imgs.length; i++) {
				imgs[i].onclick=function () {
			var big=document.getElementById('big').src=this.src;
				}
			}
		}

$(function () {
$("#customer_service").mouseover(function (){
		
		$("#dropdown").css("display","block");
	});
	$("#customer_service").mouseout(function () {
		$("#dropdown").css("display","none");
	});
		$("#site_map").mouseover(function (){
		
		$("#sm_dropdown").css("display","block");
	});
	$("#site_map").mouseout(function () {
		$("#sm_dropdown").css("display","none");
	});
		$("#app").mouseover(function (){
		
		$("#aj_dropdown").css("display","block");
	});
	$("#app").mouseout(function () {
		$("#aj_dropdown").css("display","none");
	});
	var titles=$("#tab_title>ul>li");
	console.log(titles.length);
		for (var i = 0; i < titles.length; i++) {
			titles[i].id=i;
			titles[i].onclick=function(){for (var j = 0; j < titles.length; j++) {
				titles[j].className="";
				$(".tab_content>div").css("display","none");

			}
			this.className="selected_tab_title";
			$(".tab_content>div").get(this.id).style.display="block";
		}
			


		}
})