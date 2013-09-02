/*!
 * fabric.js
 */

$(function() { // Responsive loading of various images based on resolution
	var res = $('#resolution').css('font-size').slice(0,-2);
	
	if (res != '1'){ // Get @media resolution size break
		$('img').each(function(){ // Replace img with one more appropriate
			var $t = $(this);
			var og = $t.attr('src');
			var parts = $t.attr('src').split(".");
			var altered = parts[0] + '-' + res + '.' + parts[1];

			$.ajax({ // Check to see if new image exists
				url: altered,
				type: 'HEAD',
				success: function(){ $t.attr('src', altered) },
				error: function(){ $t.attr('src', og) }
			});
		});
	}

});


$(function() { //Contact Form
	$('#contactform').submit( submitForm );
	
	$('.error').hide();
	$('input.text-input').css({backgroundColor:"#FFFFFF"});
	$('input.text-input').focus(function(){
		$(this).css({backgroundColor:"#FFDDAA"});
	});
	$('input.text-input').blur(function(){
		$(this).css({backgroundColor:"#FFFFFF"});
	});
});
			
// Submit the form via Ajax
function submitForm() {
	var contactForm = $(this);
 
	// validate and process form
	// first hide any error messages
    $('.error').hide();

	var name = $("input#name").val();
	if (name == "") {
    	$("label#name_error").show();
    	$("input#name").focus();
    	return false;
    }
	var email = $("input#email").val();
	if (email == "") {
    	$("label#email_error").show();
    	$("input#email").focus();
    	return false;
    }
	var comments = $("textarea#comments").val();
	if (comments == "") {
    	$("label#comments_error").show();
		$("input#comments").focus();
		return false;
	}

	$.ajax( {
		url: contactForm.attr( 'action' ) + "?ajax=true",
		type: contactForm.attr( 'method' ),
		data: contactForm.serialize(),
		success: submitFinished
	});
 	// Prevent the default form submission occurring
	return false;
}

// Handle the Ajax response
function submitFinished( response ) {
	var messageDelay = 2000;
	response = $.trim( response );
 
	if ( response == "success" ) {
	    // Form submitted successfully:
	    // 1. Display the success message
	    // 2. Clear the form fields
	    // 3. Fade the content back in
		$('#successMessage').fadeIn().delay(messageDelay).fadeOut();
		$('#name').val( "" );
		$('#email').val( "" );
		$('#comments').val( "" );
	} else {
		// Form submission failed: Display the failure message,
		// then redisplay the form
		$('#failureMessage').fadeIn().delay(messageDelay).fadeOut();
	}
}

