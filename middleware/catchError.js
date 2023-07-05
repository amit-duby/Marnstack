const catchAsync = (thaFunk) => (req, resp, next) => {
  Promise.resolve(thaFunk(req, resp, next)).catch(next);
};
export default catchAsync;
