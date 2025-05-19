const asynchandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    if (!res.headersSent) {
      res.status(500).json({ message: error.message });
    } else {
      console.error("Unhandled error after response sent:", error.message);
    }
  });
};
export default asynchandler;
