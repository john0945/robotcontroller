var m2m = 'http://10.0.0.7:4000/';
// var m2m = 'http://192.168.137.43:4000/';
var sensor_val;
var main = function() {
	var shooting = false;
    var avoiding = false;
	var was_shooting = false;
    var stream = 'http://10.0.0.5';
    // var m2m = 'http://10.0.0.7:4000/'
    var command;

    var was_avoiding = false;
	
	$('.button').click(function(event){
		//set all buttons to normal colour
		$('.button').addClass('button-action');
		var current_id = this.offsetParent.id;
		was_shooting = false;
        was_avoiding = false;

        if (avoiding){
			//if we're driving, and any button is pressed, stop driving
			avoiding = false;
			was_avoiding = true;
            var command = {};

            command.action = "avoid";
            command.amount = "0";
            send(JSON.stringify(command));
        }
        if (shooting){
            //if we're driving, and any button is pressed, stop driving
            shooting = false;
            was_shooting = true;
            var command = {};

            command.action = "wave";
            command.amount = "0";
            send(JSON.stringify(command));
        }
		var command = {}; // create an empty object

		switch(current_id){
			
			case 'left':
                var command = {};
                command.action = "left";
				command.amount = "3";
				send(JSON.stringify(command));

			break;
			case 'drive':
                $.getJSON(stream+"/parameters?camera=0", function() {
                });
                var command = {};
                command.action = "forward";
				command.amount = "7";
				send(JSON.stringify(command));
			break;
			case 'right':
                var command = {};

                command.action = "right";
				command.amount = "3";
				send(JSON.stringify(command));
			break;
            case 'back':
                $.getJSON(stream+"/parameters?camera=1", function() {
                });

                var command = {};
                command.action = "back";
                command.amount = "7";
                send(JSON.stringify(command));
                break;
			case 'shoot':
                if(was_shooting === false){
                    	// start_driving();
						shooting = true;
                    var command = {};
                        command.action = "wave";
						command.amount = "1";
						send(JSON.stringify(command));


                    	$(this).removeClass('button-action');
                    }

                    break;
			case 'avoid':
                if(was_avoiding === false){
                    // start_driving();
                    avoiding = true;
                    var command = {};
                    command.action = "avoid";
					command.amount = "1";
					send(JSON.stringify(command));
                    $(this).removeClass('button-action');
                }
                break;
            case 'register':
                register();
                break;
            case 'deregister':
                deregister();
			    break;
            case 'update':
                get();
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


function send(command) {
	// var data = "\r\n{\r\n    \"action\": \"left\",\r\n    \"amount\": \"1\"\r\n}";

	var xhr = new XMLHttpRequest();
	// xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === 4) {
			console.log(this.responseText);
		}
	});

	xhr.open("POST", m2m+"m2m/applications/Prime_controller/containers/1/contentInstances");
	// xhr.setRequestHeader("cache-control", "no-cache");
	// xhr.setRequestHeader("postman-token", "d38eeefe-3f76-f4bc-46d5-342ada497629");

	xhr.send(command);
}

function get() {
    var xhr = new XMLHttpRequest();
    var response_val;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            response_val = JSON.parse(this.responseText);
            sensor_val = JSON.parse((atob(response_val['contentInstance'].content['$t'])));
            console.log((sensor_val));
            var element = document.getElementById("battery");
            element.innerHTML = "Battery: "+sensor_val.voltage;
            var element = document.getElementById("ir");
            element.innerHTML = "Infrared: "+sensor_val['infrared'];
            var element = document.getElementById("colour");
            element.innerHTML = "Colour: "+sensor_val.color;

        }
    });
    xhr.open("GET", m2m+"m2m/applications/Prime_controller/containers/2/contentInstances/latest");
    xhr.send();
}

function container() {

    var data = {'container': {'id': '1'}}
    var appId = 'Prime_controller';
    var url = m2m+'m2m/applications/Prime_controller/containers';
    // var data = {'application': {'appId': appId}};
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

    xhr.send(data);var data = {'container': {'id': '2'}}
    var appId = 'Prime_controller';
    var url = m2m+'m2m/applications/Prime_controller/containers';
    // var data = {'application': {'appId': appId}};
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

}



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
    var url = m2m+'m2m/applications';
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
    container();

}

function deregister(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": m2m+"m2m/applications/Prime_controller",
        "method": "DELETE",
        "headers": {

        }
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}



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