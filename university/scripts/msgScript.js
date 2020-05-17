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
        postData();
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
});