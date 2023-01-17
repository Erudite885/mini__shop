class Product {
  title = "default";
  imageUrl;
  description;
  price;

  constructor(title, img, desc, px) {
    this.title = title;
    this.imageUrl = img;
    this.description = desc;
    this.price = px;
  }
}
// console.log(new Product());
const productList = {
  products: [
    new Product("Carpet", "", "a carpet", 10),
    new Product("Pillow", "", "a Pillow", 30),
    // { title: "Carpet", imgUrl: "", price: 10, description: "a carpet" },
    // { title: "Pillow", imgUrl: "", price: 10, description: "a pillow" },
  ],
  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const product of this.products) {
      const prodElement = document.createElement("li");
      prodElement.className = "product-item";
      prodElement.innerHTML = `
            <div>
                <img src="${product.imgUrl}" alt="${product.title}" >
                <div class="product-item__content">
                <h2>${product.title}</h2>
                <h3>${product.price}</h3>
                <p>${product.description}</p>
                <button>Add to Cart</button>
                </div>
            </div>
        `;
      prodList.append(prodElement);
    }
    renderHook.append(prodList);
  },
};
productList.render();
