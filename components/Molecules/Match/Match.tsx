import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Vs from "../../Atoms/Vs/Vs";
import type { RootState } from "../../../store";
import { openWinnerComponent } from "../../../store/features/counter/counterSlice";

import Winner from "../Winner/Winner";
import { Spinner } from "../../Atoms/Spinner/Spinner";
import { MatchSection } from "../MatchSection/MatchSection";
import { Country } from "../../../interfaces/country.interface";
import { H3 } from "../../Atoms/H3/H3";

interface Props {
	refetch: any;
}

const Match: FunctionComponent<Props> = ({ refetch }) => {
	const dispatch = useDispatch();
	const [countryA, setCountryA] = useState<Country>();
	const [countryB, setCountryB] = useState<Country>();
	const [winner, setWinner] = useState<Country>();

	const winnerIsOpen = useSelector(
		(state: RootState) => state.counter.winnerIsOpen
	);

	const { isLoading, error, data, isFetching, isFetched } = useQuery({
		queryKey: ["countries"],
		queryFn: () =>
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/match`).then((res) =>
				res.json()
			),
		refetchIntervalInBackground: false,
		refetchOnWindowFocus: false,
		keepPreviousData: false,
	});

	const mutationElo = useMutation((countriesIds) => {
		return axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/match`,
			countriesIds
		);
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
		<div className="absolute top-0 left-0 w-screen h-screen max-h-screen  flex items-center justify-center ">
			<div className="w-[720px] h-screen border-2	 relative">
				<MatchSection
					selectTeam={selectTeamA}
					isFetching={isFetching}
					flag={countryA?.flag}
					name={countryA?.name}
				/>
				<div className="absolute my-1 h-0.5 w-full bg-gray-200  ">
					<div className="absolute -translate-x-10 -top-10 left-1/2">
						<Vs></Vs>
					</div>
				</div>
				<MatchSection
					selectTeam={selectTeamB}
					isFetching={isFetching}
					flag={countryB?.flag}
					name={countryB?.name}
				/>
			</div>
			{winnerIsOpen && (
				<Winner refetch={refetch} country={winner}></Winner>
			)}
		</div>
	);
};

export default Match;
