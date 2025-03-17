import React from "react";

import HomeImage from "../components/HomeImage/HomeImage";
import BestSellers from "./BestSeller/BestSeller";
import Latest from "./Latest/Latest";
import Endpage from "../components/Endpage/Endpage";

const Home = () => {
    return (
        <div>
            <HomeImage/>
            <BestSellers/>
            <Latest/>
            <Endpage/>
        </div>
    )
}

export default Home