function Log( a_msg, a_important )
{
	if(typeof(a_important)==='undefined') a_important = false;

	var console_li = $("<li></li>").html(a_msg);
	$('#console-list').append( console_li );

	var max_size = 128;
	if ( $('#console-list li').size() > max_size )
	{
		$('#console-list li:first-child').remove();
	}

	$('#console-content').scrollTop($('#console-content')[0].scrollHeight);
}

function ShowErrorMsg( a_title, a_msg )
{
	var inner = '<div class="alert alert-danger fade in"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span class="glyphicon glyphicon-warning-sign"></span> <strong>' + a_title + '</strong> ' + a_msg + '</div>';
	var dom_item = $(inner);

	$('#warning-zone').append( dom_item );
}