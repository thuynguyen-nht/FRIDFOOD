$(document).ready(function() {
  var ingredientInput = $("#ingredientSearch");
  var quantityInput = $("#quantity");
  var unitInput = $("#units");
  var ingredientList = $("tbody");
  var ingContainer = $("#displayIngredients");

  // Adding event listeners to the form to create a new object, and the button to delete
  // an Author
  $(document).on("submit", ".inv-form", handleInventoryFormSubmit);
  $(document).on("click", ".delete-inv", handleDeleteButtonPress);

  // Getting the initial list of Inv
  getIngredients();

  // A function to handle what happens when the form is submitted to create a new Author
  function handleInventoryFormSubmit(event) {
    event.preventDefault();

    // var searchField = ingredientInput.val();
    // var expression = new RegExp(searchField, "i");
    // $.getJSON("/data.json", function(data) {
    //   $.each(data, function(key, value) {
    //     if (value.name.search(expression) !== -1) {
    //       $("#result").append(
    //         "<li class='list-group-item'>" + value.name + "</li>"
    //       );
    //     }
    //   });
    // });

    // Don't do anything if the name fields hasn't been filled out
    if (!ingredientInput.val().trim()) {
      return;
    }
    // Calling the upsertInventory function and passing in the value of the name input
    upsertInventory({
      name: ingredientInput.val().trim(),
      quantity: quantityInput.val().trim(),
      unit: unitInput.val()
    });
  }

  // A function for creating an inventory. Calls getInv upon completion
  function upsertInventory(ingredientData) {
    $.post("/api/fridge", ingredientData).then(getIngredients);
  }

  // Function for creating a new list row for authors
  function createIngredientRow(ingredientData) {
    var newTr = $("<tr>");
    newTr.data("ingredient", ingredientData);
    newTr.append("<td>" + ingredientData.name + "</td>");
    newTr.append("<td>" + ingredientData.quantity + "</td>");
    newTr.append("<td>" + ingredientData.unit + "</td>");
    newTr.append(
      "<td><a style='cursor:pointer;color:red' class='delete-inv'>Delete</a></td>"
    );
    return newTr;
  }

  // Function for retrieving ingredients and getting them ready to be rendered to the page
  function getIngredients() {
    $.get("/api/fridge", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createIngredientRow(data[i]));
      }
      renderIngredients(rowsToAdd);
      ingredientInput.val("");
    });
  }

  // A function for rendering the list of ingredients to the page
  function renderIngredients(rows) {
    ingredientList
      .children()
      .not(":last")
      .remove();
    ingContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      ingredientList.prepend(rows);
    } else {
      renderEmpty();
    }
  }

  function renderEmpty() {
    var alertDiv = $("<div>");
    alertDiv.addClass("alert alert-danger");
    alertDiv.text("You must add ingredients in order to search for recipes");
    ingContainer.append(alertDiv);
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress() {
    var listItemData = $(this)
      .parent("td")
      .parent("tr")
      .data("ingredient");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/fridge/" + id
    }).then(getIngredients);
  }

  //this search is for search box of my fridge where user add their ingredients
  $("#invSearch").keyup(function() {
    $("#result").html("");
    var searchField = $("#invSearch").val();
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
