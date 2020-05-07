USE fridgeSearch;
DROP TABLE recipes;
CREATE TABLE recipes(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(100) NOT NULL,
    recipe_text VARCHAR(5000) NOT NULL,
    spoonacular_ID INT NOT NULL,
    image_link VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE ingredients(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    image_link VARCHAR(100),
    spoonacular_ID INT NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE recipeIngredients(
	no INT NOT NULL AUTO_INCREMENT,
    recipes_ID INT NOT NULL,
    ingredients_ID INT NOT NULL,
    PRIMARY KEY (no),
    INDEX (recipes_ID),
    INDEX (ingredients_ID),
    FOREIGN KEY (recipes_ID),
    REFERENCES recipes(id),
    FOREIGN KEY (ingredients_ID),
    REFERENCES ingredients(id),
    unit VARCHAR(20) NOT NULL,
    amount VARCHAR(10) NOT NULL
);
