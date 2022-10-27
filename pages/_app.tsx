import "../styles/global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import { store } from "../store/index";

const queryClient = new QueryClient();

const MyApp = ({ Component, pageProps }: AppProps) => (
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	</QueryClientProvider>
);

export default MyApp;
