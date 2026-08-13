# Addis Market Shopping List

## About

Addis Market is a simple interactive shopping list built with HTML, CSS, and JavaScript.

The application allows users to:

- Add a shopping item
- Enter the item's price in ETB
- See items displayed in a list
- Mark an item as bought
- Delete an item
- See a live running total of all item prices

## Technologies

- HTML
- CSS
- JavaScript
- DOM manipulation
- Event listeners
- Event delegation

## How to Open

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in a web browser.

No installation or framework is required.

## How It Works

When the user submits the form, JavaScript prevents the page from reloading using `preventDefault()`.

The item name and price are read from the form. JavaScript creates a new `<li>` element using `createElement()` and adds it to the shopping list using `append()`.

A single click listener is attached to the list container. This listener uses event delegation to handle both deleting items and marking items as bought.

The total price is recalculated whenever an item is added or removed.
