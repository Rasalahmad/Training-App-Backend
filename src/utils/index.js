export const currencyFormatter = (amount, decimal) => {
  if (amount) {
    let formattedAmount = Number(amount)
      ?.toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
      .slice(0, -3);
    if (decimal) {
      formattedAmount = Number(amount)
        ?.toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
    return formattedAmount;
  } else {
    return 0;
  }
};
