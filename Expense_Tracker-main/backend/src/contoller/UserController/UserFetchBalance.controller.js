const User = require("../../model/User.model");
const apiResponseHelper = require("../../utils/apiResponse.helper");
const _lang = require("../../utils/lang");

const UserFetchBalanceController = [
  async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      return apiResponseHelper.successResponseWithData(
        res,
        "user balance fetched",
        user.balance
      );
    } catch (e) {
      return apiResponseHelper.errorResponse(res, _lang("server_error"));
    }
  },
];

module.exports = UserFetchBalanceController;
