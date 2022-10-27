import type { FunctionComponent } from "react";
import React from "react";
import { useDispatch } from "react-redux";

import type { Country } from "../../../interfaces/country.interface";
import {
	closeMatchComponent,
	closeWinnerComponent,
} from "../../../store/features/counter/counterSlice";

interface Props {
	country: Country;
	refetch: any;
}

const Winner: FunctionComponent<Props> = ({ country, refetch }) => {
	const dispatch = useDispatch();

	const closeHandler = () => {
		dispatch(closeMatchComponent());
		dispatch(closeWinnerComponent());
		refetch();
	};

	return (
		<div className="absolute flex flex-col items-center justify-center w-screen h-screen bg-slate-100 absolute top-0 left-0">
			<p className="uppercase">Winner</p>
			<p className="uppercase">{country?.name}</p>
			<img className="w-56" src={country?.flag} alt={country?.name} />

			<button
				className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
				onClick={closeHandler}>
				Cerrar
			</button>
		</div>
	);
};

export default Winner;
