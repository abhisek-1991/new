// Adding "Hello" before "Item Lister"
const headerTitle = document.getElementById("header-title");
headerTitle.textContent = "Hello " + headerTitle.textContent;

// Adding "Hello" before "Item 1"
const item1 = document.querySelector("#items .list-group-item:first-child");
item1.textContent = "Hello " + item1.textContent;

// Adding delete and edit buttons to each list item
const listItems = document.querySelectorAll("#items .list-group-item");
listItems.forEach(item => {
  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger btn-sm float-right mr-2";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function() {
    item.remove();
  });
  item.appendChild(deleteButton);

  const editButton = document.createElement("button");
  editButton.className = "btn btn-primary btn-sm float-right";
  editButton.textContent = "Edit";
  item.appendChild(editButton);

  const description = document.createElement("p");
  description.textContent = "Description of the item goes here";
  item.appendChild(description);
});

// Search functionality
const searchInput = document.querySelector(".form-control");
searchInput.addEventListener("input", function() {
  const searchQuery = searchInput.value.toLowerCase();
  listItems.forEach(item => {
    const itemName = item.textContent.toLowerCase();
    const itemDescription = item.querySelector("p").textContent.toLowerCase();
    if (itemName.includes(searchQuery) || itemDescription.includes(searchQuery)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});
