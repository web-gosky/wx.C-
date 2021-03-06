function item(data) {
	if (data.retCode > 0) {

		if (data.return_code == 100) {
			location.href = "../../";
		} else {
			$.toast(data.return_msg, "cancel");
		}
	}
	if (data.retCode == 0) {
		var lv = new Item(data);
	}
};
$(function() {
	var _href = location.href;
	var param = _href.substr(_href.indexOf('?'));
	var oHead = document.getElementsByTagName('HEAD').item(0);
	var oScript = document.createElement("script");
	oScript.type = "text/javascript";
	oScript.src = apiUrl.item_detail + param + '&callback=item';
	oHead.appendChild(oScript);
});
var SwiperTpl = [
	'{{each picList as data i}}',
	'<div class="swiper-slide"><img src="{{data}}@!pic_640_640"></div>',
	'{{/each}}'
].join('');
var tpl = [
	'<div class="item-content"  style="width:95%;height:auto;overflow:hidden;">',
	' <div class="item-content-top">',
	'<p><span class="sign-price-title">单价 </span> <span class="sign-price-num">&yen;{{price}} </span><span class="market-price-title">市场价 </span><span class="market-price-num">&yen; {{marketPrice}}</span></span></p>',

	'</div>',
	'<div class="title-tip">',
	'{{if type==1}}<img src="' + apiUrl.style_domain + '/img/guonei.jpg" />{{else}}<img src="' + apiUrl.style_domain + '/img/baoshui.jpg" />{{/if}}',
	'<p>{{title}}</p>',
	'</div>',
	'<div class="item-title"></div>',
	'{{if intro}}',
	'<p class="des-word">{{intro}}</p>',
	'{{/if}}',
	'{{if buyingTips}}',
	'<p class="prompt"><img src="' + apiUrl.style_domain + '/img/item_tishi.jpg"/>提示：</p><p class="des">{{buyingTips}}</p>',
	'{{/if}}',
	'</div>',
	'<div style="height:0.8em;background-color:#efeff4"></div>',
	'<div class="item-des-content">',
	'<p class="details-des-tip"><img src="' + apiUrl.style_domain + '/img/item_tishi2.jpg"/>宝贝详情</p>',

	'<div class="details-des">',
	'<p><span class="tip">产地</span><span class="name">{{madeFrom}}</span></p>',
	'<p><span class="tip">品名</span><span class="name">{{brandName}}</span></p>',
	'<p><span class="tip">标题</span><span class="name">{{title}}</span></p>',
	'{{if detail}}',
	'{{each detail as value i}}',
	'<p><span class="tip">{{value.name}}</span><span class="name">{{value.value}}</span></p>',
	'{{/each}}',
	'{{/if}}',
	'</div>',

	'</div>'
].join('');
var foottpl = [

	'{{if status==false}}',
	'<a href="javascript:" class="btn"  id="itemid">已下架</a>',
	'{{else}}',
	'{{if quantity==0}}',
	'<a href="javascript:"  class="btn">已售空</a>',
	'{{else}}',
	'<a id="submit-btn"  data-itemid="{{itemId}}">立即购买</a>',
	'{{/if}}',

	'{{/if}}'
].join('');

var tplhideTpl = [
//	'<ul class="d_ul2" data-itemid="{{item_id}}" id="itemid">',
//	'<img src="' + apiUrl.style_domain +  '/img/guanbi.png" class="d_guanbi">',
//	'<li>{{title}}</li>',
////	'<li><span class="color" style="font-size: 17px;">&yen;<span id="totlePrice">{{if specs.length!=0}}{{specs[0].price}}{{else}}{{price}}{{/if}}</span></span><span class="color1 marLeft-10">(单价<span id="price">&yen{{if specs.length!=0}}{{specs[0].price1}}{{else}} {{market_price}}  {{/if}}</span>)</span></li>',
////	'</ul>',
////	'<div class="d_fenlei">',
////	'{{if specs.length!=0}}',
////	'<ul>',
////	'<p>规格</p>',
////	'{{each specs as data i}}',
////	'<li class="guige" data-itemid="{{itemId}}" data-sku="{{data.sku_id}}" data-status="0" data-num="0" data-price="{{data.price}}" data-price1="{{data.price1}}">{{data.spec_name}}</li>',
////	'{{/each}}',
////	'</ul>',
////	'{{/if}}',
////	'{{if type==1}}',
////	'<ul class="  marBot-15">',
////	'<p>数量</p>',
////	'<p class="d_jisuan" style="line-height:220%;"><img src="' + apiUrl.style_domain + '/img/jian.png" id="d_jian"><span id="number">1</span><img src="' + apiUrl.style_domain + '/img/jia.png" id="d_jia" />',
////	'</p>',
//	'</ul>',
//	'{{/if}}',
//	'</div>',
	'<ul class="d_ul2" data-itemid="" id="itemid">',
	'<img src="' + apiUrl.style_domain + '/img/guanbi.png" class="d_guanbi">',
	'<li>这是title</li>',
	'<li><span class="color" style="font-size: 17px;">&yen;<span id="totlePrice">总价</span></span></li>',
	'</ul>',
	'<div class="d_fenlei">',
	'<ul>',
	'<p>规格</p>',
	'<li class="guige" data-itemid="" data-sku="" data-status="0" data-num="0" data-price="" data-price1="">1罐装</li>',

	'</ul>',
////	'{{/if}}',
////	'{{if type==1}}',
	'<ul class="  marBot-15">',
	'<p>数量</p>',
	'<p class="d_jisuan" style="line-height:220%;"><img src="' + apiUrl.style_domain + '/img/jian.png" id="d_jian"><span id="number">1</span><img src="' + apiUrl.style_domain + '/img/jia.png" id="d_jia" />',
	'</p>',
	'</ul>',
//	'{{/if}}',
	'</div>',
	'<a class="d_que" href="#">确定购买</a>'
].join('');

var Item = function(data) {
	this.data = data;
	this.num = '';
	this.init();
	this.swipe();
	this.event();
};
Item.prototype.init = function() {
	var html = Render.tpl(SwiperTpl, this.data.data);
	$('.swiper-wrapper').html(html);
	var html1 = Render.tpl(tpl, this.data.data);
	$('.item-content-html').html(html1);
//	var html2 = Render.tpl(tplhideTpl, this.data.data);
//	$('.d_tan').html(html2);
	var html3 = Render.tpl(foottpl, this.data.data);
	$('.d_footer1').append(html3);
	//      var str=this.htmlspecialcharsDecode(this.data.data.bmtItemSkus);
	//      
	//      $('.d_show').html(str);
};
Item.prototype.swipe = function() {
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		paginationClickable: true,
		spaceBetween: 30,
		centeredSlides: true,
		autoplay: 2000,
		autoplayDisableOnInteraction: false
	});
};
//  Item.prototype.htmlspecialcharsDecode=function(str){   
//      str = str.replace(/&amp;/g, '&'); 
//      str = str.replace(/&lt;/g, '<');
//      str = str.replace(/&gt;/g, '>');
//      str = str.replace(/&quot;/g, "\"");  
//      str = str.replace(/&#039;/g, "'");  
//      str=str.replace(/\/Uploads/gm,'http://admin.com/Uploads');
//      return str;  
//  };
Item.prototype.event = function() {
	$('#submit-btn').click(function() {
		$('.d_zhe').fadeIn(200);
		$('.d_tan').slideDown(200);
	});
	$('.d_guanbi ').click(function() {
		$('.d_zhe').fadeOut(200);
		$('.d_tan').slideUp(200);
	});
	$('.d_fenlei>ul li').click(function() {
		$(this).addClass('active_').siblings().removeClass('active_');
		$('#totlePrice').text($(this).attr('data-price'));
		$('#price').text($(this).attr('data-price1'));
		if ($(this).attr('data-status') == 0) {
			var data = $(this).data();
			getItemQuantity($(this), data);
		}
	});
	var a = parseInt($('#number').text());
	$('#d_jian').click(function() {
		if (a > 1) {
			a = a - 1;
			$('#number').text(a);
		}
	});
	$('#d_jia').click(function() {
		if ($('.active_').size() > 0) {
			var totle = parseInt($('.active_').attr('data-num'));
			var num = parseInt($('#number').text());
			if (num < totle) {
				a = a + 1;
				$('#number').text(a);
			} else {
				$.toast('最多只能购买这么多', "forbidden");
			}
		} else {
			$.toast('请选择规格', "forbidden");
		}
	});
	$('.d_que').on('click', function() {
		var item_id = $('#itemid').attr('data-itemid');
		var sku_id = $('.active_').attr('data-sku');
		var num = $('#number').text();
		var _s = $('.d_fenlei').find('.active_').size();
		var _obj = '';
		if (sku_id == undefined || sku_id == null) {
			sku_id = '';
		}
		if (num == undefined || num == null) {
			num = '';
		};
		_obj = {
			item_id: item_id,
			sku_id: sku_id,
			num: num
		};
		window.localStorage.order = JSON.stringify(_obj);
		if ($('.guige').size() > 0) {
			if (_s > 0) {
				location.href = "../order/order.html?item_id=" + item_id + "&sku_id=" + _obj.sku_id + "&num=" + _obj.num;
			} else {
				$.toast('请选择规格', "forbidden");
			}
		} else {
			location.href = "../order/order.html?item_id=" + item_id + "&sku_id=" + _obj.sku_id + "&num=" + _obj.num;
		}
		return false;
	})

	function getItemQuantity($selector, data) {
		var storesId = window.localStorage.sky;
		var item_id = $('#submit-btn').attr('data-itemid');
	

		var lv = $.getJSON(apiUrl.item_quantity + '?store_user_id=' + storesId + '&item_id=' + item_id + '&jsonpCallback=?', function(json) {
			//          var lv=new ajax({
			//                              url:apiurl.item_quantity,
			//                              data:{item_id:data.itemid,sku_id:data.sku},
			//                              type:'get',
			//                              success:function(data){
			//                                          $selector.attr('data-status','1');
			//                                          $selector.attr('data-num',data.quantity);
			//                                      }
			//         
			
		var render = template.compile(tplhideTpl);
		console.log(json.data.info[0])
		var html = render({
			'list': json.data.info[0]
		});
		$('.d_tan').html(html);
			
			
		});
	}
	getItemQuantity();
};