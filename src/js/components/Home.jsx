import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import {Todolist} from "./Todolist.jsx"; 

//create your first component
const Home = () => {
	return (
		<div className="text-center">
            
			<Todolist/> 

			
		</div>
	);
};

export default Home;