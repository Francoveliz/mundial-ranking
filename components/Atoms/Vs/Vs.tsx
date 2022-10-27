import React from 'react';

const Vs = ({ ...props }) => {
  return (
    <div
      {...props}
      className="flex items-center justify-center w-20 h-20 bg-blue-400 rounded-full"
    >
      <p className="text-2xl font-bold text-white">VS</p>
    </div>
  );
};

export default Vs;
