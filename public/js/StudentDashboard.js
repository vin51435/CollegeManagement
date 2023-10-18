const menuBtn = document.querySelector('#menu_btn');
const sidebar = document.querySelector('.sidebar');

menuBtn.onclick = function () {
  sidebar.classList.toggle('active');
};
