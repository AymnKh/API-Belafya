module.exports = {
  filterOrders(orders, lang) {
    option = (value) => {
      // for head, cutting, preparation, donationStatus, donationSide
      let returnedValue;
      if (value) {
        // if value is not empty
        returnedValue = {
          name: lang === "ar" ? value.name_ar : value.name, // if lang is ar then return name_ar else return name
          _id: value._id,
        };
        return returnedValue; // return value
      }
    };
    let singleOrder;
    let allOrders = [];
    orders.forEach((order) => {
      // loop on products
      singleOrder = {
        _id: order._id,
        name: order.name,
        phone: order.phone,
        country: order.country,
        address: order.address,
        city: order.city,
        totalPrice: order.totalPrice,
        notes: order.notes,
        delivered: order.delivered,
        orderItems: order.orderItems.map((item) => {
          // loop on orderItems
          return {
            // return object
            _id: item._id, // orderItem id
            quantity: item.quantity, // orderItem quantity
            product: {
              // orderItem product
              _id: item.product._id,
              name: lang === "ar" ? item.product.name_ar : item.product.name, // if lang is ar then return name_ar else return name
              imageUrl: item.product.imageUrl,
            },
            size: {
              // orderItem size
              _id: item.size._id,
              name: lang === "ar" ? item.size.name_ar : item.size.name, // if lang is ar then return name_ar else return name
              price: item.size.price,
            },
            head: option(item.head),
            cutting: option(item.cutting),
            preparation: option(item.preparation),
            donationStatus: option(item.donationStatus),
            donationSide: option(item.donationSide),
          };
        }),
      };
      allOrders.push(singleOrder); // push single order to all orders
    });
    return allOrders; // return all orders
  },
};
