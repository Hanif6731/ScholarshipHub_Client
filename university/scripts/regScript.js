$(document).ready(function () {

    $("#submit").click(function () {
        //alert(checkUser());
        //postFIle();
        //alert($("#country").val());
        //$("#myModal").modal();
        if (isValid()) {

            postData();
            postFIle();
            
        }
    });
    $('#approvalFile').on('input', function (event) {

        var fileName = event.target.files[0].name;
        if (event.target.nextElementSibling != null) {
            $("#msgFile .close").alert("close");
            event.target.nextElementSibling.innerText = fileName;

        }
    });

    $("#uname").on('input', function (event) {
        checkUser();
    });
    $("#name").on('input', function (event) {
        isName();
    });
    $("#pass").on('input', function (event) {
        isPassword();
    });
    $("#con_pass").on('input', function (event) {
        isConPassword();
    });
    $("#email").on('input', function (event) {
        isEmail();
    });


    function postData() {
        //var flag;
       
        $.ajax({
            url: "https://localhost:44348/api/universities",
            method: "post",
            headers: {
                ContentType: "application/json"
            },
            data: {
                name: $("#name").val(),
                username: $("#uname").val(),
                password: $("#pass").val(),
                email: $("#email").val(),
                contact: $("#contact").val(),
                addressLine: $("#addressline").val(),
                contry: $("#country").val(),
                city: $("#city").val(),
                zip: $("#zip").val(),
                motto: $("#motto").val(),
                mission: $("#mission").val(),
                vision: $("#vision").val(),
                descripton: $("#desc").val(),
                approvalPath: $("#approvalFile").get(0).files[0].name
            },
            complete: function (xmlHttp, status) {
                if (xmlHttp.status == 201) {
                    //alert("Registration success");

                    //flag = true;
                }
                else {
                    alert("an error occured.\nerror:"+ xmlHttp.status);
                    //flag = false;
                }
            }
        });
       // return flag;
    }

    function postFIle() {
        var formData = new FormData();
        var files = $("#approvalFile").get(0).files[0];
        formData.append('file', files);
        $.ajax({
            url: "https://localhost:44348/api/upload/files",
            method: "post",
            headers: {
                ContentType: "application/json"
            },
            data: formData,
            contentType: false,
            processData: false,
            success: function (xmlHttp) {
                //alert("file sent");
                //location.href = "../index.html";
                $("#myModal").modal();
            },
            error: function () {
                alert("an error occured while uploading the file");
            }
        });
    }


    function isValid() {
        var flags = [isName(),
        isUsername(),
        isPassword(),
        isConPassword(),
        isEmail(),
        isContact(),
        isCountry(),
        isAddress(),
        isCity(),
        isMission(),
        isMotto(),
        isVission(),
        isDesc(),
        isZip(),
            isFile(),
            isChecked()
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

    function checkUser() {

        id = "#uniUN";
        msgid = "msgUName";
        var username = $("#uname").val();
        //var flag=false;
        if (username.length < 4) {
            isUsername();
            return false;
        }
        isUsername();
        $.ajax({
            url: "https://localhost:44348/api/users/" + username + "/",
            method: "get",
            complete: function (xmlHttp, status) {

                if (xmlHttp.status == 200) {
                    // alert("content");
                    var data = xmlHttp.responseJSON;
                    $("#" + msgid + " .close").alert("close");
                    $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Username is taken!!</br>Try another.</div>");
                    //flag= false;
                    $("#submit").addClass("disabled");
                    $("#submit").attr("disabled");
                }
                else if (xmlHttp.status == 204) {
                    //alert(xmlHttp.status);
                    //alert("no content");
                    $("#" + msgid + " .close").alert("close");
                    $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-success alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Valid username.</div>");
                    $("#submit").removeClass("disabled");
                    $("#submit").removeAttr("disabled");
                   // flag = true;
                }
                else if (xmlHttp.status == 0) {
                    $("#" + msgid + " .close").alert("close");
                    $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Do not place special character at the end of username</div>");
                    //flag= false;
                    $("#submit").addClass("disabled");
                    $("#submit").attr("disabled");
                }
                else
                {
                    //alert(xmlHttp.status);
                    //alert("error");
                    $("#" + msgid + " .close").alert("close");
                    $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Internal server error</div>");
                    //flag= false;
                    $("#submit").addClass("disabled");
                    $("#submit").attr("disabled");
                }
            }
        });
        //alert(flag);
        //return flag;
    }

    function isName() {

        var msgid = "msgName";
        var Value = $("#name").val();
        var RegEx = "^[a-zA-Z]+(?:[\\s\\-.]{0,3}[a-zA-Z]+)*$";
        var id = "#uniName";
        if (!isEmpty(Value, id, msgid)) {
            var flag = matchString(RegEx, Value);
            if (!flag) {

                $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Name can only contain alphabetes,</br> may followed by a period or hypen or space.</div>");
                return false;
            }
            else {

                return true;
            }
        }
        return false;
    }

    function isUsername() {
        var msgid = "msgUN";
        var Value = $("#uname").val();
        var id = "#uniUN";
        var RegEx = "^[a-zA-Z0-9]+([\.-]?[a-zA-Z0-9]+){3,}$";
        
        if (!isEmpty(Value, id, msgid)) {
            var flag = matchString(RegEx, Value);
            //alert(flag);
            if (!flag) {
                $("#" + msgid + " .close").alert("close");
                $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Username have to be at least four characters long </br>*can only contain alphabetes, digits </br>*may followed by a period or hypen.</div>");
                //alert("un:2 false");
                return false;
            }
            else {
                
                return true;
            }
        }
        //alert("un:3 false");
        return false;
    }

    function isPassword() {
        var id = "#uniPass";
        var msgid = "msgPass";
        var Value = $("#pass").val();
        var RegEx = "^.*(?=.{8,})(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).*$";
        if (!isEmpty(Value, id, msgid)) {
            var flag = matchString(RegEx, Value);
            if (!flag) {
                
                $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Password must</br>* be 8 Characters long</br>* contain atleast</br> 1 digit,</br> 1 lowercase latter,</br> 1 uppercase latter.</div>");
                return false;
            }
            else {
                
                return true;
            }
        }
        return false;
    }
    function isConPassword() {
        var id = "#uniConPass";
        var msgid = "msgConPass";
        var Value = $("#con_pass").val();
        //alert(Value);
        if (!isEmpty(Value, id, msgid)) {
            
            if (!(Value == ($("#pass").val()))) {
                //alert("value does not match");
                $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Password does not match.</div>");
                return false;
            }
            else {
                return true;
            }
        }
        //alert(Value+" after");
        //alert("confirm pass empty");
        return false;
    }

    function isEmail() {
        var id = "#uniEmail";
        var msgid = "msgEmail";
        var Value = $("#email").val();
        var RegEx = "^[a-zA-Z0-9]+([\.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([\.-]?[a-zA-Z0-9]+)*(\.[a-zA-Z0-9]{2,})+$";
        
        if (!isEmpty(Value, id, msgid)) {
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

    function isContact() {
        var id = "#uniContact";
        var msgid = "msgContact";
        var Value = $("#contact").val();
        var RegEx = "^[0-9]{10,15}$";
        
        if (!isEmpty(Value, id, msgid)) {
            var flag = matchString(RegEx, Value);
            if (!flag) {
               
                $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Invalid Phone number.</br>Phone number is too long or too short.</div>");
                return false;
            }
            return true;
            
        }
        return false;
    }

    function isAddress() {
        var id = "#uniAddress";
        var msgid = "msgAddress";
        var Value = $("#addressline").val();

        return !isEmpty(Value, "#uniAddress", msgid);
    }

    function isCountry() {
        var id = "#uniCountry";
        var msgid = "msgCountry";
        var Value = $("#country").val();
        $("#" + msgid + " .close").alert("close");
        if (Value =="Select Country") {
            var flag = true;
            if (flag) {
                $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Select a country.</div>");
                return false;
            }
            else {
                
                return true;
            }
        }
        return true;
    }

    function isCity() {
        var id = "#uniCity";
        var msgid = "msgCity";
        var Value = $("#city").val();
        return !isEmpty(Value, "#uniCity", msgid);

    }

    function isZip() {
        var id = "#uniZip";
        var msgid = "msgZip";
        var Value = $("#zip").val();
        return !isEmpty(Value, "#uniZip", msgid);
    }

    function isMotto() {
        var id = "#uniMotto";
        var msgid = "msgMotto";
        var Value = $("#motto").val();
        return !isEmpty(Value, "#uniMotto", msgid);
    }

    function isMission() {
        var id = "#uniMission"
        var msgid = "msgMission";
        var Value = $("#mission").val();
        return !isEmpty(Value, "#uniMission", msgid);
    }

    function isVission() {
        var id = "#uniVision";
        var msgid = "msgVision";
        var Value = $("#vision").val();
        return !isEmpty(Value, "#uniVision", msgid);
    }

    function isDesc() {
        var id = "#uniDesc";
        var msgid = "msgDesc";
        var Value = $("#desc").val();
        return !isEmpty(Value, "#uniDesc", msgid);
    }

    function matchString(regX, str) {
        var regex =new RegExp(regX);
        if (regex.test(str)) {
            return true;
        }
        return false;
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

    function isFile() {
        var id = "#uniFile";
        var msgid = "msgFile";
        var x = $("#approvalFile").get(0);
        $("#" + msgid + " .close").alert("close");
        

        if (x.files.length == 0) {
            $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Select approval file.</div>");
            return false;
        }
        
       
        return true;
        
    }
    function isChecked() {
        var id = "#termCheck";
        var msgid = "msgCheck";
        var Value = $("#termsBx");
        
        $("#" + msgid + " .close").alert("close");
        if (Value.prop("checked")) {
            return true;
        }
        else {
            $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >You are not allowed to register if you do not accept our terms and conditions.</div>");

            return false;
        }
    }
    

   
});