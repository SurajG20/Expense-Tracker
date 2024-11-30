import FinanceServices from "../services/FinanceServices.js";

const createFinance = async (req, res) => {
  try {
    const data = req.body;

    const isTitleUnique = await FinanceServices.isTitleUnique(data.title);

    if (isTitleUnique) {
      return res.error("Title Already Exists");
    }

    const finance = await FinanceServices.createFinance(data);

    return res.success("Finance Created Successfully", finance);
  } catch (error) {
    return res.error("Error Creating Finance", error.message);
  }
};

const getFinances = async (req, res) => {
  try {
    const { type } = req.query;

    const condition = {
      where: {
        type: type,
      },
    };

    const finance = await FinanceServices.getFinances(condition);
    return res.success("Finance Retrieved Successfully", finance);
  } catch (error) {
    return res.error("Error Retrieving Finance", error.message);
  }
};

const deleteFinance = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.user);
    const finance = await FinanceServices.deleteFinance(id);
    return res.success("Finance Deleted Successfully", finance);
  } catch (error) {
    return res.error("Error Deleting Finance", error.message);
  }
};

const updateFinance = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const finance = await FinanceServices.updateFinance(id, body);
    return res.success("Finance Updated Successfully", finance);
  } catch (error) {
    return res.error("Error Updating Finance", error.message);
  }
};

export default {
  createFinance,
  getFinances,
  deleteFinance,
  updateFinance,
};
