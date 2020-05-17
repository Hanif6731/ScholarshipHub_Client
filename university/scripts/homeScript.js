$(document).ready(function () {
    var un = getCookie("username");
    var pw = getCookie("password");
    //alert(un);
    if (un == "" || pw == "") {
        location.href = "../index.html";
    }
    
    loadData();
    

    function loadData() {
        var username = getCookie("username");
        var password = getCookie("password");
        $.ajax({
            url: "https://localhost:44348/api/universities/" + username + "/",
            method: "get",
            headers: {
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            complete: function (xmlHttp, Status) {
               
                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    setCookie("uniId", data.id);
                    $("#uniName").html(data.name);
                    $("#uniMotto").html(data.motto);
                    var str = "<h3>Overview</h3><br/><p>" + data.descripton + "</p>";
                    $("#uniDesc").html(str);
                    $("#uniVision").html(data.vision);
                    $("#uniMission").html(data.mission);
                    $("#uniApproval").attr("href", "https://localhost:44348/Media/Files/" + data.approvalPath);
                    $("#uniApproval").html(data.approvalPath);
                    var uniAddress = data.addressLine + "<br/>" + data.zip + ", " + data.city + "<br/>" + data.contry;
                    $("#uniAddress").html(uniAddress);
                    var contact = "Phone: " + data.contact + "<br/>Email: " + data.email;
                    $("#contact").html(contact);
                    setCookie("email", data.email);
                }
                else {
                    alert(xmlHttp.status);
                }
            }
        });
    }

    





    
});