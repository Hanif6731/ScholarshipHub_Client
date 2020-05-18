$(document).ready(function () {
    var un = getCookie("username");
    var pw = getCookie("password");
    //alert(un);
    if (un == "" || pw == "") {
        location.href = "../index.html";
    }
    var email = getCookie("email");
    loadData();

    $(document).on("click", ".delete", function () {
        var id = $(this).val();
        //alert(id);
        //loadDetails(id);
        deleteData(id);


    });

    $(document).on("click", ".view", function () {
        var id = $(this).val();
        //alert(id);
        loadDetails(id);


    });
    $("#send").click(function () {
        if (isValid()) { postData() };
        //$("#composeModal").modal("show");
    });
    $("#compose").click(function () {
        $("#composeModal").modal("show");
    });

    $("#all").click(function () {
        loadData();
    });

    $("#inbox").click(function () {
        loadInboxData();
    });
    $("#sent").click(function () {
        loadSentData();
    });

    function isValid() {
        var flags = [
            isNotEmpty($("#sub").val(),"#errSub", "msgSub"),
            isNotEmpty($("#emailBody").val(),"#errBody", "msgBody"),
            isEmail()
        ]
        //alert("check user: " + checkUser());
        for (i = 0; i < flags.length; i++) {
            if (flags[i] == false) {
                //alert(i);
                return false;
            }
        }
        return true;


    }

    function loadData() {
        $.ajax({
            url: "https://localhost:44348/api/messeges?email=" + email,
            method: "get",
            headers: {
                ContentType: "application/json",
                Authorization: "Basic " + btoa(un + ":" + pw)
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var str = "";
                    var data = xmlHttp.responseJSON;
                    for (var i = 0; i < data.length; i++) {
                        str += "<tr><td>" + data[i].fromUser + "</td><td>" +
                            data[i].toUser + "</td><td>" +
                            data[i].subject + "</td><td>" +
                            "<button class=\"btn btn-primary mr-1 view\" value=\"" + data[i].id + "\">View</button>" +
                            "<button class=\"btn btn-danger delete\" value=\"" + data[i].id + "\">Delete</button></td></tr>";
                        }
                    $("#messeges").html(str);
                }
                else {
                    alert(xmlHttp.status + "\n" + xmlHttp.responseText);
                }
            }
        });
    }

    function loadSentData() {
        $.ajax({
            url: "https://localhost:44348/api/messeges?email=" + email,
            method: "get",
            headers: {
                ContentType: "application/json",
                Authorization: "Basic " + btoa(un + ":" + pw)
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var str = "";
                    var data = xmlHttp.responseJSON;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].fromUser == email) {
                            str += "<tr><td>" + data[i].fromUser + "</td><td>" +
                                data[i].toUser + "</td><td>" +
                                data[i].subject + "</td><td>" +
                                "<button class=\"btn btn-primary mr-1 view\" value=\"" + data[i].id + "\">View</button>" +
                                "<button class=\"btn btn-danger delete\" value=\"" + data[i].id + "\">Delete</button></td></tr>";
                        }
                    }
                    $("#messeges").html(str);
                }
                else {
                    alert(xmlHttp.status + "\n" + xmlHttp.responseText);
                }
            }
        });
    }

    function loadInboxData() {
        $.ajax({
            url: "https://localhost:44348/api/messeges?email=" + email,
            method: "get",
            headers: {
                ContentType: "application/json",
                Authorization: "Basic " + btoa(un + ":" + pw)
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var str = "";
                    var data = xmlHttp.responseJSON;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].toUser == email) {
                            str += "<tr><td>" + data[i].fromUser + "</td><td>" +
                                data[i].toUser + "</td><td>" +
                                data[i].subject + "</td><td>" +
                                "<button class=\"btn btn-primary mr-1 view\" value=\"" + data[i].id + "\">View</button>" +
                                "<button class=\"btn btn-danger delete\" value=\"" + data[i].id + "\">Delete</button></td></tr>";
                        }
                    }
                    $("#messeges").html(str);
                }
                else {
                    alert(xmlHttp.status + "\n" + xmlHttp.responseText);
                }
            }
        });
    }

    function loadDetails(id) {
        $.ajax({
            url: "https://localhost:44348/api/messeges/"+id,
            method: "get",
            headers: {
                ContentType: "application/json",
                Authorization: "Basic " + btoa(un + ":" + pw)
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var str = "";
                    var data = xmlHttp.responseJSON;
                    time = data.time;
                    if (time != null) {
                        time = time.split("T")[0];
                    }
                    $("#time").html(time);
                    $("#from").html(data.fromUser);
                    $("#to").html(data.toUser);
                    $("#subject").html(data.subject);
                    $("#body").html(data.body);
                    $("#detailsModal").modal("show");
                }
                else {
                    alert(xmlHttp.status + "\n" + xmlHttp.responseText);
                }
            }
        });
    }

    function postData() {
        var d = new Date();
        var strDate = d.getFullYear() + "/" + (d.getMonth() + 1) + "/" + d.getDate();

        $.ajax({
            url: "https://localhost:44348/api/messeges",
            method: "post",
            headers: {
                ContentType: "application/json",
                Authorization: "Basic " + btoa(un + ":" + pw)
            },
            data: {
                fromUser: email,
                toUser: $("#toUser").val(),
                "subject": $("#sub").val(),
                "body": $("#emailBody").val(),
                "time": strDate
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 201) {
                    $("#composeModal").modal("hide");
                    loadData();
                }
                else {
                    alert(xmlHttp.status + "\n" + xmlHttp.responseText);
                }
            }
        });
    }

    function deleteData(id) {
        $.ajax({
            url: "https://localhost:44348/api/messeges/"+id,
            method: "delete",
            headers: {
                ContentType: "application/json",
                Authorization: "Basic " + btoa(un + ":" + pw)
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 204) {
                    //$("#composeModal").modal("hide");
                    loadData();
                }
                else {
                    alert(xmlHttp.status + "\n" + xmlHttp.responseText);
                }
            }
        });
    }

    function isEmail() {
        var id = "#errToUser";
        var msgid = "msgEmail";
        var Value = $("#toUser").val();
        var RegEx = "^[a-zA-Z0-9]+([\.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\.-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]{2,})+$";

        if (isNotEmpty(Value, id, msgid)) {
            var flag = matchString(RegEx, Value);
            if (!flag) {

                $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Invalid Email adderess</br><strong>Example: </strong>user@company.com</div>");
                return false;
            }
            else {
                return true;

            }
        }
        return false;
    }

    function isNotEmpty(str, id, msgid) {
        $("#" + msgid + " .close").alert("close");
        if (str.length == 0) {
            $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Fillout this field.</div>");
            return false;
        }
        else {

        }
        return true;
    }

    function matchString(regX, str) {
        var regex = new RegExp(regX);
        if (regex.test(str)) {
            return true;
        }
        return false;
    }
});