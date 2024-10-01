import { FC } from "react";
import styles from "./AddNewFriend.module.css";
import { ModalContainer } from "../ModalContainer/ModalContainer";
import { useFormik } from "formik";
interface IProps {
	isOpen: boolean;
	toggleModal: () => void;
}
export const AddNewFriend: FC<IProps> = ({ isOpen, toggleModal }) => {
	const validate = (values: { userid: string }) => {
		const errors: Record<string, undefined | string> = {
			userid: undefined,
		};
		if (!values.userid) {
			errors.userid = "Required";
		} else if (!/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i.test(values.userid)) {
			errors.userid = "Invalid id";
		}
		return errors;
	};
	const formik = useFormik({
		initialValues: {
			userid: "",
		},
		validate,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});
	return (
		<ModalContainer
			title="Add new friend"
			isOpen={isOpen}
			toggleModal={toggleModal}
		>
			<form className={styles.form} onSubmit={formik.handleSubmit}>
				<input
					className={styles.input}
					id="userid"
					name="userid"
					type="text"
					onChange={formik.handleChange}
					value={formik.values.userid}
					placeholder="Enter the ID of the user you want to add*"
				/>
				{/* <button onClick={handlePaste}>paste</button> */}
				{formik.errors.userid ? (
					<p className={styles.error_msg}>{formik.errors.userid}</p>
				) : null}
			</form>
			<div className={styles.btn_wrapper}>
				<button
					className={styles.btn_save}
					disabled={formik.values.userid.length === 0}
					type="submit"
					onClick={() => formik.handleSubmit()}
				>
					Add
				</button>
				<button className={styles.btn_cancel}>Cancel</button>
			</div>
		</ModalContainer>
	);
};
