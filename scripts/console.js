function Log( a_msg, a_important )
{
	if(typeof(a_important)==='undefined') a_important = false;

	var console_li = $("<li></li>").html(a_msg);
	$('#console-list').append( console_li );

	var max_size = 128;
	console.log($('#console-list').size());
	if ( $('#console-list li').size() > max_size )
	{
		$('#console-list li:first-child').remove();
	}

	$('#console-content').scrollTop($('#console-content')[0].scrollHeight);
}