import axios from 'axios';

export class jsonPlaceholderAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '28678536-93e63d5ebc13c605896a6694e';
  #page;
  #perPage;

  constructor() {
    this.#page = 1;
    this.#perPage = 40;
    this.searchQuery = '';
    this.totalPage = 0;
  }

  async getPixabayImg() {
    const { data } = await axios.get(
      `${this.#BASE_URL}?key=${this.#API_KEY}&q=${
        this.searchQuery
      }&image_type=photo&orientation=horizontal&safesearch=true&page=${
        this.#page
      }&per_page=${this.#perPage}`
    );
    console.log(data);
    return data;
  }

  get page() {
    return this.#page;
  }

  incrementPage() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  getTotalPages(totalHits) {
    this.totalPage = totalHits / this.#perPage;
  }
}
