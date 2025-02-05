import * as main from '../main';
import { markup } from '/js/render-functions';
import { removeLoadStroke } from '/js/render-functions';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let page = 1;
let perPage = 15;

export function resetPage() {
  page = 1;
}
export function addPage() {
  page += 1;
}

function endOfList(daddyElement) {
  removeLoadStroke(daddyElement);
  daddyElement.insertAdjacentHTML(
    'beforeend',
    '<p class="loading-text">We\'re sorry, but you\'ve reached the end of search results.</p>'
  );
  main.addMoreButton.classList.add('hide');
}

export async function getImage(input) {
  const API_KEY = '48621636-2f551eda37f80f5c324cc68cd';
  const query = encodeURIComponent(input);
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage,
  });
  const URL = `https://pixabay.com/api/?${urlParams}`;

  try {
    const { data } = await axios.get(URL);
    markup(data);
    if (data.totalHits < page * perPage) {
      endOfList(main.load);
      return;
    }
    if (page >= 2) {
      const list = document.querySelector('.gallery__item');
      const rect = list.getBoundingClientRect();
      window.scrollBy({
        top: rect.height * 2,
        behavior: 'smooth',
      });
    }
  } catch (error) {
    console.error(error);
    main.box.innerHTML = '';
    main.load.innerHTML = '';
    iziToast.show({
      ...main.iziOption,
      message: 'Sorry, an error happened. Try again',
    });
    return;
  }
}
