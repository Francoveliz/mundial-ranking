import React, { FunctionComponent } from "react";

type Props = {
	children: any;
	className?: string;
};

export const H2: FunctionComponent<Props> = ({ children, className }) => {
	return <h2 className={`text-4xl font-bold ${className}`}>{children}</h2>;
};
