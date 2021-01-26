const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};



// sometimes the res is 200 but it is actually an error. 
// like in case of /:id, is not in the correct format
const errorHandler = (err, req, res, next ) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message : err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  })
};

export {notFound, errorHandler};