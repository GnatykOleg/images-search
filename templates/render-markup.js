export function renderMarkup(images) {
  console.log('ПРИ ВЫЗОВЕ ФУНКЦИИ renderMarkup В INDEX.JS', images);

  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `  <a class ='photo-link' target="_blank" href="${largeImageURL}"><div class="photo-card">
  <img class="img" src="${webformatURL}" alt="${tags}  loading="lazy" />
  <div class="info">
    <p class="info__text">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info__text">
      <b>Views: ${views}</b>
    </p>
    <p class="info__text">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info__text">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>  </a>`;
      }
    )
    .join('');
}
