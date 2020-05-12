$(document).ready(function () {
    $("#login").click(function () {
        var username = $("#uname").val();
        var password = $("#pass").val();
        if (!(isEmpty(username, "#err", "errMsg") && isEmpty(password, "#err", "errMsg"))) {
            loadUser();

        }
    });

    function loadUser() {
        msgid = "errMsg";
        id = "#err";
        var username = $("#uname").val();
        var password = $("#pass").val();
        $.ajax({
            url: "https://localhost:44348/api/users/" + username + "/get",
            method: "get",
            headers: {
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            complete: function (xmlHttp, status) {

                if (xmlHttp.status == 200) {
                    // alert("content");
                    var data = xmlHttp.responseJSON;
                    setCookie("username", data.username);
                    setCookie("status", data.status);
                    setCookie("userId", data.id);
                    alert(getCookie("username") + "\n" + getCookie("status"));
                    if (data.status == 2) {
                        location.href = "./university/home.html";
                    }
                }   
                else {
                    //alert(getCookie("username") + "\n" + getCookie("status"));
                    //alert(xmlHttp.status);
                    //alert("error");
                    $("#" + msgid + " .close").alert("close");
                    $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Invalid Credentials</div>");
                    //flag= false;
                    
                }
            }
        });
    }

    function setCookie(cname, cvalue) {
       document.cookie = cname + "=" + cvalue;
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires;
    }


    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }




    function isEmpty(str, id, msgid) {
        $("#" + msgid + " .close").alert("close");
        if (str.length == 0) {
            $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Empty credetials.</div>");
            return true;
        }
        
        return false;
    }
});