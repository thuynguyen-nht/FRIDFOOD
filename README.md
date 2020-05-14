# Project2

FRIDFOOD!! An  MVC app that turns whats in your fridge to food.

## Objective

Users will be able to search for recipes based on (a) ingredient(s) they have in hand, and will show them the steps once selected
They will also be able to store what is currently in their fridge to easily find recipes and they can save recipes
Each user can potentially log in and save the inventory of their fridge. Making a recipe will manipulate their inventory in the database and keep records of what is in their fridge.

---

## Motive

With people being stuck in their homes during SIP, learning to find quick recipes with items you have readily available could prove useful. Time to get creative with what is in your fridge and pantry!

## How-to-for-users:

1. [Click Here To Go To The App](https://fridfood-2020.herokuapp.com/).
2. Users can sign up and make an account or Log into an existing account in the top right corner of the screen. The user is authenticated via Firebase.
3. Once logged in, the users can access the My Fridge page that will show the items that they have at home.
4. The users can add ingredients to their fridge and the page will reload with their fridge contents showing.
5. At any point, the user can hit the find recipes buttons on the My Fridge page and their page will populate with the names of popular recipes using the ingredients that they have in their fridge. The Spoonacular API provides the recipe names and images.
6. Once the user is done finding what they can make with what they have, they can logout at the top, or they will automatically log out when the window or tab closes.

## Video of Site in Use

[Working App](https://drive.google.com/file/d/1xsW0vCvNWL4vkZVEz3N18k36-s7lMue6/view)

## What is happening behind the curtains:
1. When users sign up, their login information is sent to Firebase to authenticate them, then saves their login information paired with a unique id key which is sent back to the front to provide a user unique experience.
2. Once logged in, the user can go to the My Fridge page and add ingredients to their fridge. Their input is stored in a database and then sent back to display to the user.
3. When the user wants to search for recipes and hits the button to do so, all the contents of their fridge is grabbed from the database and plugged into a get request guery to the [Spoonacular API](https://spoonacular.com/food-api).
4. When the user is done searching for the vast possibilties and options to add to their cooking prowess, they can logout by clicking log out or just exiting the window/tab. Bon Appetite, nerds.

## Technologies/Tools

1. [Node.js](https://nodejs.org/en/)
2. [Express.js](https://expressjs.com/)
3. [Handlebars.js](https://handlebarsjs.com/)
4. [Firebase](https://firebase.google.com/)

## Authors:

- [Alex Rodondi](https://github.com/atrodondi/)
- [Phuong Quyen Le](https://github.com/phquyenle)
- [Angel de la Torre](https://github.com/ardelato)
- [Thuy Nguyen](https://github.com/thuynguyen-nht)
