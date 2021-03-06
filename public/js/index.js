// Code to prevent back if the user is logged out
$(window).on("load", function() {
  console.count("preventBack()");
  if (!sessionStorage.getItem("uid")) {
    function preventBack() {
      window.history.forward();
    }
    setTimeout(preventBack(), 0);
    window.onunload = function() {
      null;
    };
  }
});

$(document).ready(() => {
  $(".page-links").on("click", function() {
    var uid = sessionStorage.getItem("uid");
    window.location.href = "/fridge/" + uid;
  });

  // >>>>>>>>>>>>>>>>>>>LEAVING IN FOR FUTURE IMPLEMENTATION>>>>>>>>>>>>>>>>>>>>>
  // $.ajax({
  //   url:
  //     "https://api.spoonacular.com/recipes/random?number=6&apiKey=" + process.env.SPOON_API,
  //   method: "GET"
  // }).then(function(response) {
  //   var data = response.recipes;
  //   // var objArray = [];
  //   for (i in data) {
  //     // var obj = {
  //     //   title: data[i].title,
  //     //   image: data[i].image,
  //     //   instructions: data[i].instructions
  //     // };
  //     // objArray.push(obj);
  //     var slickArea = $("<div class='card mx-3' style='width: 18rem;'>");

  //     var img = $("<img class='card-img-top'>");
  //     var slickBody = $("<div class='card-body'>");
  //     var recipeTitle = data[i].title;
  //     var recipeInstruction = data[i].instruction;
  //     var buttonToRecipes = $(
  //       "<button type='button' class='btn btn-primary renderRandomRecipes' data-toggle='modal' data-target='#randomRecipe'>" +
  //         data[i].title +
  //         "</button>"
  //     );

  //     img.attr("src", data[i].image);
  //     slickBody.append(buttonToRecipes);
  //     slickArea.append(img);
  //     slickArea.append(buttonToRecipes);

  //     $(".slick").prepend(slickArea);
  //     $("#modalTitle").html(recipeTitle);
  //     $(".instructionRecipe").html(recipeInstruction);
  //   }
  //   // console.log(objArray);
  // });

  $(".slick").slick({
    autoplay: true,
    autoplaySpeed: 1000,
    accessibility: true,
    slidesToShow: 4,
    infinite: true,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1
        }
      }
    ]
  });

  $(function() {
    $(".renderRandomRecipes").on("click", function() {
      $("#randomRecipe").modal("toggle");
    });

    $("#signUp").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();

      $("#errorEmailSignup").text("");
      $("#errorPasswordSignup").text("");

      if (
        !$("#firstName")
          .val()
          .trim() ||
        !$("#lastName")
          .val()
          .trim() ||
        !$("#inputEmail")
          .val()
          .trim() ||
        !$("#inputPassword")
          .val()
          .trim()
      ) {
        return;
      }

      var newUser = {
        firstName: $("#firstName")
          .val()
          .trim(),
        lastName: $("#lastName")
          .val()
          .trim(),
        email: $("#inputEmail")
          .val()
          .trim(),
        password: $("#inputPassword")
          .val()
          .trim()
      };
      // Send the POST request.
      $.ajax("/api/user", {
        type: "POST",
        data: newUser
      }).then(function(result) {
        //Error creating user
        if (typeof result === "object") {
          if (result.type === "email") {
            $("#errorEmailSignup").text(result.message);
          } else if (result.type === "password") {
            $("#errorPasswordSignup").text(result.message);
          }
        } else {
          //redirect
          sessionStorage.setItem("uid", result);
          window.location.href = "/main";
        }
        // Reload the page to get the updated list
        // window.location.href = "/mainPage";
      });
    });

    // Executes when they click on the submit button on the modal
    $("#logIn").on("click", function() {
      event.preventDefault();

      $("#errorEmail").text("");
      $("#errorPassword").text("");

      if (
        !$(".logInInfo")
          .val()
          .trim()
      ) {
        return;
      }
      // Send the Get log in request.
      // need Password and Email

      var logInInfo = {
        loginEmail: $("#user-email")
          .val()
          .trim(),
        loginPassword: $("#user-password")
          .val()
          .trim()
      };

      $.ajax("/api/user", {
        type: "GET",
        data: logInInfo
      }).then(function(result) {
        // if(typeof response === [Object])
        if (typeof result === "object") {
          if (result.type === "email") {
            $("#errorEmail").text(result.message);
          } else if (result.type === "password") {
            $("#errorPassword").text(result.message);
          }
        } else {
          //redirect
          sessionStorage.setItem("uid", result);
          window.location.href = "/main";
        }
      });
    });

    // click add ingredient
    $("#addIngredient").on("click", function() {
      event.preventDefault();
      if (
        !$("#ingredientSearch")
          .val()
          .trim() ||
        !$("#quantity")
          .val()
          .trim()
      ) {
        return;
      }

      var newIngredient = {
        newIngredient: $("#ingredientSearch")
          .val()
          .trim(),
        quantity: $("#quantity")
          .val()
          .trim(),
        unit: $("#units").val()
      };

      // post request - need to add in the user id to the end point path

      $.ajax("/api/ingredient/" + sessionStorage.getItem("uid"), {
        type: "POST",
        data: newIngredient
      }).then(function(res) {
        if (res) {
          $("#ingredientSearch").val("");
          $("#quantity").val("");
          window.location.href = "/fridge/" + sessionStorage.getItem("uid");
        }
      });
    });

    // find recipes
    $("#matchingRecipes").on("click", function() {
      var id = sessionStorage.getItem("uid");
      $.ajax("/api/recipes/" + id, {
        type: "POST",
        data: id
      }).then(function(response) {
        console.log(response);
        var recipeObjsArr = [];
        for (i in response) {
          var obj = {
            recipeTitle: response[i].title,
            recipeImage: response[i].image
          };
          recipeObjsArr.push(obj);

          var matchArea = $("<div class='card'>");
          var imgMatch = $("<img class='card-img-top'>").attr(
            "src",
            response[i].image
          );
          var matchBody = $("<div class='card-body'>");

          var matchTitle = $(
            "<h5 class='card-title'>" + response[i].title + "</h5>"
          );
          matchBody.append(matchTitle);
          matchArea.append(imgMatch);
          matchArea.append(matchBody);
          $(".renderMatchRecipe").append(matchArea);
        }
      });
    });

    $("#logOut").on("click", function() {
      event.preventDefault();
      $.ajax("/api/logOut").then(function() {
        sessionStorage.removeItem("uid");
        window.location.href = "/";
      });
    });
  });
});
