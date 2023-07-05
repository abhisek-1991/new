// Adding "Hello" before "Item Lister"
const headerTitle = document.getElementById("header-title");
headerTitle.textContent = "Hello " + headerTitle.textContent;

// Adding "Hello" before "Item 1"
const item1 = document.querySelector("#items .list-group-item:first-child");
item1.textContent = "Hello " + item1.textContent;

