function cats(data) {
	if (data.retCode == 0) {
	
		var lv = new Items(data);
		         new srcrchFun();

	} if(data.totalPage==0) {
	  $("body").css("background-color","#eee");   
            $(".d_container2").css("background-color","#eee");  
            $(".d_container2").append('<div class="d_kong" style="color:fff"><p style="font-size:25px;margin-bottom:15px">sorry!</p><p style="font-size:15px"></p></div>');
            $(".d_container2 p:last-of-type").html("暂无商品数据");
            new srcrchFun();      
	}

};
	var storesId= window.localStorage.sky;
	alert(storesId);
var tpl = [
	'{{each list as value i}}',
	'<li>',
	'<a href="item_detail.htm?itemId={{value.itemId}}&'+ storesId+'" style="display:block">',
	'<img src="{{value.picUrl}}">',
	'<div class="Title" style="height:44px">{{value.title}}</div>',
	'<div class="Title"><span style="color: #FF5000;">&yen;{{value.price}}</span><span class="Yen">&yen;{{value.marketPrice}}</span></div>',
	'</a>',
	'</li>',

	'{{/each}}',
].join('');
var Items = function(data) {
	this.event(data);
	this.page = data.totalPage-1;


};
    Items.prototype.lazyload=function(){
        $("img").lazyload({
                effect : "fadeIn"
        });
    };

Items.prototype.event = function(data) {
	var render = template.compile(tpl);
	var html = render({
		'list': data.data
	});
	$(".d_container2 ul").html(html);
	var _this = this;
	var _href = location.href;
	var param = _href.substr(_href.indexOf('?'));
	$(document).scroll(function() {

		var _height = $(this).scrollTop();
		if (_height > 100) {
			$('#moverTop').fadeIn(300);
		} else {
			$('#moverTop').fadeOut(300);
		}
	});
	$('#moverTop').on('click', function() {
		$('body').animate({
			scrollTop: 0
		}, 200);
	});

	var loading = false; //状态标记
	var lv = getMore();
	$(document.body).infinite().on("infinite", function() {
		if (loading) return;
		loading = true;
		$('.weui-infinite-scroll').show();
		//模拟延迟
		lv();
	});

	function getMore() {

		var page = 0;
		return function() {
			if (_this.page > page) {
				page++;
				var lv = $.ajax({
					'url': apiUrl.item_cid  + param + '&pageNum=' + page,
					type: 'post',
					success: function(data) {
						console.log(data)
						var render = template.compile(tpl);
						var html = render({
							'list': data.data
						});
						$(".d_container2 ul").append(html);
						loading = false;
						$('.weui-infinite-scroll').hide();
					}
				})
				}
			else {
				$('.weui-infinite-scroll').remove();
			}

		};
	};
};
$(function() {

	var _href = location.href;
	var param = _href.substr(_href.indexOf('?'));
	var oHead = document.getElementsByTagName('HEAD').item(0);
	var oScript = document.createElement("script");
	oScript.type = "text/javascript";
	oScript.src = apiUrl.item_cid + param + '&callback=cats';
	oHead.appendChild(oScript);
});

Items.prototype.ArrayOwn = function(val) {
	for (var i = 0; i < this.cookie.length; i++) { //val不能和存的一样
		if (this.cookie[i] == val) {
			return false;
		}
	}
	return true;
};

 var srcrchFun=function(){
        this.cookie=window.localStorage.search==undefined?new Array():window.localStorage.search.split(",");
        this.search();
        this.event();
    }
    srcrchFun.prototype.search=function(){
        var str='';
        for(var i=0;i<this.cookie.length;i++){
            if(i<10){
                str+='<a href=\"?title='+this.cookie[i]+'">'+this.cookie[i]+'</a>';
            }
        }
        $('.his_tpl .tip').html(str);
    };
    srcrchFun.prototype.event=function(){
        var _this=this;
        $('#search-box').on('click',function(){
            $('.his_tpl').show();
            $('#search_form input').focus();
        })
        $('.search-cancel-btn').on('click',function(){
            $('.his_tpl').hide();
        })
        $('#search_form').on('submit',function(){
                 var _val=$(this).find('input').val();
                 if(_this.ArrayOwn(_val) && $.trim(_val)!=''){
                    _this.cookie.unshift(_val);
                    window.localStorage.search=_this.cookie;
                 }
        });
        $('.clear-btn').on('click',function(){
            window.localStorage.clear();
            $('.his_tpl .tip').html('');
            location.reload();
        })
    };
    srcrchFun.prototype.ArrayOwn=function(val){
        if(this.cookie.length>10){
            this.cookie.pop();
        }
        for(var i=0;i<this.cookie.length;i++){
            if(this.cookie[i]==val){
                return false;
            }
        }
        return true;
    };
