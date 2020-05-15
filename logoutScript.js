$(document).ready(function () {
    clearCookies();
    
    function clearCookies() {
        deleteCookie("username");
        deleteCookie("password");
        deleteCookie("status");
        deleteCookie("userId");
        location.href = "index.html";
    }
});