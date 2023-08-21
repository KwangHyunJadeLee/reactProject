import React, { useState } from "react";

import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import "./Expenses.css";

const Expenses = (props) => {
  const [filteredYear, setFilteredYear] = useState("");

  const filterChangeHandler = (selectedYear) => {
    return setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter((expenses) => {
    if (filteredYear === "") {
      return expenses;
    } else {
      return expenses.date.getFullYear().toString() === filteredYear;
    }
  });

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      {/* if this first condition is met, it moves on to the part after the end operatorand it then returns, that value. */}
      {/* {filteredExpenses.length === 0 && <p>No expenses found.</p>}
      {filteredExpenses.length > 0 &&
        filteredExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            title={expense.title}
            amount={expense.amount}
            date={expense.date}
          />
        ))} */}
      <ExpensesList items={filteredExpenses}/>
    </Card>
  );
};

export default Expenses;
