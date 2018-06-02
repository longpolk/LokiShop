/***
### minhpq's customize scripts
### (S) phamminh239
### Last modified : August 2017
***/

$(document).ready(function(){ 

	/*** Footer mobile ***/
	var ww = $(window).width();
	if (ww < 768 ){
		$('.foo-title').on('click', function(){
			$(this).next('.foo-content').slideToggle('fast');
		});
	} else {
		$('.foo-content').show();
	}

	/*** Fixed menu bar ***/
	var hh = $('.topbar').height() + $('.mainbar').height();
	// var h1 = $('header').height();
	// var h2 = $('.top-header').height() + $('.main-header').height() + $('.site-nav-mobile').height();
	
	$(window).scroll(function(){
		if (ww >= 992){
			if($(this).scrollTop() > hh){
				$('.menu-header').addClass('sticky');
			} else {
				$('.menu-header').removeClass('sticky');
			}
		} else {
			if($(this).scrollTop() > hh){
				$('.site-nav-mobile').addClass('sticky');
				$('.site-nav-mobile .module-title a').show();
			} else {
				$('.site-nav-mobile').removeClass('sticky');
				$('.site-nav-mobile .module-title a').hide();
			}
		}
	});


	/*** MENU MOBILE ***/
	if (ww < 992){
		$('.module-title').on('click', function(){
			$('.sidebar-menu-content').slideToggle('400');
		});
	}


	/********** Thu gọn **********/
	
	
	

	var menu_limit = "6";
	//	kiểm tra nếu ko phải số thì assign == 5;
	if (isNaN(menu_limit)){
		menu_limit = 5;
	} else {
		// số vị trí mảng = giá trị - 1
		menu_limit = 5;
	}

	/*** menu list ***/
	var sidebar_length = $('.menu-item').length;
	//	thiết lập số menu danh mục hiển thị
	if (sidebar_length > (menu_limit + 1) ){
		$('.sidebar_menu:not(.site-nav-mobile) .sidebar-linklists > ul').each(function(){
			$('.menu-item',this).eq(menu_limit).nextAll().hide().addClass('toggleable');
			$(this).append('<li class="more"><a><label>Xem thêm ... </label></a></li>');
		});
		$('.sidebar_menu .sidebar-linklists > ul').on('click','.more', function(){
			if($(this).hasClass('less')){
				$(this).html('<a><label>Xem thêm ...</label></a>').removeClass('less');
			} else {
				$(this).html('<a><label>Thu gọn ... </label></a>').addClass('less');;
			}
			$(this).siblings('li.toggleable').slideToggle();
		});
	}
	 
});