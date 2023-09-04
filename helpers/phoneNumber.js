module.exports = {
  validatePhone(phoneNumber, country) {
    if (country === "ksa") {
      const saudiRegex = /^(?:\+966|966|0)?5(0|5|6|7|9)\d{7}$/;
      return saudiRegex.test(phoneNumber);
    } else {
      const uaeRegex = /^(?:\+971|971|0)?5(0|2|4|5|6)\d{7}$/;
      return uaeRegex.test(phoneNumber);
    }
  },
};
