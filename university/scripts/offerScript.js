$(document).ready(function () {
    var un = getCookie("username");
    var pw = getCookie("password");
    //alert(un);
    if (un == "" || pw == "") {
        location.href = "../index.html";
    }
    viewAll();

    $("#applications").click(function () {
        setCookie("offerId", $("#oId").html());
        location.href = "application.html";
    });

    $("#confirm").click(function () {
        deleteData();
    });

    $(document).on("click",".edit",function () {
       var id=$(this).val();
        loadOffer(id);
        $("#saveEdit").removeAttr("disabled");
        $("#saveEdit").removeClass("disabled");
        $('html, body').animate({
            scrollTop: $("#updateSection").offset().top
        }, 1000);
    });

    $(document).on("click",".view", function () {
        var id = $(this).val();
        loadDetails(id);
       
       
    });
    $(document).on("click", ".remove", function () {
        var id = $(this).val();
        confirmDelete(id);
        //$("#detailsModal").modal("show");

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
        if (isValid()) {
            postData();
        }
    });
    $("#saveEdit").click(function () {
        if (isValid2()) {
            putData();
        }
    });

    function isValid() {
        var flags = [
            isField("#offerTitle", "msgTitle", $("#title").val()),
            isField("#offerDesc", "msgDesc", $("#desc").val()),
            isField("#offerReq", "msgReq", $("#req").val()),
            isDate($("#deadline").val(), "#offerDeadline", "msgDeadline"),
            isSelected($("#degree").val(), "#offerDegree", "msgDegree")
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

    function isValid2() {
        var flags = [
            isField("#edofferTitle", "msgedTitle", $("#edtitle").val()),
            isField("#edofferDesc", "msgedDesc", $("#eddesc").val()),
            isField("#edofferReq", "msgedReq", $("#edreq").val()),
            isDate($("#eddeadline").val(), "#edofferDeadline", "msgedDeadline"),
            isSelected($("#eddegree").val(), "#edofferDegree", "msgedDegree")
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
                    alert(xmlHttp.status + "\n" + xmlHttp.responseText);
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

    function loadOffer(id) {

        var username = getCookie("username");
        var password = getCookie("password");
        $.ajax({
            url: "https://localhost:44348/api/universities/" + getCookie("uniId") + "/offers/"+id,
            method: "get",
            headers: {
                ContentType: "application/json",
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            complete: function (xmlHttp, status) {

                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    $("#edID").val(data.id);
                    $("#edtitle").val(data.title);
                    $("#eddegree").val(data.offeredDegree);
                    $("#eddesc").val(data.description);
                    $("#edreq").val(data.requirements);
                    $("#eddeadline").val(data.deadline.split("T")[0]);
                    setCookie("startdate", data.startDate.split("T")[0]);
                   
                }
                else {
                    alert(xmlHttp.status + "\n" + xmlHttp.responseXML);
                }
            }

        });
    }

    function loadDetails(id) {

        var username = getCookie("username");
        var password = getCookie("password");
        $.ajax({
            url: "https://localhost:44348/api/universities/" + getCookie("uniId") + "/offers/" + id,
            method: "get",
            headers: {
                ContentType: "application/json",
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            complete: function (xmlHttp, status) {

                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    $("#oId").html(data.id);
                    $("#oTitle").html(data.title);
                    $("#oDegree").html(data.offeredDegree);
                    $("#oDesc").html(data.description);
                    $("#oReq").html(data.requirements);
                    $("#oDeadline").html(data.deadline.split("T")[0]);
                    $("#detailsModal").modal("show");

                }
                else {
                    alert(xmlHttp.status + "\n" + xmlHttp.responseXML);
                }
            }

        });
    }


    function confirmDelete(id) {

        var username = getCookie("username");
        var password = getCookie("password");
        $.ajax({
            url: "https://localhost:44348/api/universities/" + getCookie("uniId") + "/offers/" + id,
            method: "get",
            headers: {
                ContentType: "application/json",
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            complete: function (xmlHttp, status) {

                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    $("#dId").html(data.id);
                    $("#dTitle").html(data.title);
                    $("#dDegree").html(data.offeredDegree);
                    $("#dDesc").html(data.description);
                    $("#dReq").html(data.requirements);
                    $("#dDeadline").html(data.deadline.split("T")[0]);
                    $("#deleteModal").modal("show");

                }
                else {
                    alert(xmlHttp.status + "\n" + xmlHttp.responseXML);
                }
            }

        });
    }

    function putData() {
        var id = $("#edID").val();
        var username = getCookie("username");
        var password = getCookie("password");
        $.ajax({
            url: "https://localhost:44348/api/universities/" + getCookie("uniId") + "/offers/"+id,
            method: "put",
            headers: {
                ContentType: "application/json",
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            data: {
                title: $("#edtitle").val(),
                description: $("#eddesc").val(),
                offeredDegree: $("#eddegree").val(),
                requirements: $("#edreq").val(),
                deadline: $("#eddeadline").val(),
                startDate: getCookie("startdate")
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    viewAll();
                }
                else {
                    alert(xmlHttp.status + "\n" + xmlHttp.responseText);
                }
            }

        });
    }

    function deleteData() {
        var id = $("#dId").html();
        var username = getCookie("username");
        var password = getCookie("password");
        $.ajax({
            url: "https://localhost:44348/api/universities/" + getCookie("uniId") + "/offers/" + id,
            method: "delete",
            headers: {
                ContentType: "application/json",
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 204) {
                    viewAll();
                    $("#deleteModal").modal("hide");
                }
                else {
                    alert(xmlHttp.status + "\n" + xmlHttp.responseText);
                }
            }

        });
    }

    function isSelected(str, id, msgid) {
        $("#" + msgid + " .close").alert("close");
        if (str =="Select Degree") {
            $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Select this field.</div>");
            return false;
        }
        else {

        }
        return true;
    }

    function isEmpty(str, id, msgid) {
        $("#" + msgid + " .close").alert("close");
        if (str.length == 0) {
            $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Fillout this field.</div>");
            return true;
        }
        else {

        }
        return false;
    }

    function isDate(str, id, msgid) {
        var d = new Date();
        var strDate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        str = new Date(str);
        strDate = new Date(strDate);
        //alert(str);
        //alert(strDate + " " + str);
        $("#" + msgid + " .close").alert("close");
        if (str <= strDate || str =="Invalid Date") {
            $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Date should be Greater than current date.</div>");
            return false;
        }
        else {

        }
        return true;
    }

    function isField(id,msgid,Value,) {
        
        return !isEmpty(Value, id, msgid);
    }
});