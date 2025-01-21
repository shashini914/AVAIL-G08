let addIngredientsBtn = document.getElementById('addIngredientsBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredeintDiv = document.querySelectorAll('.ingredeintDiv')[0];

addIngredientsBtn.addEventListener('click', function(){
  let newIngredients = ingredeintDiv.cloneNode(true);
  let input = newIngredients.getElementsByTagName('input')[0];
  input.value = '';
  ingredientList.appendChild(newIngredients);
});






    // Get the form and comment list elements
    const commentForm = document.getElementById("comment-form");
    const commentList = document.getElementById("comment-list");

    // Handle form submission
    commentForm.addEventListener("submit", function(event) {
        event.preventDefault(); // prevent the form from submitting

        // Get the comment text
        const commentText = document.getElementById("comment-text").value;

        // Create a new list item to hold the comment
        const newComment = document.createElement("li");
        newComment.classList.add("list-group-item");
        newComment.textContent = commentText;

        // Add the comment to the comment list
        commentList.appendChild(newComment);

        // Clear the comment text field
        document.getElementById("comment-text").value = "";
    });

