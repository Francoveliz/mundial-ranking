import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Vs from "../../Atoms/Vs/Vs";
import type { RootState } from "../../../store";
import { openWinnerComponent } from "../../../store/features/counter/counterSlice";

import Winner from "../Winner/Winner";

interface Props {
	refetch: any;
}

const Match: FunctionComponent<Props> = ({ refetch }) => {
	const dispatch = useDispatch();
	const [countryA, setCountryA] = useState(null);
	const [countryB, setCountryB] = useState(null);
	const [winner, setWinner] = useState(null);

	const winnerIsOpen = useSelector(
		(state: RootState) => state.counter.winnerIsOpen
	);

	const { isLoading, error, data } = useQuery(["countries"], () =>
		fetch(`${process.env.API_URL}/api/match`).then((res) => res.json())
	);

	const mutationElo = useMutation((countriesIds) => {
		return axios.post(`${process.env.API_URL}/api/match`, countriesIds);
	});

	useEffect(() => {
		if (!data) return;
		console.log(data);
		setCountryA(data[0]);
		setCountryB(data[1]);
	}, [data]);

	const setWinnerCountryA = () => {
		mutationElo.mutate({ winnerId: countryA.id, looserId: countryB.id });
	};

	const setWinnerCountryB = () => {
		mutationElo.mutate({ winnerId: countryB.id, looserId: countryA.id });
	};

	const selectTeamA = () => {
		setWinnerCountryA();
		dispatch(openWinnerComponent());
		setWinner(countryA);
	};

	const selectTeamB = () => {
		setWinnerCountryB();
		dispatch(openWinnerComponent());
		setWinner(countryB);
	};

	if (isLoading) <h1>loading</h1>;

	if (error) <h1> there was an error!</h1>;

	return (
		<div className="absolute w-screen h-screen max-h-screen max-h- bg-slate-100 ">
			<div
				className="flex flex-col items-center justify-center h-1/2"
				onClick={selectTeamA}>
				<p>{countryA?.name}</p>
				<img src={countryA?.flag} className="w-56" alt="flag"></img>
			</div>
			<div className="absolute my-1 h-0.5 w-full bg-slate-900">
				<div className="absolute -translate-x-10 -top-10 left-1/2">
					<Vs></Vs>
				</div>
			</div>
			<div
				className="flex flex-col items-center justify-center h-1/2"
				onClick={selectTeamB}>
				<p>{countryB?.name}</p>
				<img src={countryB?.flag} className="w-56" alt="flag"></img>
			</div>
			{winnerIsOpen && (
				<Winner refetch={refetch} country={winner}></Winner>
			)}
		</div>
	);
};

export default Match;
