import React from "react";

const Button = ({ children, ...props }: { children: any }) => {
	return (
		<button
			{...props}
			className="fixed px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 bottom-4">
			{children}
		</button>
	);
};

export default Button;
