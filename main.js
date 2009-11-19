
function allFlashVars(){
	this.reloadFlash = "false";
	this.reloadFlash1 = "false";
	this.reloadFlash2 = "false";
	this.chart1 = "false";
	this.chart2 = "false";
	this.chart3 = "false";
	this.chart4 = "false";
}
	var all=new allFlashVars();
	all["reloadFlash"] = "false";
	all["reloadFlash1"] = "false";
	all["reloadFlash2"] = "false";
	all["chart1"] = "false";
	all["chart2"] = "false";
	all["chart3"] = "false";
	all["chart4"] = "false";
	
	
	
function main() {
	this.path = "http://localhost/web-smb/index.php/report/";
	this.IE = $.browser.msie;
	this.safari = $.browser.safari;
	this.mozila = $.browser.mozila;
	this.opera = $.browser.opera;
	this.browserversion = jQuery.browser.version.substr(0, 3);
	this.colorList = new Array('#396c9f', '#6ea558', '#eeb04b', '#cc423c',
			'#84528d', '#909393', '#26a4ed', '#f45a90', '#e9e744');

	this.setJSONdata = function(data, currentPage) {
		$("#numsave").html(data.savedpages);
		$("#numpage").html(data.totalpages);
		$("#saveamt").html(data.scost);
		$("#spentamt").html(data.spcost);
		$("#numtree").html(data.tree);
		$("#numlbs").html(data.co2);
		$("#access").html(data.last);
		$("#nusers").html(data.nuser);
		switch (currentPage) {
		case 'overview': 			this.overview(data.overview);			break;
		case 'users':				this.userPage(data.user);				break;
		case 'workstation':			this.wspage(data.ws);					break;
		case 'printer':				this.printerpage(data.printer);			break;
		case 'application':			this.applicationpage(data.application);	break;
		case 'usersummary':			this.usersummary(data.usummary);		break;
		case 'wssummary':			this.wssummary(data.wssummary);			break;
		}
	};
	this.userPage = function(usersobj) { /* create table for the user page */
		var header= new Array("User Name","Printed Pages","Saved Pages","Cost","Saving","IP","Last Print Job");
		var fields= new Array("name","print","save","Cost","Saving","ip","dates");		
		var values=generateTable('userpage',header,fields,usersobj);
		$("#usersTable").html(values).ready(function() {
		$("#usersTable table:first").tablesorter({sortList:[[1,1]], widgets: ['zebra']});	});
	};
	/* Workstation pages */

	this.wspage = function(wsobj) {
		var header= new Array("Workstations","Printed Pages","Saved Pages","Cost","Saving","Number of Users","IP","Last Print Job");
		var fields= new Array("name","print","save","spent","saving","users","ip","date");
		var values=generateTable('workstationpage',header,fields,wsobj);
		$("#wsTable").html(values).ready(function(){
			$("#wsTable table:first").tablesorter({sortList:[[1,1]], widgets: ['zebra']});
		});
	};
	/* print pages */
	this.printerpage = function(ptobj) {
		var header= new Array("Printer Name","Driver Name","Color","Duplex Capable","Printed Pages","Saved Pages","Cost","Saving","Number of Users","Port Name","Last Print Job");
		var fields= new Array("name","driver","color","duplex","print","save","spent","saving","users","port","dates");
		var values=generateTable('printers',header,fields,ptobj);
		$("#printerTable").html(values).ready(function(){
			$("#printerTable table:first").tablesorter({sortList:[[1,1]], widgets: ['zebra']});
		});
	};

	/* application pages */
	this.applicationpage = function(apobj) {
		var header= new Array("Application","Printed Pages","Saved Pages","Cost","Saving","Number of Users","Last Print Job");
		var fields= new Array("appname","print","save","cost","saving","users","lastjob");
		var values=generateTable('printers',header,fields,apobj);
		$("#appTable").html(values).ready(function(){
			$("#appTable table:first").tablesorter({sortList:[[1,1]], widgets: ['zebra']});
		});
	};

	/** *user summary page */
	this.usersummary = function(userobj) {
		/* print summary table */
		var header= new Array("Date","Printed","Saved",'Non GreenPrint','PDF\'s','Cost','Save');
		var fields= new Array("dates","print","save","NGP","PGP","spcost","scost");
		var values=generateTable('1',header,fields,userobj.linechart);
		$("#printsummarys").html(values).ready(function(){
			if(userobj.linechart.length != 0) $("#printsummarys table:first").tablesorter({sortList:[[1,1]], widgets: ['zebra']});
		});
		
		/* application table */
		header= new Array("Application",'Printed Pages','Saved Pages','Cost','Saved','Numbers of users','Last Print Job');
		fields= new Array("appname","print","save","spent","scost","users","date");
		values=generateTable('application',header,fields,userobj.application);
		$("#applicationDiv").html(values).ready(function(){
			if(userobj.application.length != 0) $("#applicationDiv table:first").tablesorter({sortList:[[1,1]], widgets: ['zebra']});
		});
		/* printer Table */
		header= new Array("PrinterName","Driver Name","Color",'Duplex Capable','Printed Pages','Saved Pages','Cost','Saved','Port Name','Last Print Job');
		fields= new Array("name","driver","color","duplex","print","save","spcost","scost","port","date");
		values=generateTable('print',header,fields,userobj.pntable);
		$("#printers").html(values).ready(function(){
			if(userobj.pntable.length != 0)$("#printers table:first").tablesorter({sortList:[[1,1]], widgets: ['zebra']});
		});
	};

	/** Workstation summary pages* */
	this.wssummary = function(userobj) {
		/* print summary table */
		var header= new Array("Date","Printed","Saved",'Non GreenPrint','PDF\'s','Cost','Save');
		var fields= new Array("dates","print","save","NGP","PGP","spcost","scost");
		var values=generateTable('1',header,fields,userobj.linechart);
		$("#ptsummarys").html(values).ready(function(){
			if(userobj.linechart.length != 0) $("#ptsummarys table:first").tablesorter({sortList:[[1,1]], widgets: ['zebra']});
		});
		
		/* application table */
		header= new Array("Application",'Printed Pages','Saved Pages','Cost','Save','Numbers of users','Last Print Job');
		fields= new Array("appname","print","save","spent","scost","users","date");
		values=generateTable('application',header,fields,userobj.application);
		$("#applicationDiv").html(values).ready(function(){
			if(userobj.application.length != 0)$("#applicationDiv table:first").tablesorter({sortList:[[1,1]], widgets: ['zebra']});
		});
		/* printer Table */
		header= new Array("PrinterName","Driver Name","Color",'Duplex Capable','Printed Pages','Saved Pages','Cost','Save','Port Name','Last Print Job');
		fields= new Array("name","driver","color","duplex","print","save","spcost","scost","port","date");
		values=generateTable('print',header,fields,userobj.pntable);
		$("#printers").html(values).ready(function(){
			if(userobj.pntable.length != 0)$("#printers table:first").tablesorter({sortList:[[1,1]], widgets: ['zebra']});
		});
	};
	/** *Overview page */
	this.overview = function(userobj) {
		/* print summary table */
		//alert(userobj);
		var header= new Array("Date","Printed","Saved",'Non GreenPrint','PDF\'s','Cost','Save');
		var fields= new Array("dates","print","save","NGP","PGP","spcost","scost");
		var values=generateTable('1',header,fields,userobj.linechart);
		$("#usersTable").html(values).ready(function(){
			if(userobj.linechart.length != 0) $("#usersTable table:first").tablesorter({sortList:[[1,1]], widgets: ['zebra']});
		});
		/* application table */
		header= new Array("Application",'Printed Pages','Saved Pages','Cost','Save','Numbers of users','Last Print Job');
		fields= new Array("appname","print","save","spent","scost","users","date");
		values=generateTable('application',header,fields,userobj.application);
		$("#appTable").html(values).ready(function(){
			if(userobj.application.length != 0) $("#appTable table:first").tablesorter({sortList:[[1,1]], widgets: ['zebra']});
		});
		/* printer Table */
		header= new Array("PrinterName","Driver Name","Color",'Duplex Capable','Printed Pages','Saved Pages','Cost','Saved','Port Name','Last Print Job');
		fields= new Array("name","driver","color","duplex","print","save","spcost","scost","port","date");
		values=generateTable('print',header,fields,userobj.pntable);
		$("#printerTable").html(values).ready(function(){
			if(userobj.pntable.length != 0) $("#printerTable table:first").tablesorter({sortList:[[1,1]], widgets: ['zebra']});
		});
	
	}

};

/* * 

getVars() function is getting called from flash files periodically. depending upon the true condition of the flash components are making HTTP request and updating chart data.


* */


function getvars(val) {
var out=all[val];
all[val]=false;
	return out;
}


function setvars(key, val) {
	all[key]=val;
	//alert( key+"="+all[key]);
}
function getCookie(val) {
		return all[val];
}
function reloadFlashVars(){	
	all["reloadFlash"]="true";
	all["reloadFlash1"]="true";
	all["reloadFlash2"]="true";
	all["chart1"]="true";
	all["chart2"]="true";
	all["chart3"]="true";
	all["chart4"]="true";
}

function setCookie(key,val){
//alert( "type=set&key="+key+"&val="+val);
	var html = $.ajax({
		  url: base_url+"report/ajax/",
		  data: "type=set&key="+key+"&val="+val,
		  type: "POST",
		  success:function (msg){
			setvars(key,val);
			reloadFlashVars();
			//alert(msg);
		  }
		 });
}

function setSession(key,val){
	var html = $.ajax({
		  url: base_url+"report/ajax/",
		  data: "type=set&key="+key+"&val="+val,
		  type: "POST"
		 }).responseText;
}
function getSession(val){
	var html = $.ajax({
		  url: base_url+"ajax/setSession.php",
		  async: false,
		  data: "type=get&key="+val,
		  type: "POST"}).responseText;
return html;
}

function generateTable(id,header,fields,data) {

	var count=0;
	var content = "";
	content +="<table id='tablesorter-"+id+"' class='tablesorter' border='0' cellpadding='1' cellspacing='1'><thead><tr>"; // create table
		for(i=0;i<header.length;i++){ // add the header (td)
			content +="<th  id='_"+i+"_"+id+"'>"+header[i]+"</th>";
		}
		content +="</tr></thead><tbody>";
		
	if(data.length==0) content +="<tr><td colspan='"+header.length+"'>No record found!</td></tr>"; // no data found
	else {
		for(i=0;i<data.length;i++){ // get all the content
			if(typeof(data[i])=='undefined' || data[i]=="") break;
			count=0;
				for (j=0;j<fields.length;j++){ // print the content only required fields 
					if(typeof(data[i][fields[j]])!='undefined' || data[i][fields[j]]!="")
					{
						if(id== 'workstationpage' && count==0) {//it is for workstation summary page
							content +="<tr><td class='searchField' id='_"+j+"_"+id+"_"+i+"'><a href='wssummary/id/"+data[i].id+"//name/"+data[i].name+"'>"+data[i][fields[j]]+"</a></td>";
						}
						else if(id=='userpage'  && count==0) {//it is for user summary page
							content +="<tr><td class='searchField' id='_"+j+"_"+id+"_"+i+"'><a href='usersummary/id/"+data[i].id+"//name/"+data[i].name+"'>"+data[i][fields[j]]+"</a></td>";
						}
						else if(count==0) content +="<tr><td class='searchField' id='_"+j+"_"+id+"_"+i+"'><span>"+data[i][fields[j]]+"</span></td>"; //except workstation and summary page
			 			else content +="<td id='_"+j+"_"+id+"_"+i+"'><span>"+data[i][fields[j]]+"</span></td>"; 
					}
		 			count=count=+1;
				}
				if(typeof(data[i][fields[j]])!='undefined') content +="</tr>";
		}
	}
	content +="</tbody></table>";
	return content;
}