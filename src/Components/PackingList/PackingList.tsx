import { FC, useState } from "react";
import styles from "./PackingList.module.css";
import { TogglerLists } from "../TogglerLists/TogglerLists";
import { EmptyLists } from "../EmptyLists/EmptyLists";
import { PersonalItem } from "./PersonalItem/PersonalItem";
import { AllListBelow } from "../AllListBelow/AllListBelow";
import { Link } from "react-router-dom";
export interface IProps {
	lists: any;
}
export const PackingList: FC<IProps> = ({ lists }) => {
	const [currentList, setCurrentList] = useState("personal");
	return (
		<div className={styles.background}>
			<div className={styles.container}>
				<p className={styles.title}>Packing list </p>
				<TogglerLists toggle={setCurrentList} />
				{lists.length === 0 ? (
					<EmptyLists list={currentList} />
				) : (
					<AllListBelow list={currentList} />
				)}
				{lists.length > 0 && (
					<ul className={styles.list}>
						{lists.map((el: any, index: number) => (
							<li key={index}>
								<Link to={`/selectedList/${el.name}`}>
									<PersonalItem name={el.name} />
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
