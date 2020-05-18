$(document).ready(function () {
    var un = getCookie("username");
    var pw = getCookie("password");
    //alert(un);
    if (un == "" || pw == "") {
        location.href = "../index.html";
    }
    var offerId = getCookie("offerId");
    var uniId = getCookie("uniId");
    //alert(offerId);
    //viewAll();
    loadallData();


    $(document).on("click",".view", function () {
        var id = $(this).val();
       loadData(id);
       
       
    });
    $("#addIns").on("click", function () {
        //var id = $(this).val();
        //alert(id);
        //loadData(id);
        putData($("#appId").html());
        


    });

    $("#addInfo").on("click", function () {
        //var id = $(this).val();
        //alert(id);
        //loadData(id);
        //putData($("#appId").html(), 0);
        $("#instructions").val($("#info").html());
        $("#detailsModal").modal("hide");
        $("#instructionsModal").modal("show");


    });

    $("#confirm").on("click", function () {
        //var id = $(this).val();
        //alert(id);
        //loadData(id);
        putData($("#appId").html(), 0);
        $("#confirmModal").modal("hide");


    });

    $("#accept").on("click", function () {
        //var id = $(this).val();
        //alert(id);
        //loadData(id);
        putData($("#appId").html(),1);


    });

    $("#reject").on("click", function () {
        //var id = $(this).val();
        //alert(id);
        //loadData(id);
        $("#detailsModal").modal("hide");
        $("#confirmModal").modal("show");

    });

    function loadallData() {
        $.ajax({
            url: "https://localhost:44348/api/organisations/" + uniId + "/Offers/" + offerId + "/applications",
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
                        var status = "";
                        if (data[i].aplicationStatus == 0) {
                            status = "Rejected";
                        }
                        else if (data[i].aplicationStatus == 1) {
                            status = "Accepted";
                        }
                        else {
                            status = "pending";
                        }
                        str += "<tr><td>" + data[i].student.name + "</td><td>" +
                            status + "</td><td>" +
                            "<button class=\"btn btn-primary mr-1 view\" value=\"" + data[i].id + "\">View</button>" 
                    }
                    $("#applications").html(str);
                }
                else{
                    alert(xmlHttp.status + "\n" + xmlHttp.responseText);
                }
            }
        });
    }

    function loadData(id) {
        $.ajax({
            url: "https://localhost:44348/api/organisations/" + uniId + "/Offers/" + offerId + "/applications/"+id,
            method: "get",
            headers: {
                ContentType: "application/json",
                Authorization: "Basic " + btoa(un + ":" + pw)
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    var str = "";
                    var data = xmlHttp.responseJSON;
                    $("#studentId").val(data.StudentId);
                    $("#appStatus").val(data.aplicationStatus);
                    $("#appId").html(data.id);
                    $("#oTitle").html(data.organisatinOffer.title);
                    $("#sName").html(data.student.name);
                    $("#motive").html(data.motivation);
                    $("#bio").html(data.studentBio);
                    $("#appId").html(data.id);
                    
                    var status = "";
                    if (data.aplicationStatus == 0) {
                        status = "Rejected";
                    }
                    else if (data.aplicationStatus == 1) {
                        status = "Accepted";
                    }
                    else {
                        status = "pending";
                    }

                   // $("#status").html(status);
                    //$("#info").html(data.applicationInformation);
                    //if (data.applicationInformation == null)
                  //      $("#info").html("None");
                  //  $("#cv").attr("href", "https://localhost:44348/Media/Files/" + data.student.cvPath);
                     $("#detailsModal").modal("show");

                }
                else {
                    alert(xmlHttp.status + "\n" + xmlHttp.responseText);
                }
            }
        });
    }

    function putData(id,applicationStatus) {
        $.ajax({
            url: "https://localhost:44348/api/organisations/" + uniId + "/Offers/" + offerId + "/applications/" + id,
            method: "put",
            headers: {
                ContentType: "application/json",
                Authorization: "Basic " + btoa(un + ":" + pw)
            },
            data: {
                studentId: $("#studentId").val(),
                universityOfferID: offerId,
                motivation: $("#motive").html(),
                studentBio: $("#bio").html(),
                aplicationStatus: applicationStatus,
                applicationInformation: $("#info").html()
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    $("#detailsModal").modal("hide");
                    loadallData();
                }
                else {
                    alert(xmlHttp.status + "\n" + xmlHttp.responseText);
                }
            }
        });
    }

    function putData(id) {
        $.ajax({
            url: "https://localhost:44348/api/organisations/" + uniId + "/Offers/" + offerId + "/applications/" + id,
            method: "put",
            headers: {
                ContentType: "application/json",
                Authorization: "Basic " + btoa(un + ":" + pw)
            },
            data: {
                studentId: $("#studentId").val(),
                universityOfferID: offerId,
                motivation: $("#motive").html(),
                studentBio: $("#bio").html(),
                aplicationStatus: $("#appStatus").val(),
                applicationInformation: $("#instructions").val()
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 200) {
                    $("#instructionsModal").modal("hide");
                    loadallData();
                }
                else {
                    alert(xmlHttp.status + "\n" + xmlHttp.responseText);
                }
            }
        });
    }

    
});