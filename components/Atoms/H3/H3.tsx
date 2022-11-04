import React, { FunctionComponent } from "react";

type Props = {
	children: any;
	className?: string;
};

export const H3: FunctionComponent<Props> = ({ children, className }) => {
	return <h3 className={`text-3xl font-bold ${className}`}>{children}</h3>;
};
