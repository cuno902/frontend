import React from "react";
import "./Endpage.css"
import { LiaShippingFastSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
const Endpage = () => {
 return(
    <div className="endpage-container">
        <img src="https://img.freepik.com/free-photo/high-angle-travel-items-arrangement_23-2148666246.jpg?t=st=1742153945~exp=1742157545~hmac=efd54c4aab89d9899f71388f1bf542b67e1bc0ab488a7a920acf67f12f3d262d&w=1380" alt="" />
        <div className="info">
            <div className="info-box">
            <LiaShippingFastSolid size={70}/>
            <h1>Miễn Phí Vận Chuyển</h1>
            </div>
            <div className="info-box">
                <BiSupport size={70}/>
                <h1>Hỗ Trợ Nhiệt Tình</h1>
            </div>
        </div>
    </div>
 )
}

export default Endpage