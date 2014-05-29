/*******************************************************************************
* Copyright (c) 2014 Proxima Centauri srl <info@proxima-centauri.it>.
*  All rights reserved. This program and the accompanying materials
*  are made available under the terms of the GNU Public License v3.0
*  which accompanies this distribution, and is available at
*  http://www.gnu.org/licenses/gpl.html
*   
*  Contributors:
*      Proxima Centauri srl <info@proxima-centauri.it> - initial API and implementation
*******************************************************************************/

document.writeln("<script type='text/javascript' src='js/general.js'></script>");

function get_etichette(up_name,type){
	var total=new Array();
	$.ajax({
		dataType:"json",
		url:"http://10.10.10.50:8080/JeerpDa/confort/indicators/"+type+"_"+up_name+"/options",
		type: "GET",
		success:function(data){
			for(var i=0; i<data.length;i++){
				var obj=new Array(); 
				obj[0]=data[i].value;
				obj[1]=data[i].name;
				total.push(obj);
			}
			total=total.sort(compare);
		},
		error: function(x, t, r){
			console.log(x.response.message); 
		}
	});
	return total;
}

function do_gauge(up_name,type,opts,gauge){
	console.log("Sto eseguendo do gauge di "+type);
	var d_result=null;
	$.ajax({
		dataType:"json",
		url:"http://10.10.10.50:8080/JeerpDa/confort/indicators/"+type+"_"+up_name+"",
		type: "GET",
		
		success:function(data){
			if(typeof data.result=="undefined"){
				d_result=-3;
				var field = document.getElementById('gauge_description_'+type);
				field.style.color="red";
				field.innerHTML="NO VOTES IN THE LAST HOUR";
			}
			else if(data.result==0){
				d_result=null;
			}
			else{
				d_result=data.result;
				d_result=roundtwo(parseFloat(d_result));
			}
		},
		complete: function(){
			gauge.set(d_result);
		},
		error: function(x, t, r){
			console.log(x.response.message); 
		}
	});
	
}

function send(up_name,type,data_send){
	$.ajax({
  	  type : "POST",
  	  async:false,
  	  dataType : "json",
  	  url : "http://10.10.10.50:8080/JeerpDa/confort/indicators/"+type+"_"+up_name+"/votes",
  	  contentType : "application/json; charset=utf-8",
  	  data : JSON.stringify(data_send)
  	 }).done(function(data_send) {
  	  console.log("done");
  	  //location.reload();
  	 }).fail(function() {
  	  alert("Error, sending the vote");
  	 });
}

function resize(w1,w2){
	//gauge
	$('#temp').css({
		width : w1,
		height : w1 / 1.9
	});
	$('#hum').css({
		width : w1,
		height : w1 / 1.9
	});
	$('#air').css({
		width : w1,
		height : w1 / 1.9
	});
	//slider
	$('#slider_temp').css({
		width : w2/1.5
	});
	$('#slider_hum').css({
		width : w2/1.5
	});
	$('#slider_air').css({
		width : w2/1.5
	});
	$('#opinion').css({
		width : w2/1.5
	});
	$('#opinion_h').css({
		width : w2/1.5
	});
	$('#opinion_a').css({
		width : w2/1.5
	});
}


function valSens(){
	var sensori = GetURLParameter('power'); 

	var sensoriarray = sensori.split('|');
	var factor = 1;
	query_db = query_db;
	
	var initial_value=[];
	if(sensoriarray.length>=1){
		var now = (moment()/1000).toFixed(0);
		//faccio un ciclo che aggiunde uno spazione per ogni sensore
		for(var j=0; j<sensoriarray.length; j++){
			(function(j){
				var sens = sensoriarray[j];
				$("<span>").text(" W").appendTo(p);
				var ist_query = query_db+sens+"?end="+now+"&limit=1&reversed=true";
				$.ajax({
					url: ist_query,
					dataType: 'jsonp',
					success: function(data){
						initial_value[j] = data.measures[0].value;
						initial_value[j] = initial_value[j]*factor;
					}
				});
			})(j);
		}
		
		 setInterval(function(){
			var now2 = (moment()/1000).toFixed(0);
			var i=0;
			var ist_value = [];
			for(i = 0; i <sensoriarray.length; i++){
				(function(i){
					var sens = sensoriarray[i];
					var ist_query = query_db+sens+"?end="+now2+"&limit=1&reversed=true";
					$.ajax({
						url: ist_query,
						dataType: 'jsonp',
						success: function(data){
							ist_value[i] = data.measures[0].value;
							ist_value[i] = ist_value[i]*factor;
						}
					});
				})(i);
			}
		}, 10000); 
}
}
