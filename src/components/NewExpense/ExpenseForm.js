import React, { useRef, useState, useReducer, useEffect } from "react";
import "./ExpenseForm.css";
import ErrorModal from "../UI/ErrorModal";
import Input from "../UI/Input";
import Button from "../UI/Button";

const titleReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val !== "" };
  } else if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value !== "" };
  }
  return { value: "", isValid: false };
};

const amountReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val !== "" && action.val > 0 };
  } else if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value !== "" && state.value > 0,
    };
  }
  return { value: "", isValid: false };
};

const dateReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val !== "" && action.val !== "",
    };
  } else if (action.type === "INPUT_BLUR") {
    return {
      value: state.value,
      isValid: state.value !== "" && state.value !== "",
    };
  }
  return { value: "", isValid: false };
};

const ExpenseForm = (props) => {
  const titleInputRef = useRef();
  const amountInputRef = useRef();
  const dateInputRef = useRef();

  const [error, setError] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const [titleState, dispatchTitle] = useReducer(titleReducer, {
    value: "",
    isValid: null,
  });

  const [amountState, dispatchAmount] = useReducer(amountReducer, {
    value: "",
    isValid: null,
  });

  const [dateState, dispatchDate] = useReducer(dateReducer, {
    value: "",
    isValid: null,
  });

  const titleChangehandler = (event) => {
    dispatchTitle({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      titleState.isValid && amountState.isValid && dateState.isValid
    );
  };

  const amountChangehandler = (event) => {
    dispatchAmount({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      titleState.isValid && amountState.isValid && dateState.isValid
    );
  };

  const dateChangehandler = (event) => {
    dispatchDate({ type: "USER_INPUT", val: event.target.value });
    setFormIsValid(
      titleState.isValid && amountState.isValid && dateState.isValid
    );
  };

  const { isValid: titleIsValid } = titleState;
  const { isValid: amountIsValid } = amountState;
  const { isValid: dateIsValid } = dateState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(titleIsValid && amountIsValid && dateIsValid);
    }, 500);

    return () => {
      console.log("CLEAN UP!");
      clearTimeout(identifier);
    };
  }, [titleIsValid, amountIsValid, dateIsValid]);

  const validateTitleHandler = () => {
    dispatchTitle({ type: "INPUT_BLUR" });
  };

  const validateAmountHandler = () => {
    dispatchAmount({ type: "INPUT_BLUR" });
  };

  const validateDateHandler = () => {
    dispatchDate({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault(); // Prevent the default functionality (Automatically reload page)

    if (formIsValid) {
      const expenseData = {
        title: titleState.value,
        amount: +amountState.value,
        date: new Date(dateState.value),
      };

      props.onSaveExpenseDate(expenseData);
    } else if (!titleIsValid) {
      setError({
        title: "Invalid Title",
        message: "Plesas enter a valid title (non-empty values).",
      });
    } else if (!amountIsValid) {
      setError({
        title: "Invalid Amount",
        message: "Plesas enter a valid amout (non-empty values).",
      });
    } else {
      setError({
        title: "Invalid Date",
        message: "Plesas enter a valid date (non-empty values).",
      });
    }
  };

  const errorHandler = () => {
    if (!titleIsValid) {
      titleInputRef.current.focus();
    } else if (!amountIsValid) {
      amountInputRef.current.focus();
    } else {
      dateInputRef.current.focus();
    }
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
          onKeyPress={errorHandler}
        />
      )}
      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <Input
            label="Title"
            isValid={titleState.isValid}
            value={titleState.value}
            type="text"
            ref={titleInputRef}
            onChange={titleChangehandler}
            onBlur={validateTitleHandler}
            onFocus={validateTitleHandler}
          />
          <Input
            label="Amount"
            type="number"
            isValid={amountState.isValid}
            value={amountState.value}
            min="0.01"
            step="0.01"
            ref={amountInputRef}
            onChange={amountChangehandler}
            onBlur={validateAmountHandler}
            onFocus={validateAmountHandler}
          />
          <Input
            label="Date"
            type="date"
            isValid={dateState.isValid}
            value={dateState.value}
            min="2019-01-01"
            max="2023-12-31"
            ref={dateInputRef}
            onChange={dateChangehandler}
            onBlur={validateDateHandler}
            onFocus={validateDateHandler}
          />
          <div className="new-expense__actions">
            <Button onClick={props.onCancel}>Cancel</Button>
            <Button type="submit" onKeyPress={submitHandler}>Add Expense</Button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};
export default ExpenseForm;
