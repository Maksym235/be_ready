// import React from 'react'
import styles from "./FriendsLists.module.css";
import cross_delete from "../../../assets/icon_close.svg";
import { useQuery } from "@tanstack/react-query";
import { getUserRequests } from "../../../Pages/Home/api";
import accept_icon from "../../../assets/SelectedList/icon_dobble_check.svg";
export interface IFriendsRequests {
	id: string;
	name: string;
}
export const FriendsLists = () => {
	const { data, isError, isLoading } = useQuery({
		queryKey: ["userRequests"],
		queryFn: getUserRequests,
	});
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error...</div>;
	}

	const friendsData = [
		{
			id: 1,
			name: "Roman",
		},
		{
			id: 2,
			name: "Mykola",
		},
		{
			id: 3,
			name: "Pasha",
		},
	];
	return (
		<div className={styles.container}>
			<div className={styles.list_container}>
				<p className={styles.title}>My friends</p>
				<ul className={styles.list}>
					{friendsData.map((el) => (
						<li className={styles.list_item}>
							{el.name}
							<button className={styles.delete_btn}>
								<img src={cross_delete} alt="delete" />
							</button>
						</li>
					))}
				</ul>
			</div>
			<div className={styles.list_container}>
				<p className={styles.title}>Awaiting acceptance</p>
				<ul className={styles.list}>
					{data &&
						data.requests.friends.map((el: IFriendsRequests) => (
							<li className={styles.list_item}>
								{el.name}
								<div className={styles.btn_wrapper}>
									<button className={styles.accept_btn}>
										<img src={accept_icon} alt="accept" />
									</button>
									<button className={styles.delete_btn}>
										<img src={cross_delete} alt="delete" />
									</button>
								</div>
							</li>
						))}
				</ul>
			</div>
		</div>
	);
};
