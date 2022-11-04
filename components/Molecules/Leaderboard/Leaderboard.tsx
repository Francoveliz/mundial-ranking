import type { FunctionComponent } from "react";
import React from "react";

import { LeaderboardItem } from "../../Atoms/LeaderboardItem/LeaderboardItem";

interface Props {
	data: any;
}

export const Leaderboard: FunctionComponent<Props> = ({ data }) => {
	console.log({ data });
	return (
		<div className="w-full md:w-[720px] bg-white ">
			<div className="flex flex-col items-center ">
				<div className="flex flex-col w-full gap-4 pb-24">
					{data?.map((team: any, index: any) => (
						<LeaderboardItem key={team.id} team={team} position={index} />
					))}
				</div>
			</div>
		</div>
	);
};
