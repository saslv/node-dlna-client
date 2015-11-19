$(function(){
	$.getJSON("http://localhost:8081/api/devices?callback=?", function(json){
		var html = '<option>Select device</option>';
	    	for(var i in json.devices){
	    		var device = json.devices[i];

	    		html += '<option value="'+device.host+'">'+device.name+' ('+device.type+')</option>';
	    	}
	    	$('#device').html(html);
	});

	$('#play').click(function(e){
		e.preventDefault();

		$.getJSON('http://localhost:8081/api/playmedia?device='+$('#device').val()+'&mediaURL=' + encodeURIComponent($('#mediaURL').val()) + '&callback=?', function(json){
			if(json.status != 'OK'){
				alert(json.status + ': ' + json.message);
			}else{
				$('#mediaURL').val('');
			}
		});
	});

	$('#stop').click(function(e){
		e.preventDefault();

		$.getJSON('http://localhost:8081/api/stopmedia?device='+$('#device').val()+ '&callback=?', function(json){
			if(json.status != 'OK'){
				alert(json.status + ': ' + json.message);
			}
		});
	});
});
