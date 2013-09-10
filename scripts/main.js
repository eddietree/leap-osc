$(function() 
{
    // handle press button
    $( "#input-connect-btn" ).click(function() 
    {
        var val = $('#input-port');
        g_osc.connect( $('#input-ip').val(), $('#input-port').val() );
    });

    $('#title-brand').tooltip({ placement: "right" });
    $(".alert").alert();
});

