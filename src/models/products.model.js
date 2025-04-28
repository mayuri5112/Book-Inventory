

export default class productModel{
    constructor(id, name, desc, price, imgUrl) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imgUrl = imgUrl;
    }

    static get() {
        return products;
  }

  static getAll() {
    return products;
  }

  static update(productObj) {
    const index = products.findIndex((p) => 
      p.id == productObj.id
    )
    products[index] = productObj;
  }

  static delete(id) {
    const index = products.findIndex((p) => p.id == id);
    products.splice(index, 1);
  }
  
  static add(name,desc,price,imgUrl) {
    let newProduct = new productModel(products.length + 1, name, desc, price, imgUrl);
    products.push(newProduct);
  }

  static getById(id) {
    return products.find((p) => p.id == id);
  }

}

var products = [
    new productModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    ),
    new productModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
    ),
    new productModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
    ),
  ]