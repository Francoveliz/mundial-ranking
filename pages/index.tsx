import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../components/Atoms/Button/Button";
import { Leaderboard } from "../components/Molecules/Leaderboard/Leaderboard";
import Match from "../components/Molecules/Match/Match";
import type { RootState } from "../store";
import { openMatchComponent } from "../store/features/counter/counterSlice";

const Index = () => {
	const dispatch = useDispatch();
	const matchIsOpen = useSelector(
		(state: RootState) => state.counter.matchIsOpen
	);

	const { isLoading, error, data, refetch } = useQuery(["repo"], () =>
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/countries`).then((res) =>
			res.json()
		)
	);

	useEffect(() => {
		console.log(data, isLoading, error);
	}, [data]);

	const matchHandler = () => {
		dispatch(openMatchComponent());
	};

	return (
		<div className="flex flex-col items-center w-full px-4 font-sans">
			<Leaderboard data={data} />
			<Button onClick={matchHandler}>Match!</Button>
			{matchIsOpen && <Match refetch={refetch}></Match>}
		</div>
	);
};

export default Index;
