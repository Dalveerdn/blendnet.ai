import React from "react";
import ReactDOM from "react-dom/client";
import Logo from "./logo/logo";
import TitleBrand from "./logo/logodiscription/discription";
import LoginLogout from "./loginlogout/loginlogout";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Logo />
		<TitleBrand />
		<LoginLogout />
	</React.StrictMode>,
);
