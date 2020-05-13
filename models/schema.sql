DROP DATABASE IF EXISTS fridgeSearch;
CREATE DATABASE fridgeSearch;

CREATE TABLE recipes
(
    id INT(9) NOT NULL
    AUTO_INCREMENT,
    name VARCHAR
    (100) NOT NULL,
    recipe_text VARCHAR
    (5000) NOT NULL,
    spoonacular_ID INT
    (20) NOT NULL,
    image_link VARCHAR
    (100) NOT NULL,
    PRIMARY KEY
    (id)
);

    CREATE TABLE "ingredients"
    (
        id INT(9) NOT NULL
        AUTO_INCREMENT,
    name VARCHAR
        (100) NOT NULL,
    image_link VARCHAR
        (100),
    spoonacular_ID INT
        (20) NOT NULL,
    PRIMARY KEY
        (id)
);

        CREATE TABLE "recipeIngredients"(
    recipe_ID INT(9) FOREIGN KEY,
    ingredients_ID INT
        (9) FOREIGN KEY,
    unit VARCHAR
        (20) NOT NULL,
    amount VARCHAR
        (10) NOT NULL
);