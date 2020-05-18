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
                    if (data.password == password) {
                        setCookie("username", data.username);
                        setCookie("status", data.status);
                        setCookie("userId", data.id);
                        setCookie("password", data.password);

                        if (data.status == 2) {
                            location.href = "./university/home.html";
                        }
                        else if (data.status == 3) {
                            location.href = "./organization/home.html";
                        }
                    }
                    else {
                        $("#" + msgid + " .close").alert("close");
                        $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Invalid Credentials</div>");
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

    



    function isEmpty(str, id, msgid) {
        $("#" + msgid + " .close").alert("close");
        if (str.length == 0) {
            $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Empty credetials.</div>");
            return true;
        }
        
        return false;
    }
});