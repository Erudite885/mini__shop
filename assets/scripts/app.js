class Product {
  //   title = "default";
  //   imageUrl;
  //   description;
  //   price;

  constructor(title, img, desc, price) {
    this.title = title;
    this.imageUrl = img;
    this.description = desc;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}
class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }

  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total Amount: \$${this.totalAmount}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce((pV, cI) => {
      return pV + cI.price;
    }, 0);
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
    <h2>Total Amount: \$${0} </h2>
    <button>Order Now</button>
    `;
    this.totalOutput = cartEl.querySelector("h2");
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId);
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodElement = this.createRootElement("li", "product-item");
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
  }
}
class ProductList extends Component {
  products = [
    new Product("Carpet", "https://www.nothing.com", "a carpet", 10),
    new Product("Pillow", "https://www.nothing.com", "a Pillow", 30),
  ];

  constructor(renderHookId) {
    super(renderHookId);
  }

  render() {
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "prod-list"),
    ]);
    for (const prod of this.products) {
      const productItem = new ProductItem(prod, "prod-list");
      productItem.render();
    }
  }
}

class Shop {
  render() {
    this.cart = new ShoppingCart("app");
    this.cart.render(); // i wasnt calling the cart.render earlier so i had the undefined error
    const productList = new ProductList("app");
    productList.render();
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
