import React, { useReducer, useRef, useState } from "react";
import { cartCtx } from "./ContextPlus";

const CartCtxProvider = ({ children }) => {
	const cartStore = useRef();

	const [state, dispatch] = useReducer(CtxCartReducer, cartStore.current);

	const cartStoreCtx = {
		rootState: state,
	};

	cartStoreCtx.addItem = (payload) => {
		dispatch({
			type: "add",
			payload: payload,
		});
	};

	cartStoreCtx.removeItem = (payload) => {
		dispatch({
			type: "remove",
			payload: payload,
		});
	};

	cartStoreCtx.changeQuantity = (payload) => {
		dispatch({
			type: "quantity",
			payload: payload,
		});
	};

	return <cartCtx.Provider value={cartStoreCtx}>{children}</cartCtx.Provider>;
};

function CtxCartReducer(state, action) {
	const type = action.type;
	const payload = action.payload;

	switch (type) {
		case "add": {
			const productId = payload.id;
			if (!state || !state[productId]) {
				return {
					...state,
					[productId]: {
						count: 1,
						product: payload,
					},
				};
			}
		}
		case "remove": {
			const productId = payload;
			const newState = {
				...state,
			};
			delete newState[productId];
			return newState;
		}
		case "quantity": {
			const productId = payload.id;
			const quantity = payload.quantity;
			if (!state || !state[productId]) {
				return state;
			} else {
				return {
					...state,
					[productId]: {
						...state[productId],
						count: quantity,
					},
				};
			}
		}
	}

	return state;
}

export default CartCtxProvider;
