const apiResponseHelper = require("../../utils/apiResponse.helper");
const PayloadValidatorMiddleware = require("../../middleware/PayloadValidator.middleware");
const { body, matchedData } = require("express-validator");
const _lang = require("../../utils/lang");
const TransactionModel = require("../../model/Transaction.model");
const mongoose = require("mongoose");
const UserModel = require("../../model/User.model");

const CreateTransactionController = [
  body("description")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("name of transaction is required!")
    .trim()
    .escape(),
  body("amount")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("amount of transaction is required!")
    .trim()
    .escape(),
  body("category_id")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("catergory id of transaction is required!")
    .trim()
    .escape(),
  body("category_name")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("catergory name of transaction is required!")
    .trim()
    .escape(),
  body("category_icon")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("catergory icon of transaction is required!")
    .trim()
    .escape(),

  PayloadValidatorMiddleware,
  async (req, res) => {
    try {
      const { amount, description } = req.body;

      // console.log(req.body);
      const category = {
        id: mongoose.Types.ObjectId(req.body.category_id),
        name: req.body.category_name,
        icon: req.body.category_icon,
      };
      const data = {};
      data["amount"] = amount;
      data["description"] = description;
      data["category"] = category;
      data["creator_id"] = mongoose.Types.ObjectId(req.user._id);
      // console.log(req.user);
      // Find the user and update their balance
      const user = await UserModel.findById({ _id: req.user._id });
      console.log(user);

      if (!user) {
        return apiResponseHelper.errorResponse(res, "User not found");
      }
      // Deduct the transaction amount from the user's balance
      user.balance -= amount;
      console.log(user.balance);

      // Save the updated user balance
      await user.save();

      await TransactionModel.create(data);
      return apiResponseHelper.successResponse(res, "transaction added");
    } catch (error) {
      console.log(error);
      return apiResponseHelper.errorResponse(res, _lang("server_error"));
    }
  },
];

module.exports = CreateTransactionController;
