define(["jquery", "./users", "bootstrap"], function ($, users) {

    $(document).ready(function() {
        $.ajaxSetup({
            beforeSend: function() {
               $('#loading').show();
            },
            complete: function(){
               $('#loading').hide();
            },
            success: function() {}
        });

        users.init();
    });

});
