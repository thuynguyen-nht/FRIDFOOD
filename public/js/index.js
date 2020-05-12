function updateURLParameter(url, param) {
  var tempURL = url.split("/").slice(0, 3);
  console.log(tempURL);
  tempURL.push(param);
  console.log(tempURL.join("/"));
  return tempURL.join("/");
}

function grabUserID() {
  var pathName = window.location.pathname;
  var id = pathName.split("/").slice(2, 3);
  console.log(id);
  return id;
}

$(document).ready(() => {
  $(".page-links").on("click", function() {
    var pathName = window.location.pathname;
    window.location.href = updateURLParameter(pathName, $(this).attr("id"));
  });
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
    $("#signUp").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();

      $("#errorEmailSignup").text("");
      $("#errorPasswordSignup").text("");

      console.log("sign up clicked");
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
      console.log(newUser);

      // Send the POST request.
      $.ajax("/api/user", {
        type: "POST",
        data: newUser
      }).then(function(result) {
        console.log("created new user");
        console.log(result);
        //Error creating user
        if (typeof result === "object") {
          if (result.type === "email") {
            console.log(result.message);
            $("#errorEmailSignup").text(result.message);
          } else if (result.type === "password") {
            $("#errorPasswordSignup").text(result.message);
          }
        } else {
          //redirect
          window.location.href = "/main/" + result;
        }
        // Reload the page to get the updated list
        // window.location.href = "/mainPage";
      });
    });

    // Executes when they click on the submit button on the modal
    $("#logIn").on("click", function() {
      event.preventDefault();

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
      console.log(logInInfo);

      $.ajax("/api/user", {
        type: "GET",
        data: logInInfo
      }).then(function(result) {
        // if(typeof response === [Object])
        if (typeof result === "object") {
          if (result.type === "email") {
            console.log(result.message);
            $("#errorEmail").text(result.message);
          } else if (result.type === "password") {
            $("#errorPassword").text(result.message);
          }
        } else {
          //redirect
          window.location.href = "/main/" + result;
        }
      });
    });

    // click add ingredient
    $("#addIngredient").on("click", function() {
      event.preventDefault();
      console.log("add ingredient clicked");
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

      console.log(newIngredient);
      // post request - need to add in the user id to the end point path
      $.ajax("/api/ingredient/" + grabUserID(), {
        type: "POST",
        data: newIngredient
      }).then(function(res) {
        if (res) {
          console.log(res);
          console.log("ingredients added to inventory successfully!");
          $("#ingredientSearch").val("");
          $("#quantity").val("");
        }
      });
    });

    // find recipes
    $("#matchingRecipes").on("click", function() {
      var id = grabUserID();
      $.ajax("/api/recipes/" + id, {
        type: "POST",
        data: id
      }).then(function(res) {
        if (res) {
          console.log(res);
          var queryURL =
            "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" +
            res +
            "&number=6&apiKey=fa0a4907d0da49f495ca32642485159e";
          $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);
            var recipeObjsArr = [];
            for (i in response) {
              console.log(response[i].title);
              console.log(response[i].image);
              var obj = {
                recipeTitle: response[i].title,
                recipeImage: response[i].image
              };
              recipeObjsArr.push(obj);
            }
            console.log("RECIPE OBJECT ARRAY", recipeObjsArr);
          });
        }
      });
    });
  });
});
