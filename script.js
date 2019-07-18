$(document).ready(function(){
    $('.animate-text').animate({"margin-left": '+=15%', "margin-right": '+=15%', "opacity": '1.0'}, "slow");
    //text(decodeURI(location.search.split('=')[1]));
    $('.map-image').fadeIn();
    $(".js-recipe-search").click(function () {
        $(".js-recipe-suggessions").addClass("hide");
        $(".js-recipe-alert").addClass("hide");
        $(".js-results").addClass("hide");
        var recipe = $(".js-recipe").val();
            if(recipe) {
                var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + recipe;
                $.ajax({
                        type: "GET",
                        dataType: 'json',
                        cache: false,
                        url: url,
                        success: function (data) {
                            renderIngredients(data);
                    }
                });
            }
    });

    $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: 'textTest.txt',
        success: function (data) {
            renderShoppingList(data);
        }
    });

    $(".js-search-product").click(function () {
        var recipe = $(".js-product").val();
        if(recipe) {
            var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + recipe;
            $.ajax({
                    type: "GET",
                    dataType: 'json',
                    cache: false,
                    url: url,
                    success: function (data) {
                        if(data.meals && data.meals.length) {
                            window.location.href = "map.html";
                        } else {
                            $(".js-product-alert").removeClass("hide");
                        }
                }
            });
        }
    });

    var clickedButton;
    $(".login_btn").click(function(){
        sessionStorage.clear();
        clickedButton=true;
        if(clickedButton) {
            var url = "https://api.randomuser.me/"
            $.ajax({
                type: "POST",
                url: url,
                dataType: 'jsonp',
                cache:false,
                crossDomain: true,
                success: function (data) {
                    /*username = data.results[0].name.first +' '+ data.results[0].name.last;
                    profileImgPath = data.results[0].picture.thumbnail;
                    var aboutInfo = data.results[0];
                    sessionStorage.setItem("username", username);*/
                    sessionStorage.profileInfo = JSON.stringify(data);
                    if(data.results && data.results.length) {
                        window.location.href="index.html";
                    }
                },
                error: function() {
                    alert("Unable to login");
                }
            });
        } 
    });
    
    $(".profilePicture").click(function(){
        window.location.href= "about.html";
    });
});



function renderIngredients(data) {
    $(".js-results").removeClass("hide");
    $(".js-locate-recipe").removeClass("hide");
    if(data.meals && data.meals.length) {
        $(".js-title").html("Required ingredients for preparing <b>" + data.meals[0].strMeal + ":</b>");
        var result = "<div class='col-sm-6 recipe-img'><img src='" + data.meals[0].strMealThumb + "'/></div>";
            result += "<div class='col=sm-6'><ul>";
        for(var i=1; i<21; i++) {
            var key = "strIngredient" + i;
            var ingredient = data.meals[0][key] ? data.meals[0][key] : '';
            if(ingredient) {
                result += "<li class='text-capitalize'><input type='checkbox' checked> " + data.meals[0][key] + "</li>";
            }
        }
        result += "</ul></div>";
        $(".js-reciperesults").html(result);
    } else {
        $(".js-locate-recipe").addClass("hide");
        $(".js-title").html('');
        $(".js-reciperesults").html('');
        $(".js-recipe-alert").removeClass("hide");
    }  
}

function renderShoppingList(data) {
    var $employees=data.employees
}
    // for(var i=0;i<$employees.length;i++) {
    //     alert($employees[i].firstName + ' ' + $employees[i].lastName);
    // }
//    for(var i=0;i<data.length;i++) {
//     $("#myUL").append("<li>"+data[i]+"</li>");
//     $("#myUL li").addClass("shopItems");
//    }
//    var myNodelist = $(".shopItems");
//        for (var i = 0; i < myNodelist.length; i++) {
//          var span = document.createElement("SPAN");
//          var txt = document.createTextNode("\u00D7");
//          span.className = "close";
//          span.appendChild(txt);
//          myNodelist[i].appendChild(span);
//        }

// https://api.randomuser.me/
