/**
 * Created by johnl on 2016/08/31.
 */
var text = document.getElementById("text");
var html = document.getElementById("html");
var api = document.getElementById("api");
var myip = 0 ;

text.addEventListener("click", function(){ request("https://s3.amazonaws.com/sitepoint-book-content/jsninja/hello.txt") }, false);
html.addEventListener("click", function(){ request("https://s3.amazonaws.com/sitepoint-book-content/jsninja/hello.htm") }, false);
api.addEventListener("click", function(){ request("http://ip.jsontest.com/") }, false);
// var form = document.forms.hero;
// form.addEventListener("submit", makeHero, false);
function request(url) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            myip = JSON.parse(xhr.response);
            alert(myip.ip);
            document.getElementById("output").innerHTML = xhr.responseText;
        }
    }
    xhr.open("GET", url, true);
    xhr.send();
    document.getElementById("output").innerHTML = "Waiting for response ...";
}


function makeHero(event) {
    event.preventDefault(); // prevent the form from being submitted
    var hero = {}; // create an empty object
    hero.name = form.name.value; // create a name property based on the input field's value
    send(JSON.stringify(hero));
}

function send(hero) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://httpbin.org/post", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4 && xhr.status === 201) {
            console.log(xhr.responseText);
        }
    };
    xhr.send(hero);
}




