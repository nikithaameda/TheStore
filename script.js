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

    $.ajax({
        type: "GET",
        dataType: 'json',
        cache: false,
        url: 'textTest.txt',
        success: function (data) {
            renderShoppingList(data);
        },
        error: function() {
            alert("Unable to login");
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
    var url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    $.ajax({
            type: "GET",
            dataType: 'json',
            cache: false,
            url: url,
            success: function (data) {
                if(data.meals && data.meals.length) {
                    renderShop(data);
                }
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
var reminder;
function renderShoppingList(data) {
    var $employees=data.employees;
    reminder = $employees.length/10;
    for (j=1; j<=reminder; j++) {
        $(".pagination").append("<li>" + j + "</li>");
    }
    var count = $employees.length > 10 ? 10 : $employees.length;
    for(var i=0;i<count;i++) {
       $("#myUL").append("<li>"+$employees[i]+"</li>");
       // previous grey out
       $(".prevButton").css("backgroundColor", "gray");
       $(".prevButton").attr("disabled", "true");
       $(".pagination li:first-child").css("color","#59bff2");
    }
    var counter = 1;
    //counterFunction();
    $(".nextButton").click(function() {
        counter++; 
        $("#myUL").html("");
        counterFunction();
    });
    
    $(".prevButton").click(function() {
        counter--;
        $("#myUL").html("");
        counterFunction();
    });

    $(".pagination li").click(function(){
        a = $(this).text();
        counter = a;
        $("#myUL").html("");
        $(".pagination li").css("color","black");
        $(this).css("color","#59bff2");
        counterFunction();
     });

    function counterFunction() {
        for(var i=counter*10-10;i<counter*10;i++) {
            $("#myUL").append("<li>"+$employees[i]+"</li>");
        } 
        if(counter >= reminder) { 
            // greyout next 
            $(".nextButton").css("backgroundColor", "gray");
            $(".nextButton").attr("disabled", "disabled");
            $(".prevButton").removeAttr("disabled")
        } else if(counter<=1) {
            $(".prevButton").css("backgroundColor", "gray");
            $(".prevButton").attr("disabled", "disabled");
            $(".nextButton").removeAttr("disabled");
        } else {
            $(".nextButton").css("backgroundColor", "#59bff2");
            $(".prevButton").css("backgroundColor", "#59bff2");
            $(".nextButton").removeAttr("disabled");
            $(".prevButton").removeAttr("disabled");
        }

    }
}

function renderShop(data) {
    var elements;
        data.meals.forEach(i=>{
        elements = '<div class="hot-offer-list">' +
            '<img src="' + i.strMealThumb + '" width = 100% /><br />' +
            '<label>' + i.strMeal + '</label><br />' +
            '<label>' + i.strCategory  + '</label><br />' +
            '<button class="button cart-button"> Add to Cart </button>' +
        '</div>'
        $(".store-hot-images").append(elements);
        });
    }

//    for(var i=0;i<data.length;i++) {
//     $("#myUL").append("<li>"+data[i]+"</li>");
//     $("#myUL li").addClass("shopItems");
//    }
//    var myNodelist = $(".shopItems");
//     for (var i = 0; i < myNodelist.length; i++) {
//         var span = document.createElement("SPAN");
//         var txt = document.createTextNode("\u00D7");
//         span.className = "close";
//         span.appendChild(txt);
//         myNodelist[i].appendChild(span);
//     }
// https://api.randomuser.me/
//sortTest();
            // // console.log(sortedList);
            // var a,b;
            // function sortTest(a,b) {
            //     a= data.meals[i].strMeal.toLowerCase();
            //     b= data.meals[i+1].strMeal.toLowerCase();
            //     if(a>b) {
            //         //$(".sample").append(a + ",");
            //     } else {
            //         //$(".test").append(a+ ",");
            //     }
            // }

            // sortedList.push(data.meals[i].strMeal);
            // if(sortedList.sort()[i]==data.meals[i].strMeal) {
            //     $(".store-hot-images").append(elements);
            // } else if (sortedList.sort()[i]>data.meals[i].strMeal) {
            //     temparr.push(data.meals[i].strMeal);
            // }

//alternate sorting
// function renderShop(data) {
//     var elements;
//     if(data.meals && data.meals.length) {
//         for(i=0;i<data.meals.length;i++) {
//             data.meals.sort(compare);
//             elements = '<div class="hot-offer-list">' +
//                         '<img src="' + data.meals[i].strMealThumb + '" width = 100% /><br />' +
//                         '<label>' + data.meals[i].strMeal + '</label><br />' +
//                         '<label>' + data.meals[i].strCategory  + '</label><br />' +
//                         '<button class="button cart-button"> Add to Cart </button>' +
//                     '</div>'
//                         //$(".store-hot-images").append(elements);
//                        // $(".test").append(data.meals[i].strMeal)
        
//         $(".store-hot-images").append(elements);
//         }
//     }
// }
// function compare(a,b) {
//     if ( a.strMeal< b.strMeal ){
//         return -1;
//     }
//     if ( a.strMeal> b.strMeal){
//     return 1;
//     }
//     return 0;
//}