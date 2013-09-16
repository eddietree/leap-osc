$(function() 
{
    // handle press button
    $( "#input-connect-btn" ).click(function() 
    {
        var val = $('#input-port');
        g_osc.connect( $('#input-ip').val(), $('#input-port').val() );
    });

    // handle press button
    $( "#btn-settings" ).click(function() 
    {
    	$('#popover-settings').popover('show');
    });

    $('#title-brand').tooltip({ placement: "bottom" });
    $('#btn-scale').tooltip({ placement: "right" })
    $('#btn-delay').tooltip({ placement: "right" })
    $('#btn-settings').tooltip({ placement: "right" })
    $('#icon-connect-status').tooltip({ placement: "bottom" })

    $(".alert").alert();

	// Setup drop down menu
	$('.dropdown-toggle').dropdown();

	// Fix input element click problem
	$('.dropdown input, .dropdown label').click(function(e) {
		e.stopPropagation();
	});

  
});