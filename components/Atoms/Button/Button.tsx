import React, { FunctionComponent } from "react";

interface Props {
	children: any;
	size: any;
}

const Button: FunctionComponent<Props> = ({
	children,
	size = "default",
	...props
}) => {
	const sizes: any = {
		default: {
			px: "px-6",
			py: "py-2",
			textSize: "text-base",
		},
		xl: { px: "px-8", py: "py-4", textSize: "text-xl" },
	};
	return (
		<button
			{...props}
			className={` ${sizes[size].px} ${sizes[size].py} font-medium tracking-wide ${sizes[size].textSize} text-white capitalize transition-colors duration-300 bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 `}>
			{children}
		</button>
	);
};

export default Button;
