const currentPage = location.pathname;
const menu = document.getElementById('main-header');

if (currentPage.includes('admin')) {
  menu.classList.add('dark');
  menu.querySelector('img').src = '/assets/logo-light.png';
}