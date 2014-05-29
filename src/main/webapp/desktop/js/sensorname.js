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

var sensorname = [];
var root;
var num_children;
var list ='';
var num_root;
		
//construct the url for the ajax request
//have a default value 
var url = "";
var datatype="jsonp";

$(document).ready(function(){
	
	url = "menustructure/treeServerFarm.json";
	datatype="json";
	
//ajax request
	$.ajax({
		url: url,
		type : "GET",
		dataType : datatype,
		success: function(data){
			console.log("sensor name success");
			root = data;
			num_root = root.length;
		},
		error: function(xhr, ajaxOptions, thrownErrorxhr){
			console.log("sensor name error:");
			console.log(xhr.status);
			console.log(thrownErrorxhr.message);
		},
		complete: function(qXHR, textStatus){
			
			//lo devo ripetere per tante volte quanti sono gli edifici, cioè tutte le radici del json
			
			for(var i = 0; i < num_root; i++){
				
				getSensorname(root[i]);

			}
			console.log("complete");
			console.log(sensorname);
		}
	});
});
		


function getSensorname(root){
	console.log(root);
	//se ha dei children devo richiamare getSensorname
	if(typeof root.children !='undefined'){
		//richiamo di nuovo getSensorname sui children di root
		for(var j =0; j<root.children.length; j++){
			getSensorname(root.children[j]);
		}
		
	}
	//se ha dei drain devo aggiungerli al vettore
	if(typeof root.drains !== 'undefined'){
		for(var i = 0 ; i < root.drains.length ; i++){
			//per ogni drain devo avere associazione id drain - nome drain
			sensorname[root.drains[i].id] = root.drains[i].alias;

		}
	}
}
