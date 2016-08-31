var main = function() {
	var driving = false;
	var was_driving = false;
	
	$('.button').click(function(event){
		//set all buttons to normal colour
		$('.button').addClass('button-caution');
		var current_id = this.offsetParent.id;
		was_driving = false;
		if (driving){
			//if we're driving, and any button is pressed, stop driving
			driving = false;
			was_driving = true;
			stop_driving();
		}
		
		switch(current_id){
			
			case 'left':
			alert("left");
			break;
			case 'drive':
				//if drive was pressed, and we weren't just driving, then start driving
				if(was_driving === false){
					start_driving();
					driving = true;
					$(this).removeClass('button-caution');			
				}
				
			break;
			case 'right':
			alert("right");
			break;
			case 'shoot':
			alert("shoot");
			break;
			case 'avoid':
			alert("avoid");
			break;
			default:			
			
		}			
		});
		
	
}

var stop_driving  = function(){
	
	alert("stop driving");
}
var start_driving= function(){
	
	alert("start driving");
}



$(document).ready(main);