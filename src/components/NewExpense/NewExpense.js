import { useState } from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";
import Button from "../UI/Button";

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString(),
    };
    props.onAddExpense(expenseData);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const onCancelHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className="new-expense">
      {isEditing}
      {!isEditing && (
        <Button onClick={startEditingHandler}>Add New Expense</Button>
      )}
      {isEditing && (
        <ExpenseForm
          onSaveExpenseDate={saveExpenseDataHandler}
          onCancel={onCancelHandler}
        />
      )}
    </div>
  );
};

export default NewExpense;
