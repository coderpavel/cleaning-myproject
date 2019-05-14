const CleanerModel = require("../models/Cleaner");

const _ = require("lodash");

class Cleaner {
  static async createUser(userData) {
    return await new CleanerModel({ ...userData }).save();
  }

  static async getCleaners() {
    let users = await CleanerModel.find().sort("name");
    const resultUserList = users;
    // .map(user => {
    //   user = _.pick(user, ["name", "surname", "phone", "registration_date"]);
    // });
    return resultUserList;
  }

  static async getCleaner(id) {
    let user = await CleanerModel.findById(id);
    user = _.pick(user, ["name", "surname", "phone", "registration_date"]);
    return user;
  }

  static async updateCleaner(id, userData) {
    return await CleanerModel.findByIdAndUpdate(
      id,
      { ...userData },
      { new: true }
    );
  }

  static async removeCleaner(id) {
    return await CleanerModel.findByIdAndRemove(id);
  }

  static findCleanerWithParam(email) {
    const user = CleanerModel.findOne({ email });
    if (!user) ctx.throw(402, "User not found");
    return user;
  }
}

module.exports = Cleaner;
