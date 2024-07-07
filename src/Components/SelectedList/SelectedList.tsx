import { FC } from "react";
import { useParams } from "react-router-dom";
import styles from "./SelectedList.module.css";
import camp from "../../assets/icon_camp.svg";
import arrow_bottom from "../../assets/arrow_bottom.svg";
import edit from "../../assets/icon_edit.svg";
import share from "../../assets/icon_share.svg";
import marked_eye from "../../assets/icon_marked_eye.svg";
export const SelectedList: FC = () => {
	const listId = useParams();
	return (
		<div className={styles.container}>
			<div className={styles.category}>
				<div className={styles.title_img}>
					<img src={camp} alt="camp icon" />
					<h4 className={styles.title}>Camp</h4>
				</div>
				<div className={styles.cout_arrow}>
					<div className={styles.counter}>0/9</div>
					<img src={arrow_bottom} />
				</div>
			</div>
			<div className={styles.footer}>
				<div className={styles.footer_btns}>
					<img className={styles.footer_icon} src={share} />
					<p className={styles.footer_text}>Share List</p>
				</div>
				<div className={styles.footer_btns}>
					<img className={styles.footer_icon} src={marked_eye} />
					<p className={styles.footer_text}>Hide Marked</p>
				</div>
				<div className={styles.footer_btns}>
					<img className={styles.footer_icon} src={edit} />
					<p className={styles.footer_text}>Edit</p>
				</div>
			</div>
		</div>
	);
};
