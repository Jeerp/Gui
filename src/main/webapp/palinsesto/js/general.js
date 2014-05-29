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

var query_dwh ="https://verres.applus.polito.it/JeerpDa/bi/mdx?q=";
var query_db = "https://verres.applus.polito.it/JeerpDa/viewer/measure/";

var cube = "[Electric]";



// funzione arrotondamento a tre cifre
function round(value) {
	var round_value = (Math.round(value * 1000) / 1000);
	return round_value;
}

// funzione per prendere i parametri dall'URL
function GetURLParameter(sParam) {
	var sPageURL = window.location.search.substring(1);
	var sURLVariables = sPageURL.split('&');
	for ( var i = 0; i < sURLVariables.length; i++) {
		var sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
}

//funzione per conversione da stringa a data utc
function convertFromStringToUTCDate (dateString){
	var date_array = dateString.split('|');
	
//	console.log(date_array);
	if(date_array.length==3){
		date_utc =Date.UTC(date_array[0],date_array[1] - 1,date_array[2]);
	}
	else if (date_array.length==5){
		date_utc =Date.UTC(date_array[0],date_array[1] - 1,date_array[2],date_array[3],date_array[4]);
	}
//	console.log(date_utc);
	return date_utc;
	 
}

function fromTimestampToUTC (timestamp){
	var date = new Date(timestamp);
	//alert(date);
	var timezone = date.getTimezoneOffset();
	var utc = date.getTime() - (timezone*60*1000);
	return utc;
}
