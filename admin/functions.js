/**
 * @author arnab
 */
var check = false;
$(document).ready(function(){
	$("#loader").hide();
    $(".selectHead").click(function(){
        $(".selectRow").each(function(){
            $(this).attr("checked", $(".selectHead").attr("checked"));
            if ($(this).attr("checked")) 
                $(this.parentNode.parentNode).addClass("rowclick");
            else 
                $(this.parentNode.parentNode).removeClass("rowclick");
        });
    });
    $(".dataTable td").mouseover(function(){
        $(this.parentNode).addClass("rowhover");
    });
    $(".dataTable td").click(function(){
        if (!$(this.parentNode).hasClass("rowclick")) {
            $(this.parentNode).addClass("rowclick");
            $(".rowclick input").attr({checked:"true"});
        }
        else {
            $(this.parentNode).removeClass("rowclick");
            $(".rowclick input").attr({checked:"false"});
        }
        
        
    });
    $(".dataTable td").mouseout(function(){
        $(this.parentNode).removeClass("rowhover");
    });
    $(".selectRow").click(function(){
        if ($(this).attr("checked")) {
            $(this.parentNode.parentNode).addClass("rowclick");
        }
        else 
            $(this.parentNode.parentNode).removeClass("rowclick");
    });
    $(".selectRow").each(function(){
        $(this).attr("checked", $(".selectHead").attr("checked"));
        if ($(this).attr("checked")) 
            $(this.parentNode.parentNode).addClass("rowclick");
        else 
            $(this.parentNode.parentNode).removeClass("rowclick");
    });
    $('ul.icontext li').hover(function(){
        $(this).addClass('ui-state-hover');
    }, function(){
        $(this).removeClass('ui-state-hover');
    });
    $("#addNewDialog").dialog({
        autoOpen: false,
        width: 600,
        buttons: {
            "Ok": function(){
                if (document.getElementById("license_name").value == "" || document.getElementById("license_key").value == "") {
                    document.getElementById("msg_add_new").innerHTML = "Please provide license name  and valid license key. ";
                }
                else {
                    $(this).dialog("close");
                    document.form2.submit();
                }
                
            },
            "Cancel": function(){
                $(this).dialog("close");
            }
        }
    });
    $("#addNew").click(function(){
        $('#addNewDialog').dialog('open');
        return false;
    });
    $("#viewReportDialog").dialog({
        autoOpen: false,
        width: 600,
        buttons: {
            "Ok": function(){
            
                $("input.selectRow").each(function(){
                    if ($(this).attr("checked")) 
                        check = true;
                });
                if (!check) {
                    document.getElementById("msg").innerHTML = "Please select one license.";
                }
                else {
                    check = false;
                    if (document.getElementById("date1").value == "" || document.getElementById("date2").value == "") {
                        document.getElementById("msg").innerHTML = "Please provide start date / end date. ";
                    }
                    else {
                        $(this).dialog("close");
                        $("#form_type").attr({value:"report"});
                        document.getElementById("form1").appendChild(get_input_hidden("date1"));
                        document.getElementById("form1").appendChild(get_input_hidden("date2"));
                        document.getElementById("form1").appendChild(get_input_hidden("form_type"));
                        document.form1.submit();
                    }
                    
                }
                
            },
            "Cancel": function(){
                $(this).dialog("close");
            }
        }
    });
    $("#deleteLicenseDialog").dialog({
        autoOpen: false,
        width: 600,
        buttons: {
            "Ok": function(){
		    	 $("input.selectRow").each(function(){
		             if ($(this).attr("checked")) 
		                 check = true;
		         });
		         if (!check) {
		             document.getElementById("msg1").innerHTML = "Please select one license.";
		         }
		         else{
		        	 $("#form_type").attr({value:"delete"});
		        	 document.form1.submit();
		         }
            },
            "Cancel": function(){
                $(this).dialog("close");
            }
        }
    });
    $("#viewReport").click(function(){
        $("#form_type").attr("value", "report");
        $('#viewReportDialog').dialog('open');
        return false;
    });
    $("#deleteSelected").click(function(){
        $("#form_type").attr("value", "delete");
        $('#deleteLicenseDialog').dialog('open');
        return false;
    });
    $('#date1').datePicker({
        startDate: '01/01/1970',
        clickInput: true
    });
    $('#date1').change(function(){
        document.getElementById('date2').value = document.getElementById('date1').value;
        $('#date2').datePicker({
            startDate: document.getElementById('date1').value,
            clickInput: true
        });
    });
    $("#logout").click(function(){
        location.href = "logout";
    });
    
    $("#login").dialog({
        autoOpen: true,
        width: 600,
        buttons: {
        
            "Sign Up": function(){
                location.href = "register";
            },
            "login": function(){
                if (document.getElementById("username").value == "" || document.getElementById("password").value == "") {
                    document.getElementById("msg_add_new").innerHTML = "Please provide username  and password. ";
                }
                else {
                    document.form1.submit();
                }
                
            },
        }
    });
    $(".submit_delete").each(
    		function (){
    			$(this).click(function (){
    				$("#deleteLicenseDialog").dialog("open");
    			});
    		});
    $(".submit_view").each(
    		function (){
    			$(this).click(function (){
    				$("#viewReportDialog").dialog("open");
    			});
    		});
    $("#Search").click(function (){
    	$("#loader").show();
    	 $("#data1").load(Base64.encode($("#uniqueid").val())+"/sdate/"+Base64.encode($("#date1").val())+"/edate/"+Base64.encode($("#date2").val()),{"type":"ajax"},function (){
    		 $("#loader").hide();
    	 });
    	 
    });
    $("#profileDialog").dialog({
	        autoOpen: false,
	        width: 600,
	        buttons: {
	           
	            "Close": function(){
    				$(this).dialog('close');
	            }
	                
	            }
	    
	  });
    
});
function confirmation(id,name) { // clear the job log at admin panel
	var answer = confirm("Do you want clear the "+name+ " file")
	if(answer)	 	$.getJSON('emptyfile/id/'+id+'/name/'+name, function(json){ alert(json);});
}
function profile(id,name) {
	$.getJSON('profile/id/'+id+'/name/'+name, function(json){
		if(json.error) { $("#error").html(json.error);
		
		$("#types").hide();
		$("#durations").hide();
		$("#signs").hide();
		$("#vdates").hide();
		$("#idss").hide();
		}
		else {
			$("#error").empty();
			$("#type").html(json.type);
			$("#duration").html(json.duration);
			$("#sign").html(json.signature);
			$("#vdate").html(json.vdate);
			$("#ids").html(json.unicode);
		}
		$('#profileDialog').dialog('open');
	});	  
}
function get_input_hidden(id){
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", document.getElementById(id).name);
    input.setAttribute("value", document.getElementById(id).value);
    return input;
}
