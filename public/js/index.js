// Code to prevent back if the user is logged out
$(window).on("load", function() {
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
          sessionStorage.setItem("uid", result);
          window.location.href = "/main";
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
