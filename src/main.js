import { getImage } from './js/pixabay-api';
import { resetPage } from './js/pixabay-api';
import { addPage } from './js/pixabay-api';
import errorIcon from './img/error.svg';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const iziOption = {
  messageColor: '#FAFAFB',
  messageSize: '16px',
  backgroundColor: '#EF4040',
  iconUrl: errorIcon,
  transitionIn: 'bounceInLeft',
  position: 'topRight',
  displayMode: 'replace',
  closeOnClick: true,
};

export const box = document.querySelector('.gallery');
export const load = document.querySelector('.load');
export const addMoreButton = document.querySelector('.add-more-button');
const form = document.querySelector('.form');
const input = document.querySelector('.user-input');

function addLoadStroke(daddyElement) {
  daddyElement.insertAdjacentHTML(
    'beforeend',
    '<p class="loading-text">Wait, the image is loaded</p><span class="loader"></span>'
  );
  addMoreButton.classList.add('hide');
}

form.addEventListener('submit', event => {
  event.preventDefault();
  let inputValue = input.value.trim();
  if (!inputValue) {
    iziToast.show({
      ...iziOption,
      message: 'Please enter the search query',
    });
    return;
  }
  box.innerHTML = '';
  resetPage();
  addLoadStroke(load);
  getImage(inputValue);
});

addMoreButton.addEventListener('click', event => {
  let inputValue = input.value.trim();
  addPage();
  addLoadStroke(load);
  getImage(inputValue);
});
