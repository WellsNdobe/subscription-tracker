const errorMiddleware = (err, req, res, next) => {
  try {
    let error = { ...err };

    error.message = err.message;

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
      const message = "Duplicate field value entered";
      error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error = new ErrorResponse(message, 400);
    }

    // Send error response
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server Error",
    });
  } catch (err) {
    next(err);
  }
};

export default errorMiddleware;
