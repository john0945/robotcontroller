var main = function() {
	var driving = false;
	
	$('#drive .button').click(function(){
		//set all buttons to normal colour
		$('.button').addClass('button-caution');
		//if button is already pressed, unpress it
		
		if (driving){
			driving = false;
			stop_driving();
		}
		else{
			driving = true;
			$(this).removeClass('button-caution');			
		}
		});
		
		
		
	$('#left .button').click(function(){
		
		$('.button').addClass('button-caution');
		
		if (driving){
			driving = false;
			stop_driving();
		}		
		});
		
		
	$('#right .button').click(function(){
		
		$('.button').addClass('button-caution');
		
		if (driving){
			driving = false;
			stop_driving();
		}
		});
		
			
	$('#shoot .button').click(function(){
		
		$('.button').addClass('button-caution');
		
		if (driving){
			driving = false;
			stop_driving();
		}
		
		});
		
		
			
	$('#avoid .button').click(function(){
		
		$('.button').addClass('button-caution');
		
		if (driving){
			driving = false;
			stop_driving();
		}
		});

	
}

var stop_driving  = function(){
	
	//alert("stop driving");
}


$(document).ready(main);