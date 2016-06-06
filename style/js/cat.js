function cats(data) {

	if (data.retCode == 0) {
		var data = data.data;
		var lv = new Sort(data);
		console.log(data[0].catForm1s[0].name);
	} else {
		$.toast(data.errorMsg, "cancel");
	}

};

var left1Tpl = [
	'{{each list as value i}}',
	'<li {{if i==0}}class="d_active"{{/if}} data-id="{{i}}" brand-id="{{value.brandIds}}">{{value.name}}</li>',
	'{{/each}}'
].join('');

var rightTpl = [
	'<li>',
	'{{if list.cid==0}}',
	'<h3>热门推荐</h3>',
	'{{else}}',
	'<h3>分类</h3>',
	'{{/if}}',
	'<div class="category">',
	'{{each list.bmtItemCats as value i}}',
	'<a href="items.htm?cids={{value.cid}}" class="category_list">',
	'{{value.name}}',
	'</a>',
	'{{/each}}',
	'</div>',
	'</li>',
	'<li>',
	'{{if list.cid==0}}',
	'<h3>热卖品牌</h3>',
	'{{else}}',
	'<h3>品牌</h3>',
	'{{/if}}',

].join('');
var rightTpl2 = [
	
	'<div class="category">',
	'{{each list as data i}}',
	'<a href="items.htm?brandIds={{data.brandId}}" class="category_img">',
	'<img src="{{data.picUrl}}" width="80%"/>',
	'<label>{{data.name}}</label>',
	'</a>',
	'{{/each}}',
	'</div>',
	'</li>'
].join('');
var Sort = function(data) {
	this.initLeft1(data);
	this.initLeft2(data);
	this.initRight(data);
	this.event(data);
};

Sort.prototype.event = function(data) {

	$(".d_left").height($(window).height());
		$('#d_left .d_active').trigger("click");
	$("body").delegate(".d_tab li", "click", function() {
		
		if ($(".d_tab li:first-child").hasClass("d_bor_active")) {
				$(".xtab-underline").css("left","50%");
				
		} else{
				$(".xtab-underline").css("left","0%");
		}
		$(this).addClass("d_bor_active").siblings().removeClass("d_bor_active");
		var nIndex = $(this).index();
		$(".d_tab_s>li").eq(nIndex).show().siblings().hide();
			$('#d_left1 .d_active').trigger("click");
	});
};
Sort.prototype.initRight = function(data) {
	$("body").delegate(".d_wrap .d_left li", "click", function() {
		var $gla = $(".guonei .d_right");
		var tuguan = 1;
		if ($(".d_tab li:first-child").hasClass("d_bor_active")) {
		
			$gla = $(".baoshui .d_right");
			tuguan = 0;
		}
		$(this).addClass("d_active").siblings().removeClass("d_active");
		var nIndex = $(this).index();
		var brand = $(this).attr("brand-id");
		data_(brand, nIndex, $gla);
		var render = template.compile(rightTpl);
		var html = render({
			'list': data[0]['catForm1s'][nIndex]
		});
		$gla.html(html);
	});
}
Sort.prototype.initLeft1 = function(data) {
	var render = template.compile(left1Tpl);
	var html = render({
		'list': data[0]['catForm1s']
	});
	$(".baoshui .d_left").html(html);
}
Sort.prototype.initLeft2 = function(data) {
	var render = template.compile(left1Tpl);
	var html = render({
		'list': data[1]['catForm1s']
	});
	$(".guonei .d_left").html(html);
}
$(function() {
	var _href = location.href;
	var param = _href.substr(_href.indexOf('?'));
	var oHead = document.getElementsByTagName('HEAD').item(0);
	var oScript = document.createElement("script");
	oScript.type = "text/javascript";
	oScript.src = apiUrl.cats + param + '?callback=cats';
	oHead.appendChild(oScript);
});

function data_(a, b, c) {
	$.getJSON(apiUrl.brand_id + '?brandIds=' + a + '&jsonpCallback=?', function(json) {
		console.log(json.data[0].picUrl);
		var render = template.compile(rightTpl2);
		var html = render({
			'list': json.data
		});
		c.append(html);
	})
}