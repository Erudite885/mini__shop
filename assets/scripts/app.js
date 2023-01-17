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

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}
class Component {
  constructor(renderHookId) {
    this.hook = renderHookId;
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
    App.addProductToCart(this.product);
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

class ShoppingCart extends Component {
  items = [];

  set cartItems(val) {
    this.items = val;
    this.totalOutput.innerHTML = `
    <h2>
        Total Amount: \$${this.totalAmount.toFixed(2)}
    </h2>`;
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
    const cartElement = this.createRootElement("section", "cart");
    cartElement.innerHTML = `
        <h2>Total Amount: \$${0} </h2>
        <button>Order Now</button>
    `;
    // cartElement.className = "cart";
    this.totalOutput = cartElement.querySelector("h2");
    return cartElement;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app");

    this.cart = new ShoppingCart("app");
    // const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    // renderHook.append(cartEl);
    renderHook.append(prodListEl);
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
