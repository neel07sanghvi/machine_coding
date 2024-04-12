import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductsPage from "./components/ProductsPage";
import { themeCtx } from "./contexts/ContextPlus";
import CartCtxProvider from "./contexts/CartCtxProvider";
import CartPage from "./components/CartPage";

export const PRODUCTS_ROUTE = "/products";
export const CART_ROUTE = "/cart";

function App() {
	const theme = {
		backgroundColor: "#ececec",
		darkBgColor: "#ccc",
	};

	return (
		<themeCtx.Provider value={theme}>
			<CartCtxProvider>
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={<Navigate to={PRODUCTS_ROUTE} replace />}
						/>
						<Route
							path="*"
							element={<Navigate to={PRODUCTS_ROUTE} replace />}
						/>
						<Route path={PRODUCTS_ROUTE} element={<ProductsPage />} />
						<Route path={CART_ROUTE} element={<CartPage />} />
					</Routes>
				</BrowserRouter>
			</CartCtxProvider>
		</themeCtx.Provider>
	);
}

export default App;
