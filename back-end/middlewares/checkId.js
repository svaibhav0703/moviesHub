import { isValidObjectId } from "mongoose";

const checkId = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    return res
      .status(404)
      .json({ message: "invalid object of :", id: req.params.id });
  }
  next();
};

export default checkId;
