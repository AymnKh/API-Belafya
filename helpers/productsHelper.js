
module.exports = {
  filter(products, lang, country) {
    let singleProduct;
    let allProducts = [];
    option = (value) => {
      // for head, cutting, preparation, donationStatus, donationSide
      let returnedValue;
      if (value.length != 0) {
        // if value is not empty
        returnedValue = value.map((item) => {
          // loop on value
          return {
            // return object
            name: lang === "ar" ? item.name_ar : item.name,
            _id: item._id,
          };
        });
        return returnedValue; // return value
      }
    };
    sizes = (value) => {
      // for sizes
      let returnedValue;
      if (value.length != 0) {
        // if sizes not empty
        returnedValue = value.map((item) => {
          // loop on sizes
          return {
            // return object
            _id: item._id,
            name: lang === "ar" ? item.name_ar : item.name, // if lang is ar then return name_ar else return name
            price: item.price,
            age: item.age,
            weight: item.weight,
          };
        });
        return returnedValue; // return value
      }
    };
    products.forEach((element) => {
      // loop on products
      if (country == element.country) {
        singleProduct = {
          _id: element._id, // product id
          startPrice: element.startPrice, // product startPrice
          imageUrl: element.imageUrl, // product image
          imageName: element.imageName, // product imageName
          name: lang === "ar" ? element.name_ar : element.name, // if lang is ar then return name_ar else return name
          sizes: sizes(element.sizes),
          head: option(element.head),
          cutting: option(element.cutting),
          preparation: option(element.preparation),
          donationStatus: option(element.donationStatus),
          donationSide: option(element.donationSide),
        };
        allProducts.push(singleProduct); // push single product to all products
      }
    });
    return allProducts;
  }
};
