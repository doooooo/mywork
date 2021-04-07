function loadPage()
{
    $.cordys.authentication.sso.authenticate("sysadmin",
        "Pa55w0rd").done(function(){
        window.location.href = "http://otaw167.bass.com.eg:81/home/dev/app/start/web/";
            /*decodeURIComponent($.cordys.getURLParameter
        (window.location.href,"path")+$.cordys.getURLParameter(window.location.href,"search"));*/
        });
}