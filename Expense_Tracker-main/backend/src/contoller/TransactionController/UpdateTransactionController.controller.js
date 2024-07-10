const apiResponseHelper = require("../../utils/apiResponse.helper");
const PayloadValidatorMiddleware = require("../../middleware/PayloadValidator.middleware");
const { query, body, matchedData } = require("express-validator");
const _lang = require("../../utils/lang");
const { default: mongoose } = require("mongoose");
const TransactionModel = require("../../model/Transaction.model");
const UserModel = require("../../model/User.model");

const UpdateTransactionController = [
  query("id")
    .notEmpty({ ignore_whitespace: true })
    .withMessage("id of transaction is required!")
    .trim()
    .escape(),
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
      console.log(req.body);
      const { id, description, amount } = matchedData(req);
      const condition = {};
      const category = {
        id: mongoose.Types.ObjectId(req.body.category_id),
        name: req.body.category_name,
        icon: req.body.category_icon,
      };
      const data = {};
      data["amount"] = amount;
      data["description"] = description;
      data["category"] = category;
      condition["_id"] = mongoose.Types.ObjectId(id);
      condition["creator_id"] = mongoose.Types.ObjectId(req.user._id);

      // get the old transaction data
      const transaction = await TransactionModel.findById({ _id: id });

      const user = await UserModel.findById({ _id: req.user._id });
      console.log(user);
      console.log(transaction);
      if (!user) {
        return apiResponseHelper.errorResponse(res, "User not found");
      }

      // Add the old transaction amount back to the user's balance
      user.balance += transaction.amount;

      // Deduct the new transaction amount from the user's balance
      user.balance -= amount;

      // Save the updated user balance

      await user.save();

      await TransactionModel.updateOne(condition, data);
      return apiResponseHelper.successResponse(res, "transaction updated");
    } catch (error) {
      console.log(error);
      return apiResponseHelper.errorResponse(res, _lang("server_error"));
    }
  },
];

module.exports = UpdateTransactionController;
