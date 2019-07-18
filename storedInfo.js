$(document).ready(function(){
    var profileData = JSON.parse(sessionStorage.profileInfo);
    var shortPath = profileData.results[0];
    if(profileData.results && profileData.results.length) {
        var fullname = shortPath.name.first + " " + shortPath.name.last
        $(".displayLogin").text(fullname);
        $(".profilePicture").attr("src", shortPath.picture.thumbnail);
        $(".registerButton").addClass("hide");
        $(".js-profileImg").attr("src", shortPath.picture.large);
        $(".bioList").append("<li>Full Name:" + " " +"<span>"+ fullname + "</span></li>");
        $(".bioList").append("<li>Gender:" + " " +"<span>"+ shortPath.gender + "</span></li>");
        $(".bioList").append("<li>Email:" + " " +"<span>"+ shortPath.email + "</span></li>");
        $(".bioList").append("<li>Location:" + " " +"<span>" + shortPath.location.street  + ", " + shortPath.location.city + ", "+ shortPath.location.state +"</span></li>");
        $(".bioList").append("<li>Phone:" + " " +"<span>"+ shortPath.phone + "</span></li>");
    } else {
        $(".registerButton").removeClass("hide");
    }
});