import React from "react";
import ReactDOM from "react-dom";
import styles from "./ErrorModal.module.css";
import Card from "./Card";

const ErrorModal = (props) => {
  const Backdrop = (props) => {
    return <div className={styles.backdrop} onClick={props.onConfirm} />;
  };

  const ModalOverlay = (props) => {
    return (
      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={styles.content}>
          <p>{props.message}</p>
        </div>
        <footer className={styles.actions}>
          <button className={styles.button} onClick={props.onConfirm}>Okay</button>
        </footer>
      </Card>
    );
  };

  return (
    // adding React Fragment & React Portal
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          onConfirm={props.onConfirm}
          title={props.title}
          message={props.message}
        />,
        document.getElementById("overlay-root")
      )}
    </React.Fragment>
  );
};

export default ErrorModal;