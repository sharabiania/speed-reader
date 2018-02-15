/*
* MIT License
* Copyright (c) 2018 Ali Sharabiani
*/
"use strict";
var variable = function(element){
	return function () {
		if(arguments.length > 0) 
			element.value = arguments[0];					
	
		else return element.value;													
	}
}

var div = document.getElementById("a-text");                       
var progress = new variable(document.getElementById("a-progress"));
var s = 0;
var pause = true;			
var i = -1;
var words = [];
var id; // id of the last running interval/timer
var n = document.getElementById("a-select").value;
var test;
const initval = 100;

document.getElementById("a-input").value = 
"Paste some text that you want to speed read, then press \"Read\" button.\
\nYou can change the speed using the slider, or pause at any time.";
document.getElementById("a-slider").value = initval;
document.getElementById("a-label").innerText = initval;


document.getElementById("a-play").addEventListener('click', run);			
document.getElementById("a-slider").addEventListener('change', function(){
	document.getElementById('a-label').innerText = this.value;
	// TODO fix this formula.
	s = Math.floor((60 / (this.value / n)) * 1000);                
});   			
document.getElementById("a-select").addEventListener('change', function(){				
	n = this.value;
	var wpm = document.getElementById("a-slider").value;
	s = Math.floor((60 / (wpm / n)) * 1000); 
});
document.getElementById("a-prev").addEventListener('click', function(){	
	if(words.length === 0) return;		
	clearTimeout(id);
	var temp = "";
	   
	i -= 2*n;
	if(i < 2*n) { i = -1;}
	for(var j = 0; j < n; ++j)
	{
		if(i < words.length - 1)
			temp += words[++i];
	}
	
	div.innerText = temp;
	progress((i  / (words.length - 1)) * 100);
	if(pause === false) i-=n;
	loop();
});
document.getElementById("a-next").addEventListener('click', function(){				
		if(words.length === 0) return;
		clearTimeout(id);
		var temp = "";
		if(i >= words.length - 1) {
			i = words.length;	
			return;
		}
		for(var j = 0; j < n; ++j)
		{
			if(i < words.length - 1)
				temp += words[++i];
		}
		
		div.innerText = temp;
		progress((i  / (words.length - 1)) * 100);
		if(pause === false) i-=n;
		loop();									
});
		  

function loop(){
	if(pause === true) {
		clearInterval(id);
		return;
	}
	var temp = "";

	for(var j = 0; j < n; ++j)
	{
		if(i < words.length - 1)
			temp += words[++i];
	}
									
	if(i >= words.length - 1){
		i = words.length; 
		document.getElementById("a-play").className = "a-btn-play";
		pause = true;
	}
	else {
		id = setTimeout(loop, s, i);                    
	} 
	div.innerText = temp;
	progress((i  / (words.length - 1)) * 100);  
}


function run() {
	document.getElementById("a-slider").dispatchEvent(new Event('change'));
	document.getElementById("a-play").classList.toggle("a-btn-play");
	document.getElementById("a-play").classList.toggle("a-btn-pause");
	
	pause = !pause;
	if(pause === true) {	
		if(id !== undefined)			
			clearTimeout(id);					
		return;
	}

	var text = document.getElementById("a-input").value;              
	words = text.match(/\b(\w+\W+)/g);
	
	loop();
  
}

function reset() {                
	i = -1;
	progress(0);
}


