define(["jquery", "lodash"], function ($, _) {

    function isIncludedInSearch(user, search) {
        if (typeof search === "undefined" || search === "") return true;
        search = search.toLowerCase();
        return ~user.name.toLowerCase().indexOf(search)
                || ~user.email.toLowerCase().indexOf(search);
    }

    function renderUsersList(users) {
        var search = $("#searchText").val();
        var compiledTemplate = _.template($("#userTemplate").html());
        var resultHtml = "";

        for (var i = 0, max = users.length; i < max; i++) {
            var user = users[i];
            if (isIncludedInSearch(user, search)) {
                resultHtml += compiledTemplate({user: user});
            }
        }

        $("#users").html(resultHtml);
    }


    function init() {
        var $modal = $("#modal");
        var users;

        $.ajax({
            type: "GET",
            url: "http://jsonplaceholder.typicode.com/users"
        }).done(function (data) {
            users = data;
            var renderFn = renderUsersList.bind(this, users);
            renderFn();
            $("#searchText").on("keyup", renderFn);
            $("#searchBtn").on("click", renderFn);

        }).fail(function() {
            alert("Ajax failed to fetch data");
        });

        $("#users").on("click", ".user-row", function() {
            var userId = $(this).data("user-id");
            var user = _.find(users, {id: userId});
            var modalHtml = _.template($("#modalTemplate").html())({user: user});
            $modal.html(modalHtml);
            $(".modal", $modal).modal({keyboard: true});
        });
    }

    return {
        init: init
    };

});
