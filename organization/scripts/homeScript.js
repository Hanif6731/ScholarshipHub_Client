


$(document).ready(function () {
    loadData();

    function loadData() {
        var username = getCookie("username");
        var password = getCookie("password");
        $.ajax({
            url: "https://localhost:44348/api/organisations/" + username + "/",
            method: "get",
            headers: {
                Authorization: "Basic " + btoa(username + ":" + password)
            },
            complete: function (xmlHttp, Status) {
               
                if (xmlHttp.status == 200) {
                    var data = xmlHttp.responseJSON;
                    setCookie("uniId", data.id);
                    $("#Name").html(data.name);
                    $("#username").html(data.username);
                    var str = "<h3>Username</h3><br/><p>" + data.username + "</p>";
                    $("#uniDesc").html(str);
                    $("#description").html(data.description);
                    $("#city").html(data.city);
                    $("#uniApproval").attr("href", "https://localhost:44348/Media/Files/" + data.approvalPath);
                    $("#uniApproval").html(data.approvalPath);
                    var uniAddress = data.addressLine + "<br/>" + data.postal + ", " + data.city + "<br/>" + data.country;
                    $("#uniAddress").html(uniAddress);
                    var contact = "Phone: " + data.contact + "<br/>Email: " + data.email;
                    $("#contact").html(contact);
                }
                else {
                    alert(xmlHttp.status);
                }
            }
        });
    }

    





    
});