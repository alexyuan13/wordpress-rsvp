const debounce = (func, timeout = 1000) => {
  let timer;
  return (...params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, params);
    }, timeout);
  };
};

export default debounce;
