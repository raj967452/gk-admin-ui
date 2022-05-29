import Spinner from "react-bootstrap/Spinner";
import styles from "./SpinnerComponent.module.css";

function Loading() {
  return (
    <div className={styles.fixedLoader}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loading;
