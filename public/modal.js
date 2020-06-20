const modalOverlay = document.querySelector('.modal-overlay');
const recipes = document.querySelectorAll('.recipe');

for (let recipe of recipes) {
  recipe.addEventListener('click', function () {
    const imageUrl = recipe.querySelector('img').getAttribute('src');
    const recipeName = recipe.querySelector('strong').innerHTML;
    const recipeAuthor = recipe.querySelector('span').innerHTML;

    modalOverlay.classList.add('active');
    modalOverlay.querySelector('.modal-content img').src = imageUrl;
    modalOverlay.querySelector('.modal-content strong').innerHTML = recipeName;
    modalOverlay.querySelector('.modal-content span').innerHTML = recipeAuthor;
  });
}

document.querySelector('.close-modal').addEventListener('click', function () {
  modalOverlay.classList.remove('active');
});
