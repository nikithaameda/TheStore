$(document).ready(function(){
    $('.animate-text').animate({"margin-left": '+=15%', "margin-right": '+=15%', "opacity": '1.0'}, "slow");
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