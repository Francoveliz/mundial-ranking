import type { FunctionComponent } from 'react';

interface Props {
  team: any;
  position: any;
}

export const LeaderboardItem: FunctionComponent<Props> = ({
  team,
  position,
}) => {
  return (
    <div className="flex items-center w-full h-12 min-w-full border rounded-r-lg">
      <div className="flex items-center justify-center w-12 h-12 px-4 text-white rounded-l-lg bg-gradient-to-r from-blue-500 to-blue-400">
        {position + 1}
      </div>
      <img
        src={team.flag}
        alt="flag"
        className="object-cover my-2 ml-2 mr-4 border border-gray-400 rounded-full w-9 h-9"
      />
      <p className="flex-1 ">{team.name}</p>
      <p className="mr-2">{team.elo}pts.</p>
    </div>
  );
};
