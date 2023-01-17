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
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const product of this.products) {
      const productItem = new ProductItem(product);
      const prodElement = productItem.render();
      prodList.append(prodElement);
    }
    return prodList;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    console.log(this.product);
    console.log("Adding product to cart");
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
    const addToCartButton = prodElement.querySelector("button");
    addToCartButton.addEventListener("click", this.addToCart.bind(this));
    return prodElement;
  }
}

class ShoppingCart {
  items = [];

  render() {
    const cartElement = document.createElement("section");
    cartElement.innerHTML = `
        <h2>Total Amount: \$${0} </h2>
        <button>Order Now</button>
    `;
    cartElement.className = "cart";
    return cartElement;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app");

    const cart = new ShoppingCart();
    const cartEl = cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

const shop = new Shop();
shop.render();
