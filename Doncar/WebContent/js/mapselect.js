$(function(){
	cdcheck();
	$(".addr_list").click(function(){
			addralert(this)
	});
		
	$(".cd_list").on("change",function(){
			addrcheck(this)
	});
		
	$(".addr_list").on("change",function(){
		insertval(this)
	})
});

	function insertval(self){
		var str = '';
		$(self).prev().children().each(function(){
			if($(this).prop('selected')==true){
				str += $(this).text();
				return;
			}
		});
		
		$(self).children().each(function(){
			if($(this).prop('selected')==true){
				str += $(this).text();
				return;
			}
		})
	$(self).parent().children('input').val(str);
	}

	function addralert(self){
		var sd = $(self).prev().val();
		if(sd == null || sd == ""){
			alert("시를 먼저 선택해주세요");
		}
	}

	function cdcheck() {
		var token = "1b95f535-1d68-4b7d-bea4-eb2ca87e29ea&"
		$.ajax({
			url : "https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken="+token,
			dataType : "json",
			success : function(data) {
				var arr = data.result;
				var select = $('.cd_list');
				
				for(var i = 0; i<arr.length; i++){ 
					select.append($('<option value="'+arr[i].cd+'">'+arr[i].addr_name+'</option>'));
				}
			},
			error : function() {
			alert("실패");
			}
		});
	}

	function addrcheck(self){
		var token = "1b95f535-1d68-4b7d-bea4-eb2ca87e29ea&"
		var cdvalue = $(self).val();
		var cd = ''
			cd = 'cd=' + cdvalue;
		$.ajax({
			url : "https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken="+token+cd,
			dataType : "json",
			success : function(data){
				var arr = data.result;
				var select = $(self).next();
				select.html('<option>군/구</option>');
				for(var i=0; i<arr.length; i++){
					select.append($('<option value="'+arr[i].cd+'">'+arr[i].addr_name+'</option>'));
				}
			},
			error : function() {
			alert("실패");
			}
		});
	}
	
