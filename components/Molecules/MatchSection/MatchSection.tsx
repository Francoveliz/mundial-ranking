import React, { FunctionComponent } from "react";
import { H3 } from "../../Atoms/H3/H3";
import { Spinner } from "../../Atoms/Spinner/Spinner";

type Props = {
	selectTeam: any;
	isFetching: any;
	flag: any;
	name: any;
};

export const MatchSection: FunctionComponent<Props> = ({
	selectTeam,
	isFetching,
	flag,
	name,
}) => {
	return (
		<div
			className="flex flex-col items-center justify-center h-1/2 group bg-white"
			onClick={selectTeam}>
			{isFetching ? "" : <H3 className="mb-4">{name}</H3>}
			{isFetching ? (
				<Spinner />
			) : (
				<img
					src={flag}
					className="w-56 group-hover:w-60 transition ease-in-out duration-700 shadow-lg"
					alt="flag"></img>
			)}
		</div>
	);
};
