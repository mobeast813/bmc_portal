import React from "react";
import { CRow } from "@coreui/react";
import { useCookies } from "react-cookie";
import Voltage from "./contents/Voltage";
import JoinUnjoin from "./contents/JoinUnjoin";
import BoaGroup from "./contents/BoaGroup";
import BmcPower from "./contents/BmcPower";
import PowerSupply from "./contents/PowerSupply";
import Vender from "./contents/Vendor";
import Fan from "./contents/Fan";
import Temperature from "./contents/Temperature";
import { Link } from "react-router-dom";

const Dashboard = () => {
	const [cookies] = useCookies(["userId"]);
	var userId = `${cookies.userId}`

	//todo : 항목 선택시 해당 화면으로 이동하도록 수정
	return (
		<>
			<CRow>
				<div className="d-flex flex-wrap mb-4" style={{ padding: 0 }}>
					<Link to="/bmc-device/server"><Vender userId={userId} /></Link>
					<Link to="/bmc-device/server"><JoinUnjoin userId={userId} /></Link>
					<Link to="/bmc-device/server"><BoaGroup userId={userId} /></Link>
					<Link to="/bmc-device/server"><BmcPower userId={userId} /></Link>
					<Link to="/monitoring/all"><Temperature userId={userId} /></Link>
					<Link to="/monitoring/all"><PowerSupply userId={userId} /></Link>
					<Link to="/monitoring/all"><Voltage userId={userId} /></Link>
					<Link to="/monitoring/all"><Fan userId={userId} /></Link>
				</div>
			</CRow >
		</>
	);
};

export default Dashboard;
