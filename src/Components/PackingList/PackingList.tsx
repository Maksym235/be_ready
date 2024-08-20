import { FC, useState } from "react";
import styles from "./PackingList.module.css";
import { TogglerLists } from "../TogglerLists/TogglerLists";
import { EmptyLists } from "../EmptyLists/EmptyLists";
import { PersonalItem } from "./PersonalItem/PersonalItem";
// import { AllListBelow } from "../AllListBelow/AllListBelow";
import { Link, useLocation } from "react-router-dom";
export interface IProps {
	lists: any;
}
export const PackingList: FC<IProps> = ({ lists }) => {
	const location = useLocation();
	const userLists: any = {
		personal: lists.personal,
		shared: lists.connected,
	};
	const [currentList, setCurrentList] = useState("personal");
	console.log(userLists[currentList]);
	return (
		<div className={styles.background}>
			<div className={styles.container}>
				<p className={styles.title}>Packing list </p>
				<TogglerLists toggle={setCurrentList} />
				{userLists[currentList] && userLists[currentList].length > 0 ? (
					<ul className={styles.list}>
						{userLists[currentList].map((el: any, index: number) => (
							<li key={index}>
								<Link state={{ from: location }} to={`/selectedList/${el._id}`}>
									<PersonalItem name={el.name} />
								</Link>
							</li>
						))}
					</ul>
				) : (
					<EmptyLists list={currentList} />
				)}
				{/* {lists.length === 0 ? (
					<EmptyLists list={currentList} />
				) : (
					<AllListBelow list={currentList} />
				)} */}
				{/*========================================================== */}
				{/* {lists.length > 0 && (
					<ul className={styles.list}>
						{lists.map((el: any, index: number) => (
							<li key={index}>
								<Link
									state={{ from: location }}
									to={`/selectedList/${el.name}`}
								>
									<PersonalItem name={el.name} />
								</Link>
							</li>
						))}
					</ul>
				)} */}
			</div>
		</div>
	);
};
