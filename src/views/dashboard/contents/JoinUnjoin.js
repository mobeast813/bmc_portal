import React, { useState, useEffect } from "react";
import { CRow } from "@coreui/react";
import { Cookies } from "react-cookie";
import PieChart from "../../../components/charts/PieChart";

import { getDashboardJoin } from "../../../apis/dashboard/DashBoardApi";
import ColorUtils from "../../../utils/ColorUtils";
import { useDispatch } from "react-redux";

const JoinUnjoin = (props) => {
	const { userId } = props
	const dispatch = useDispatch();

	const [dashBoardData, setDashBoardData] = useState([]);
	const [labels, setLabels] = useState([]);

	useEffect(() => {
		getDashboardJoin({ userId: userId })
			.then(async (response) => {
				setLabels(Object.keys(response.dash_join[0]))
				setDashBoardData(Object.values(response.dash_join[0]));
			}).catch((error) => {
				console.log(error)
				//dispatch({ type: "modal", showAlertModal: { isShow: true, title: "JoinUnjoin Error", msg: "JoinUnjoin에 문제가 있습니다. 확인해주세요" } });
			});

	}, []);

	return (
		// todo : 클릭시 특정 페이지로 이동하도록 수정
		<>
			<CRow>
				<div className="d-flex flex-wrap mb-4 me-4" style={{ padding: 0 }}>
					<PieChart title="Join / UnJoin"
						bgColors={ColorUtils.CHART_COLORS.TWO_FACTOR} labels={labels} data={dashBoardData} />
				</div>
			</CRow >
		</>
	);
};

export default JoinUnjoin;
