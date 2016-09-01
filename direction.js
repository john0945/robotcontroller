var main = function() {
	var shooting = false;
    var avoiding = false;
	var was_shooting = false;

    var was_avoiding = false;
	
	$('.button').click(function(event){
		//set all buttons to normal colour
		$('.button').addClass('button-caution');
		var current_id = this.offsetParent.id;
		was_shooting = false;
        was_avoiding = false;

        if (avoiding){
			//if we're driving, and any button is pressed, stop driving
			avoiding = false;
			was_avoiding = true;
			// stop_driving();
		}
        if (shooting){
            //if we're driving, and any button is pressed, stop driving
            shooting = false;
            was_shooting = true;
            // stop_driving();
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
				// if(was_driving === false){
				// 	start_driving();
				// 	driving = true;
				// 	$(this).removeClass('button-caution');
				// }
				//
			break;
			case 'right':
				// command.action = "right";
				// command.amount = "1";
				// send(JSON.stringify(command));
			break;
			case 'shoot':
                if(was_shooting === false){
                    	// start_driving();
                    	shooting = true;
                    	$(this).removeClass('button-caution');
                    }

                    break;
			case 'avoid':
                if(was_avoiding === false){
                    // start_driving();
                    avoiding = true;
                    $(this).removeClass('button-caution');
                }
                break;
            case 'register':
                register();
                break;
            case 'deregister':
                deregister();
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
    System.Diagnostics.Process.Start("python.exe", "start_driving.py");
    alert("started driving");

    // var command = {}; // create an empty object
	// command.action = "forward"; // create a name property based on the input field's value
	// command.amount = "0";
	// send(JSON.stringify(command));
}


// function send(command) {
// 	var xhr = new XMLHttpRequest();
// 	xhr.open("POST", "https://httpbin.org/post", true);
// 	xhr.setRequestHeader("Content-Type", "application/json");
// 	xhr.onreadystatechange = function(){
// 		if (xhr.readyState === 4 && xhr.status === 200) {
// 			console.log(xhr.responseText);
// 		}
// 	};
// 	xhr.send(hero);
// }
//


// function request(sensor) {
// 	var xhr = new XMLHttpRequest();
// 	xhr.onreadystatechange = function() {
// 		if (xhr.readyState === 4 && xhr.status === 200) {
// 			document.getElementById("output").innerHTML = xhr.responseText;
// 		}
// 	}
// 	xhr.open("GET", url, true);
// 	xhr.send();
// 	document.getElementById("output").innerHTML = "Waiting for response ...";
// }


function register(){
	var appId = 'Prime_controller';
	var url = 'http://137.158.126.10:4000/m2m/applications';
	var data = {'application': {'appId': appId}};
    data = JSON.stringify(data)
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
    console.log(data);
    // xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function(){
		if (xhr.readyState === 4 && xhr.status === 200) {
			console.log(xhr.responseText);
		}
	};

    xhr.send(data);
    //container();
}

function deregister(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://137.158.126.10:4000/m2m/applications/Prime_controller",
        "method": "DELETE",
        "headers": {
           
        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

// function container()
// {
//
//     var appId = 'Prime';
//     var url = 'http://137.158.126.10:4000/m2m/applications/Prime/containers';
//     var data = {'container': {'id': 'Prime'}}
//
//
//     var xhr = new XMLHttpRequest();
//     xhr.open("POST", url, true);
//     //xhr.setRequestHeader("Content-Type", "application/json");
//     console.log(data);
//     xhr.onreadystatechange = function(){
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             console.log(xhr.responseText);
//         }
//     };
//     xhr.send(data);
//
// }
//
//

// function register(){
//     // var settings = {
//     //     "async": true,
//     //     "crossDomain": true,
//     //     "url": "http://137.158.126.10:4000/m2m/applications/myApp/containers/temperature/contentInstances/latest",
//     //     "method": "GET",
//     //     "headers": {
//     //         // "content-type": "application/json"
//     //         // "cache-control": "no-cache",
//     //         // "postman-token": "a4ade1bc-9a60-e745-2e24-849bbae6e53b"
//     //      },
//     //     "processData": false,
//     //     "data": "{\r\n    \"degrees\": 20\r\n}"
//     // }
//     //
//     // $.ajax(settings).done(function (response) {
//     //     console.log(response);
//     // });
//
//
//     var data = "{\r\n  \"application\": {\r\n    \"appId\": \"myApp13\"\r\n  }\r\n}\r\n";
//
//     var xhr = new XMLHttpRequest();
//     // xhr.withCredentials = true;
//
//     xhr.addEventListener("readystatechange", function () {
//         if (this.readyState === 4) {
//             console.log(this.responseText);
//         }
//     });
//
//     xhr.open("POST", "http://137.158.126.10:4000/m2m/applications");
//     // xhr.setRequestHeader("cache-control", "no-cache");
//     // xhr.setRequestHeader("postman-token", "b88e15be-4d00-a74c-8bbc-48111d284306");
//
//     xhr.send(data);
// }
$(document).ready(main);