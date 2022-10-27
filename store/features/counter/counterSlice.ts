import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { Country } from "../../../interfaces/country.interface";

export interface CounterState {
	winnerIsOpen: boolean;
	matchIsOpen: boolean;
	countryA: Country | null;
	countryB: Country | null;
}

const initialState: CounterState = {
	winnerIsOpen: false,
	matchIsOpen: false,
	countryA: null,
	countryB: null,
};

export const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		closeWinnerComponent: (state) => {
			state.winnerIsOpen = false;
		},
		openWinnerComponent: (state) => {
			state.winnerIsOpen = true;
		},
		closeMatchComponent: (state) => {
			state.matchIsOpen = false;
		},
		openMatchComponent: (state) => {
			state.matchIsOpen = true;
		},
		setCountryA: (state, action: PayloadAction<Country>) => {
			state.countryA = action.payload;
		},
		setCountryB: (state, action: PayloadAction<Country>) => {
			state.countryB = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	closeWinnerComponent,
	openWinnerComponent,
	closeMatchComponent,
	openMatchComponent,
	setCountryA,
	setCountryB,
} = counterSlice.actions;

export default counterSlice.reducer;
