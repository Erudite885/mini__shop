class Product {
  //   title = "default";
  //   imageUrl;
  //   description;
  //   price;

  constructor(title, img, desc, px) {
    this.title = title;
    this.imageUrl = img;
    this.description = desc;
    this.price = px;
  }
}

class ProductList {
  products = [
    new Product("Carpet", "https://www.carpet.com", "a carpet", 10),
    new Product("Pillow", "https://www.pillow.com", "a Pillow", 30),
  ];
  constructor() {}
  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const product of this.products) {
      const productItem = new ProductItem(product);
      const prodElement = productItem.render(); 
      prodList.append(prodElement);
    }
    renderHook.append(prodList);
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  render() {
    const prodElement = document.createElement("li");
    prodElement.className = "product-item";
    prodElement.innerHTML = `
            <div>
                <img src="${this.product.imgUrl}" alt="${this.product.title}" >
                <div class="product-item__content">
                <h2>${this.product.title}</h2>
                <h3>${this.product.price}</h3>
                <p>${this.product.description}</p>
                <button>Add to Cart</button>
                </div>
            </div>
        `;
    return prodElement;
  }
}

const productList = new ProductList();
productList.render();
