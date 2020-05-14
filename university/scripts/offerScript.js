$(document).ready(function () {
    viewAll();
    $(".test").click(function () {
        alert($(this).val());
    });

    $("#create").click(function () {
        $('html, body').animate({
            scrollTop: $("#createSection").offset().top
        }, 1000);
    });
    $("#viewAll").click(function () {
        viewAll();
    });

    $("#submit").click(function () {
        postData();
    });

    function viewAll() {
        loadData();
        $('html, body').animate({
            scrollTop: $("#allOfferSection").offset().top
        }, 1000);
    }

    function postData() {
        var d = new Date();
        var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();
        var username = getCookie("username");
        var password = getCookie("password");
        $.ajax({
            url: "https://localhost:44348/api/universities/" + getCookie("uniId") + "/offers",
            method: "post",
            headers: {
                ContentType: "application/json",
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            data: {
                title: $("#title").val(),
                description: $("#desc").val(),
                offeredDegree: $("#degree").val(),
                requirements: $("#req").val(),
                deadline: $("#deadline").val(),
                startDate: strDate
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 201) {
                    viewAll();
                }
                else {
                    alert(xmlHttp.status + "\n" + xmlHttp.responseJSON);
                }
            }

        });
    }

    function loadData() {
        
        var username = getCookie("username");
        var password = getCookie("password");
        $.ajax({
            url: "https://localhost:44348/api/universities/" + getCookie("uniId") + "/offers",
            method: "get",
            headers: {
                ContentType: "application/json",
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            complete: function (xmlHttp, status) {
                
                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    var str = "";
                    for (var i = 0; i < data.length; i++) {
                        var deadline = (data[i].deadline.split("T"))[0];
                        str += "<tr><td>" + data[i].id + "</td><td>" +
                            data[i].title + "</td><td>" +
                           deadline + "</td><td>" +
                            "<button class=\"btn btn-primary mr-1 view\" value=\"" + data[i].id + "\">View</button>" +
                            "<button class=\"btn btn-primary mr-1 edit\" value=\"" + data[i].id + "\">Edit</button>" +
                            "<button class=\"btn btn-danger remove\" value=\"" + data[i].id + "\">Remove</button></td></tr>";
                    }
                    $("#offers").html(str);
                }
                else {
                    alert(xmlHttp.status + "\n" + xmlHttp.responseXML);
                }
            }

        });
    }
});