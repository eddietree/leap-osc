var g_tabs = {};
var g_console_tab;

function Log(a_msg)
{
	g_console_tab.appendMsg(a_msg);
}

// raw channel name is something like "#funktronic"
function GetChannelId( a_raw_channel_name )
{
	// TODO: handle special characters etc
	// basically need to convert to a symbol that has 
	// no spaces and no special characters
	return a_raw_channel_name.substring(1);
}


function Tab( a_id, a_title )
{
	this.id = a_id; // only string
	this.title = a_title;
	this.dom_tab = null;
	this.dom_content = null;
	this.unread_count = 0;

	this.addToBoard = function()
	{
		this.dom_tab = $('<li><a href="#' + this.id + '" data-toggle="tab"> </a></li>');
		$("#tabs").append( this.dom_tab );

		//this.dom_content = ('<div class="tab-pane fade" id="' + this.id + '"><ul class="tab-msgs"></ul></div>');
		this.dom_content = $('<div class="tab-pane fade" id="' + this.id + '"><div class="row"><div class="col-md-9"><table class="chat-msgs table table-hover"></table></div><div class="col-md-3">friends</div></div>');
		$("#tabs-content").append( this.dom_content );

		g_tabs[a_id] = this;

		this._updateTabBadge();
	}

	this.onMakeActive = function()
	{
		this.unread_count = 0;
		this._updateTabBadge();
	};

	this.isActive = function()
	{
		return this.dom_tab.hasClass("active");
	};

	this._updateTabBadge = function()
	{
		var badge = null;
		var badges_found = this.dom_tab.find('span.badge');

		// grab first badge
		if ( badges_found.length != 0 )
			badge = badges_found.first(); 

		// remove previous badge
		if ( badge ) badge.remove();
	
		if ( this.unread_count != 0 )
		{
			// create badge if does not exist
			badge = $('<span class="badge">' + this.unread_count + '</span>');

			// update badge
			this.dom_tab.find('a').first().html( this.title + ' ' + badge[0].outerHTML);
		}
	}

	this.appendMsg = function( a_msg )
	{
		//var list = this.dom_content.find("ul");
		var list = $("#"+this.id).find("table").first();
		list.append("<tr><td>" + a_msg + "</td></tr>");

		if ( true || !this.isActive() )
		{
			this.unread_count++;
			this._updateTabBadge();
		}
	};

	this.makeActive = function()
	{
		$('#tabs a[href="#'+this.id+'"]').tab('show');
	}

	this.removeFromBoard = function()
	{
		this.dom_tab.remove();
		this.dom_content.remove();
	}
}

function handle_login()
{
	$('#login').button();

	$('#login').on('click', function (e) 
	{ 
		e.preventDefault();
		$('#login').button('loading');

		var username = $('#irc-username').val();
		var server = $('#irc-server').val();

		g_funk_irc = FunkIrc( server,  username );
	});
}