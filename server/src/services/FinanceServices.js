import model from "../models/index.js";

class FinanceServices {
  static async createFinance(data) {
    return await model.FinanceModel.create(data);
  }

  static async isTitleUnique(title) {
    return await model.FinanceModel.findOne({ where: { title } });
  }

  static async getFinances(condition) {
    return await model.FinanceModel.findAll(condition);
  }
  static async deleteFinance(id) {
    return await model.FinanceModel.destroy({ where: { id } });
  }
  static async updateFinance(id, data) {
    return await model.FinanceModel.update(data, { where: { id } });
  }
}

export default FinanceServices;
