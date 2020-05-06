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
        $("#inputPassword")
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
      $.ajax("_________", {
        type: "POST",
        data: newUser
      }).then(function() {
        console.log("created new user");
        // Reload the page to get the updated list
        window.location.href = "/mainPage";
      });
    });

    $("#logIn").on("click", function() {
      event.preventDefault();
      var id = $(this).data("id");

      // Send the DELETE request.
      $.ajax("/____" + id, {
        type: "GET"
      }).then(function() {
        console.log("Welcome back, ", id);
        // Reload the page to get the updated list
        window.location.href = "/mainPage";
      });
    });

    $("#logIn").on("click", function() {
      window.location.href = "/index";
    });
  });

  $("#search").keyup(function() {
    $("#result").html("");
    var searchField = $("#search").val();
    var expression = new RegExp(searchField, "i");
    $.getJSON("______", function(data) {
      $.each(data, function(key, value) {
        if (value.name.search(expression) !== -1) {
          $("#result").append(
            "<li class='list-group-item'>" + value.name + "</li>"
          );
        }
      });
    });
  });
});
