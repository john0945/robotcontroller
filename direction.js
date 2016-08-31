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
		var command = {}; // create an empty object

		switch(current_id){
			
			case 'left':
				command.action = "left";
				command.amount = "1";
				send(JSON.stringify(command));

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
				command.action = "right";
				command.amount = "1";
				send(JSON.stringify(command));
			break;
			case 'shoot':
			break;
			case 'avoid':
			alert("avoid");
			break;
			default:			
			
		}			
		});
		
	
}

var stop_driving  = function(){

	var command = {};
	command.action = "stop";
	command.amount = "0";
	send(JSON.stringify(command));
}
var start_driving= function(){
	var command = {}; // create an empty object
	command.action = "forward"; // create a name property based on the input field's value
	command.amount = "0";
	send(JSON.stringify(command));
}


function send(command) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "https://httpbin.org/post", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4 && xhr.status === 200) {
			console.log(xhr.responseText);
		}
	};
	xhr.send(hero);
}



function request(sensor) {
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4 && xhr.status === 200) {
			document.getElementById("output").innerHTML = xhr.responseText;
		}
	}
	xhr.open("GET", url, true);
	xhr.send();
	document.getElementById("output").innerHTML = "Waiting for response ...";
}


function register(){
	var appId = 'Prime';
	var url = 'http://137.158.126.10:4000/m2m/applications';
	var data = {'application': {'appId': appId}};

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log(data);
	xhr.onreadystatechange = function(){
		if (xhr.readyState === 4 && xhr.status === 200) {
			console.log(xhr.responseText);
		}
	};
	xhr.send(data);
    //container();
}

function container()
{

    var appId = 'Prime';
    var url = 'http://137.158.126.10:4000/m2m/applications/Prime/containers';
    var data = {'container': {'id': 'Prime'}}


    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    //xhr.setRequestHeader("Content-Type", "application/json");
    console.log(data);
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.send(data);

}


$(document).ready(register);
$(document).ready(main);