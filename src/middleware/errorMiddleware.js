function handleValidationError(err, req, res, next) {
  console.log("runnning");
  // Check if the error is a validation error
  if (err.name === "ValidationError") {
    // Extract the first validation error message
    const firstErrorKey = Object.keys(err.errors)[0];
    const firstErrorMessage = err.errors[firstErrorKey].message;

    // Return the specific error message to the user
    return res.status(400).json({ error: firstErrorMessage });
  }

  // Call the next middleware function if the error is not a validation error
  next();
}

module.exports = handleValidationError;
