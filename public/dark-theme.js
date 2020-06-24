const currentPage = location.pathname;
const menu = document.getElementById('main-header');

if (currentPage.includes('admin')) {
  menu.classList.add('dark');
  menu.querySelector('img').src = '/assets/logo-light.png';
  menu.querySelector('form.search').classList.remove('show');
  menu.querySelector('div.restrict-area').classList.add('show');
} else {
  menu.querySelector('form.search').classList.add('show');
  menu.querySelector('div.restrict-area').classList.remove('show');
}