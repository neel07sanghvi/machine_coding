import { createContext, useContext } from "react";

export const themeCtx = createContext();

export const cartCtx = createContext();

export const useThemeCtx = () => {
	return useContext(themeCtx);
};

export const useCartCtx = () => {
	return useContext(cartCtx);
};
