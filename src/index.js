import './sass/main.scss';
import { renderMarkup } from '../templates/render-markup';
import { jsonPlaceholderAPI } from '../templates/placeholder-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('#search-form');
const divGallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');

const jsonPlaceholderApi = new jsonPlaceholderAPI();
const totalPages = jsonPlaceholderApi.getTotalPages();
// const lightbox = new SimpleLightbox('.gallery photo-link');

btnLoadMore.addEventListener('click', onButtonClick);
form.addEventListener('submit', onFormSubmit);

async function onFormSubmit(event) {
  event.preventDefault();
  jsonPlaceholderApi.searchQuery =
    event.target.elements.searchQuery.value.trim();
  jsonPlaceholderAPI.page = 1;

  if (!jsonPlaceholderApi.searchQuery) {
    Notify.failure(
      'If you want to see a picture then you need to write something'
    );
    return;
  } else if (jsonPlaceholderApi.searchQuery) {
    divGallery.innerHTML = '';
    jsonPlaceholderApi.resetPage();
  }

  try {
    const data = await jsonPlaceholderApi.getPixabayImg(
      jsonPlaceholderApi.searchQuery
    );

    jsonPlaceholderApi.getTotalPages(data.totalHits);
    if (jsonPlaceholderApi.page >= 1) {
      btnLoadMore.classList.remove('is-hidden');
      const markup = renderMarkup(data.hits);
      if (data.hits.length === 0) {
        btnLoadMore.classList.add('is-hidden');
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else if (data.hits.length < 40) {
        btnLoadMore.classList.add('is-hidden');
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      } else if (data.hits.length >= 1) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`);
      }
      divGallery.insertAdjacentHTML('beforeend', markup);
    }
  } catch {
    error => {
      btnLoadMore.classList.add('is-hidden');
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    };
  }
}
async function onButtonClick(event) {
  jsonPlaceholderApi.incrementPage();
  console.log(jsonPlaceholderApi.page);
  console.log(jsonPlaceholderApi.totalPage);
  if (jsonPlaceholderApi.page >= jsonPlaceholderApi.totalPage) {
    Notify.info("We're sorry, but you've reached the end of search results.");
    btnLoadMore.classList.add('is-hidden');
  }
  try {
    const data = await jsonPlaceholderApi.getPixabayImg(
      jsonPlaceholderApi.searchQuery
    );
    const markup = renderMarkup(data.hits);
    divGallery.insertAdjacentHTML('beforeend', markup);
  } catch {
    error => {
      Notify.failure('ERROR CLICK ');
    };
  }
}
