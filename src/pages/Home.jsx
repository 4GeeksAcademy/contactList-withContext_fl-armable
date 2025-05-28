import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Instrucciones } from "../components/Instrucciones.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<h1>You are at home!!!</h1>
				<Instrucciones/>
		</div>
	);
}; 