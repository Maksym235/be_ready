import { FC, useState } from "react";
import styles from "./LoginModal.module.css";
import google from "../../../../assets/google.svg";
import { ModalContainer } from "../../ModalContainer/ModalContainer";
// import { useAuth } from "../../../../Pages/Home/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAsync } from "../../../../Pages/Home/api";
interface IProps {
	toggleModal: () => void;
	isOpen: boolean;
	setCurrentModal: (key: string) => void;
}
export const LoginModal: FC<IProps> = ({
	toggleModal,
	isOpen,
	setCurrentModal,
}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	// const login = useAuth((state: any) => state.login);
	// const stateEmail = useAuth((state: any) => state.user);
	const queryClient = useQueryClient();

	// Queries
	// const query = useQuery({
	// 	queryKey: ["user"],
	// 	queryFn: () => loginAsync({ email, password }),
	// });
	// const { login, stateEmail, isLoading } = useAuth((store: any) => ({
	// 	login: store.login,
	// 	stateEmail: store.stateEmail,
	// 	isLoading: store.isLoading,
	// }));

	const { mutate, isPending } = useMutation({
		mutationFn: () => loginAsync({ email, password }),
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});
	const handleSubmit = (evt: any) => {
		evt.preventDefault();
		const loginData: { email: string; password: string } = {
			email: email,
			password: password,
		};
		//@ts-ignore
		mutate(loginData);
		if (!isPending) {
			toggleModal();
		}
	};
	return (
		<ModalContainer
			title="Log in to account"
			isOpen={isOpen}
			toggleModal={toggleModal}
		>
			<form className={styles.form}>
				<input
					onChange={(e) => setEmail(e.currentTarget.value)}
					placeholder="Enter your email...*"
					className={styles.input}
					type="email"
				/>
				<input
					onChange={(e) => setPassword(e.currentTarget.value)}
					placeholder="Enter your password...*"
					className={styles.input}
					type="password"
				/>
				<div className={styles.btn_wrapper}>
					<button
						onClick={handleSubmit}
						className={styles.sing_up}
						type="submit"
					>
						Sign in
					</button>
					<button className={styles.google} type="button">
						<img width={24} height={24} src={google} alt="google icon" />
						Google
					</button>
				</div>
			</form>
			<button
				onClick={() => setCurrentModal("resetPassEnterEmail")}
				className={styles.resetPass}
			>
				RESET PASSWORD
			</button>
			<div className={styles.alredy_have_acc_block}>
				<p className={styles.alredy_have_acc_text}>DON’T HAVE AN ACCOUNT? </p>
				<button
					onClick={() => setCurrentModal("register")}
					className={styles.sing_in}
				>
					SIGN UP
				</button>
			</div>
		</ModalContainer>
	);
};
