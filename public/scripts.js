const modalOverlay = document.querySelector('.modal-overlay');
const recipes = document.querySelectorAll('.recipe');

for (let recipe of recipes) {
  recipe.addEventListener('click', function () {
    const recipeId = recipe.getAttribute('id');
    
    window.location.href = `/recipes/${recipeId}`;
  });
}

const sections = document.querySelectorAll('.detail-section');

for (let i = 0; i < sections.length; i++) {
  const span = sections[i].querySelector('.show');
  const detailsBox = sections[i].querySelector('.details');

  span.onclick = function () {
    if (detailsBox.classList.contains('hide')) {

      span.innerHTML = 'ESCONDER';
      detailsBox.classList.remove('hide');

      setTimeout(function () {
        detailsBox.classList.remove('vhide');
      }, 20);

    } else {

      span.innerHTML = 'MOSTRAR';
      detailsBox.classList.add('vhide');

      detailsBox.addEventListener('transitionend', function (e) {
        detailsBox.classList.add('hide');
      }, {
        capture: false,
        once: true,
        passive: false,
      });
    }
  };
}

const currentPage = location.pathname;
const menu = document.getElementById('main-header');

if (currentPage === '/') {
  menu.classList.remove('dark');
  menu.querySelector('.restrict-area button').classList.add('dark');
  menu.querySelector('img').src = '/assets/logo-dark.png';
  menu.querySelector('#account').classList.add('dark');
} else {
  menu.querySelector('.restrict-area button').classList.remove('dark');
  menu.querySelector('#account').classList.remove('dark');
}
