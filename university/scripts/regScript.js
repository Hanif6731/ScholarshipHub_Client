$(document).ready(function () {

    $("#submit").click(function () {
        //alert(isValid());
        if (isValid()) {
            
            //postData();
        }
    });
    $('#approvalFile').on('change',function (event) {
        var fileName = event.target.files[0].name;
        if (event.target.nextElementSibling != null) {
            event.target.nextElementSibling.innerText = fileName;
            
        }
    });


    function isValid() {
         var flags =[isName(),
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
            isChecked()]
        for (i = 0; i < flags.length; i++) {
            if (!flags[i]) {
                return false;
            }
        }
        return true;
        
        
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
        var RegEx = "^[a-zA-Z0-9]+([\.-]?[a-zA-Z0-9]+)*$";
        
        if (!isEmpty(Value, id, msgid)) {
            var flag = matchString(RegEx, Value);
            if (!flag) {
                $("#" + msgid + " .close").alert("close");
                $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Username can only contain alphabetes, digits and may followed by a period or hypen.</div>");
                return false;
            }
            else {
                $("#" + msgid).hide();
                return true;
            }
        }
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
        if (!isEmpty(Value, id, msgid)) {
            
            if (!(Value == ($("#pass").val()))) {
                
                $(id).html($(id).html() + "<div id=\"" + msgid + "\" class=\"alert alert-danger alert-dismissible\"><a href = \"#\" class= \"close\" data-dismiss=\"alert\" aria-label=\"close\" >&times;</a >Password does not match.</div>");
                return false;
            }
            else {
               
            }
        }
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
            
        }
        return false;
    }

    function isAddress() {
        var id = "#uniAddress";
        var msgid = "msgAddress";
        var Value = $("#addressline").val();

        return isEmpty(Value, "#uniAddress", msgid);
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
        return isEmpty(Value, "#uniCity", msgid);

    }

    function isZip() {
        var id = "#uniZip";
        var msgid = "msgZip";
        var Value = $("#zip").val();
        return isEmpty(Value, "#uniZip", msgid);
    }

    function isMotto() {
        var id = "#uniMotto";
        var msgid = "msgMotto";
        var Value = $("#motto").val();
        return isEmpty(Value, "#uniMotto", msgid);
    }

    function isMission() {
        var id = "#uniMission"
        var msgid = "msgMission";
        var Value = $("#mission").val();
        return isEmpty(Value, "#uniMission", msgid);
    }

    function isVission() {
        var id = "#uniVision";
        var msgid = "msgVision";
        var Value = $("#vision").val();
        return isEmpty(Value, "#uniVision", msgid);
    }

    function isDesc() {
        var id = "#uniDesc";
        var msgid = "msgDesc";
        var Value = $("#desc").val();
        return isEmpty(Value, "#uniDesc", msgid);
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