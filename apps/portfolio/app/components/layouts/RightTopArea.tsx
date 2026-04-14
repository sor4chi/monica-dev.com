import Hamburger from "./Hamburger";
import { styles } from "./RightTopArea.css";
import Switch from "./Switch";

export default function RightTopArea() {
  return (
    <span className={styles.rightTopArea}>
      <Switch />
      <Hamburger />
    </span>
  );
}
