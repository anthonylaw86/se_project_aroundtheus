class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._items = items;
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(cardData) {
    this._container.prepend(cardData);
  }

  setItems(items) {
    this._items = items;
  }
}

export default Section;
