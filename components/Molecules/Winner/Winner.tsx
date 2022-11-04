import Image from "next/image";
import type { FunctionComponent } from "react";
import React from "react";
import Confetti from "react-confetti";
import { useDispatch } from "react-redux";

import type { Country } from "../../../interfaces/country.interface";
import {
	closeMatchComponent,
	closeWinnerComponent,
} from "../../../store/features/counter/counterSlice";
import { H2 } from "../../Atoms/H2/H2";
import { H3 } from "../../Atoms/H3/H3";

interface Props {
	country: Country | undefined;
	refetch: any;
}

const Winner: FunctionComponent<Props> = ({ country, refetch }) => {
	const dispatch = useDispatch();

	const closeHandler = () => {
		dispatch(closeMatchComponent());
		dispatch(closeWinnerComponent());
		refetch();
	};

	if (!country) return;

	return (
		<>
			<div className="absolute top-0 left-0 flex flex-col items-center justify-center w-screen h-screen bg-white">
				<H2>Winner</H2>
				<H3 className="mb-4">{country?.name}</H3>
				<div className="relative h-32 mb-4 overflow-hidden aspect-video	shadow-xl	">
					<Image
						src={country.flag}
						alt={country.name}
						layout="fill"
						objectFit="cover"
					/>
				</div>
				<button
					className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
					onClick={closeHandler}>
					Volver
				</button>
			</div>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				tweenDuration={500}
			/>
		</>
	);
};

export default Winner;
