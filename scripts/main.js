$(function() {
    handle_login();

    //$('#main-page').toggle(false);
    $('#login-form').toggle(false);

    $( "#tabs" ).tab();

    // add console tab
    g_console_tab = new Tab("console", "Console");
    g_console_tab.addToBoard();
    g_console_tab.makeActive();
    g_console_tab.appendMsg("HEYO");
    g_console_tab.appendMsg("brothaaaa");

    var test_test = new Tab("test_id", "title");
    test_test.addToBoard();
    test_test.appendMsg("TEST");
  });

