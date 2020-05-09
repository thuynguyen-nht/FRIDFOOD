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
      }).then(function() {
        console.log("created new user");
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
      }).then(function(res) {
        // if(typeof response === [Object])
        if (res.body.loginEmail && res.body.loginPassword) {
          console.log("Welcome back, ", id);
          // Reload the page to get the updated list
          window.location.href = "/mainPage";
        } else {
          console.log("Incorrect Email or Password");
          $("#errorPassword").append("Incorrect Email or Password");
        }
      });
    });
  });
});
