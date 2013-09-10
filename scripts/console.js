function Log( a_msg, a_important )
{
	if(typeof(a_important)==='undefined') a_important = false;

	var console_li = $("<li></li>").html(a_msg);
	$('#console-list').append( console_li );

}