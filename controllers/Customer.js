const CustomerModel = require("../models/Customer");

const _ = require("lodash");

class Cleaner {
  static async createUser(userData) {
    return await new CustomerModel({ ...userData }).save();
  }

  static async getCustomers() {
    let users = await CustomerModel.find().sort("name");
    const resultUserList = users;
    // .map(user => {
    //   user = _.pick(user, ["name", "surname", "phone", "registration_date"]);
    // });
    return resultUserList;
  }

  static async getCustomer(id) {
    let user = await CustomerModel.findById(id);
    user = _.pick(user, ["name", "surname", "phone", "registration_date"]);
    return user;
  }

  static async updateCustomer(id, userData) {
    return await CustomerModel.findByIdAndUpdate(
      id,
      { ...userData },
      { new: true }
    );
  }

  static async removeCustomer(id) {
    return await CustomerModel.findByIdAndRemove(id);
  }

  static findCleanerWithParam(email) {
    const user = CustomerModel.findOne({ email });
    if (!user) ctx.throw(402, "User not found");
    return user;
  }
}

module.exports = Cleaner;
