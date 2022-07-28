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
        return `  <a class ='photo-link' href = "${largeImageURL}"> <div class="photo-card">
  <img class="gallery-img" src="${webformatURL}" alt="${tags}  loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>  </a>`;
      }
    )
    .join('');
}
