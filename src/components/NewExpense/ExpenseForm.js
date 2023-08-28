import React, { useRef, useState } from "react";
import "./ExpenseForm.css";
import ErrorModal from "../UI/ErrorModal";

const ExpenseForm = (props) => {
  // There are two ways to update userInput ..
  // One is to use each other's useState.
  // The other is using objects.
  // There is no additional benefit to using either one.
  // Depends on preference
  // see the syntax example below

  // const [enteredTitle, setEnteredTitle] = useState("");
  // const [enteredAmount, setEnteredAmount] = useState("");
  // const [enteredDate, setEnteredDate] = useState("");

  // Those Inputs are simply text what user puts into
  // Which means no needed change state or something else dynamically.
  // In that case, Using Ref can be better.
  const titleInputRef = useRef();
  const amountInputRef = useRef();
  const dateInputRef = useRef();

  const [error, setError] = useState();

  //   const [userInput, setUserInput] = useState({
  //     enteredTitle: "",
  //     enteredAmount: "",
  //     enteredDate: "",
  //   });

  // const titleChangeHandler = (event) => {
  //   setEnteredTitle(event.target.value);

  // ************************* Alternative ways to change state ************************************************ /
  // setUserInput({                          // In this case, the values of other objects must also be specified.
  //   ...userInput,                         // ES6 Syntax.. all Object copy.
  //   enteredTitle: event.target.value,     // Change only the values included in the event
  // });

  // In the case above, it can be wrong if the state reference wrong version of state
  // setUserInput((prevState) => {
  //   return { ...prevState, enteredTitle: event.target.value }; // The prevState helps state keep always latest.
  // });

  // ex) It should always be used in places like the Counter example like below
  // export default function App() {
  //     const [counter, setCounter] = useState(0);
  //     const counterHandler = () => {
  //         setCounter(prevState => ++prevState);
  //     };
  //     return (
  //       <div>
  //         <p id="counter">{counter}</p>
  //         <button onClick={counterHandler}>Increment</button>
  //       </div>
  //     );
  // }
  // *********************** //Alternative ways to change state ************************************************ /
  //};

  // const amountChangeHandler = (event) => {
  //   setEnteredAmount(event.target.value);
  // };

  // const dateChangeHandler = (event) => {
  //   setEnteredDate(event.target.value);
  // };

  //  There's another way to define Handler function at once.
  //  identifier and value should be defined in DOM
  //   const inputChangeHandler = (identifier, value) => {
  //     if (identifier === "title") {
  //       setEnteredTitle(value);
  //     } else if (identifier === "amount") {
  //       setEnteredAmount(value);
  //     } else if (identifier === "date") {
  //       setEnteredDate(value);
  //     }
  //   };

  const submitHandler = (event) => {
    event.preventDefault(); // Prevent the default functionality (Automatically reload page)

    const enteredTitle = titleInputRef.current.value;
    const enteredAmount = amountInputRef.current.value;
    const enteredDate = dateInputRef.current.value;

    // Validation Check
    if (enteredTitle === "") {
      setError({
        title: "Invalid input",
        message: "Plesas enter a valid title (non-empty values).",
      });
      return;
    }

    if (enteredAmount === "") {
      setError({
        title: "Invalid input",
        message: "Plesas enter a valid amout (non-empty values).",
      });
      return;
    }

    if (enteredDate === "") {
      setError({
        title: "Invalid input",
        message: "Plesas enter a valid date (non-empty values).",
      });
      return;
    }

    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };

    props.onSaveExpenseDate(expenseData);

    // setEnteredTitle(""); // submitted form init.
    // setEnteredAmount("");
    // setEnteredDate("");

    titleInputRef.current.value = "";
    amountInputRef.current.value = "";
    dateInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Title</label>
            <input
              type="text"
              // value={enteredTitle} // 2-way binding!
              // onChange={titleChangeHandler}
              ref={titleInputRef}
            />
            {/* <input
          type="text"
          onChange={(event) => {
            inputChangeHandler("title", event.target.value);
          }}
        /> */}
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              // value={enteredAmount}
              // onChange={amountChangeHandler}
              ref={amountInputRef}
            />
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input
              type="date"
              min="2019-01-01"
              max="2023-12-31"
              // value={enteredDate}
              // onChange={dateChangeHandler}
              ref={dateInputRef}
            />
          </div>
          <div className="new-expense__actions">
            <button onClick={props.onCancel}>Cancel</button>
            <button type="submit">Add Expense</button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};
export default ExpenseForm;
