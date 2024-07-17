import { FC, ReactNode, useState } from "react";
import edit from "../../../assets/SelectedList/Footer/icon_edit.svg";
import share from "../../../assets/SelectedList/Footer/icon_share.svg";
import marked_eye from "../../../assets/SelectedList/Footer/icon_marked_eye.svg";
import styles from "./SelectedListFooter.module.css";
import cross from "../../../assets/SelectedList/icon_close.svg";
import dobble_check from "../../../assets/SelectedList/icon_dobble_check.svg";
interface IFootersContentProps {
	changeFooterState: (state: string) => void;
}
interface ISelectedListFooter {
	toggleIsEditing: () => void;
}
const DefaultFooterContent: FC<IFootersContentProps> = ({
	changeFooterState,
}) => {
	return (
		<>
			<div className={styles.footer_btns}>
				<img className={styles.footer_icon} src={share} />
				<p className={styles.footer_text}>Share List</p>
			</div>
			<div className={styles.footer_btns}>
				<img className={styles.footer_icon} src={marked_eye} />
				<p className={styles.footer_text}>Hide Marked</p>
			</div>
			<div
				className={styles.footer_btns}
				onClick={() => changeFooterState("edit")}
			>
				<img className={styles.footer_icon} src={edit} />
				<p className={styles.footer_text}>Edit</p>
			</div>
		</>
	);
};

const EditFooterContent: FC<IFootersContentProps> = ({ changeFooterState }) => {
	return (
		<div className={styles.edit_footer_container}>
			<div
				className={styles.footer_btns}
				onClick={() => changeFooterState("default")}
			>
				<img
					className={styles.footer_icon}
					width={24}
					height={24}
					src={cross}
				/>
				<p className={styles.footer_text}>Cancel</p>
			</div>
			<div
				className={styles.footer_btns}
				onClick={() => changeFooterState("default")}
			>
				<img
					className={styles.footer_icon}
					width={24}
					height={24}
					src={dobble_check}
				/>
				<p className={styles.footer_text}>Save</p>
			</div>
		</div>
	);
};
export const SelectedListFooter: FC<ISelectedListFooter> = ({
	toggleIsEditing,
}) => {
	const [footerState, setFooterState] = useState("default");
	const handleSetFooterState = (state: string) => {
		setFooterState(state);

		toggleIsEditing();
	};
	const footers: Record<string, ReactNode> = {
		default: <DefaultFooterContent changeFooterState={handleSetFooterState} />,
		edit: <EditFooterContent changeFooterState={handleSetFooterState} />,
	};
	return <div className={styles.footer}>{footers[footerState]}</div>;
};
