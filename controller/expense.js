const UserExpense = require('../models/expense');
const User = require('../models/user');
const mongoose = require('mongoose')

const ITEMS_PER_PAGE = 5;

exports.getUserExpense = async (req, res, next) => {
  const userId = req.user._id;
  try {
    const expenses = await UserExpense.find({ userId });
    return res.json(expenses);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getPageData = async (req, res, next) => {
  const itemsPerPage = parseInt(req.header("itemsPerPage"));
  const ITEMS_PER_PAGE = itemsPerPage;
  const page = +req.query.page || 1;
  let totalItems;

  try {
    totalItems = await UserExpense.countDocuments({ userId: req.user.id });
    const expenses = await UserExpense.find({
      userId: req.user.id,
    })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    const pageData = {
      currentPage: page,
      hasNextPage: ITEMS_PER_PAGE * page < totalItems,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
    };

    res.json({ expenses, pageData });
  } catch (err) {
    console.log(err);
    next(err);
  }
};





exports.postUserExpense = async (req, res, next) => {
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;
    const userId = req.user._id
    // console.log(req)
    try {
      if(amount === undefined || amount.length ===0){
        return res.status(400).json({ success: false, message: 'Parameters missing '})
      }
        const newExpense = await UserExpense({
            amount: amount,
            description: description,
            category: category,
            userId: userId
        });
        await User.updateOne(
          { _id: userId },
          { $inc: { totalExpense: amount } }
        );
        
        const result = await newExpense.save();
        // console.log(result)
        return res.json(result);
    } catch (err) {
        console.log(err);
    }
};



exports.deleteUserExpense = async (req, res, next) => {
  const expenseId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(expenseId)) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  try {
    const expense = await UserExpense.findByIdAndDelete({
      _id: expenseId,
      userId: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await User.findByIdAndUpdate(
      req.user.id,
      { $inc: { totalExpense: -expense.amount } }
    );

    return res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



exports.getEditExpense = async(req, res, next) =>{
  const prodId = req.params.id;
  const UserId = req.user.id;

  try {
    const expense = await UserExpense.findOne({
      _id: prodId,
      userId: UserId
    });
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { totalExpense: -expense.amount }
    });
    return res.json(expense);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};




exports.postEditExpense = async (req, res, next) => {
  const { amount, description, category } = req.body;
  const prodId = req.params.id;
  const userId = req.user.id;
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const expense = await UserExpense.findOneAndUpdate(
      { _id: prodId, userId },
      { amount, description, category },
      { new: true, session }
    );
    if (!expense) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Expense not found" });
    }
    await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { totalExpense: amount } },
      { new: true, session }
    );
    await session.commitTransaction();
    session.endSession();
    return res.json(expense);
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

  