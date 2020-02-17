const bracket = [0, 47630, 95259, 147667, 210371];
const taxRate = [0, 0.15, 0.205, 0.26, 0.29, 0.33];

export const getBrackets = () => {
  return bracket;
};

export const getPercentages = () => {
  return taxRate;
};

export const formatValueToDollars = function(value) {
  return `$${Number.parseFloat(value).toLocaleString()}`;
};

export const formatValueToPercent = function(value) {
  return `${Number.parseFloat(value).toFixed(2)}%`;
};
