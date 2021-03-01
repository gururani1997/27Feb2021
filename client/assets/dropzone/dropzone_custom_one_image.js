var myDropzone;

Dropzone.options.myDropzone = {
	maxFiles : 1,
	init: function() {
	  var removeButton;
	  var _this;
	  var is_image_primary;
	  this.on("addedfile", function(file) {
		
	    // Capture the Dropzone instance as closure.
	    _this = this;

	  });
	  
	  this.on("success", function(file,responseText) {
	  
	  	// Create the remove button
		removeButton = Dropzone.createElement('<button class="btn btn-dropzone remove-image" image="'+responseText+'" type="button">Remove file</button>');
		is_image_primary = Dropzone.createElement('<div class="radio"><label style="font-size: 12px;"><input type="radio" name="primary" class="is-image-primary" value="'+responseText+'" checked>Make Primary</label></div>');
		
		// Listen to the click event
	    removeButton.addEventListener("click", function(e) {
	      // Make sure the button click doesn't submit the form:
	      e.preventDefault();
	      e.stopPropagation();
			
		  var image_name = $(this).attr('image');	
		  
		  $('#uploaded-image input[value="'+image_name+'"]').remove();
		  
	      // Remove the file preview.
	      _this.removeFile(file);
	      
	      // If you want to the delete the file on the server as well,
	      // you can do the AJAX request here.
	     var getUrl = window.location;
         var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
        
	      $.ajax({type: "POST",
          	url: ""+baseUrl+"/admin/dropzone/deleteFiles/"+image_name,
            //data: { id: $("#Shareitem").val(), access_token: $("#access_token").val() },
            success:function(result){
            	console.log("========="+result);
          }});
          
	    });
	    
		// Add the button to the file preview element.
	    file.previewElement.appendChild(removeButton);
	    
	    //Add radio button for making image primary
	    file.previewElement.appendChild(is_image_primary);
	    	
		     $('#uploaded-image').append('<input type="hidden" value="'+responseText+'" name="ad_images[]">');
		     var fileonserver = responseText; // response is the file on the server
		     file.name = fileonserver; // IF THIS ONLY WORKED i would solve my problem 
		});
	}
};

$(document).ready(function(){
	$('.remove-image-update').click(function(){
		
		var getUrl = window.location;
        var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
		
		var image_name = $(this).attr('image');	
		$(this).parent().remove();
		$.ajax({type: "POST",
          	url: ""+baseUrl+"/admin/dropzone/deleteFiles/"+image_name,
            //data: { id: $("#Shareitem").val(), access_token: $("#access_token").val() },
            success:function(result){
            	console.log("========="+result);
          }});
		$('#uploaded-image input[value="'+image_name+'"]').remove();
	});
});



/**************************
*
*	EXT - for the quotes
*
**************************/
$(document).ready(function(){
    $('button.last_page_back, .back').click(function(){
        window.history.back()
        //return false;
    });

});




