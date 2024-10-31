import React, { useState, useEffect } from "react";
import { CRow } from "@coreui/react";
import PieChart from "../../../components/charts/PieChart";
import { getDashboardPower } from "../../../apis/dashboard/DashBoardApi";
import ColorUtils from "../../../utils/ColorUtils";
import { useDispatch } from "react-redux";

const BmcPower = (props) => {
	const { userId } = props
	const dispatch = useDispatch();

	const [dashBoardData, setDashBoardData] = useState([]);
	const [labels, setLabels] = useState([]);

	useEffect(() => {
		getDashboardPower({ userId: userId })
			.then(async (response) => {
				setLabels(Object.keys(response.dash_power[0]))
				setDashBoardData(Object.values(response.dash_power[0]));
			}).catch((error) => {
				console.log(error)
				// dispatch({ type: "modal", showAlertModal: { isShow: true, title: "Bmc Power Error", msg: "Bmc Power에 문제가 있습니다. 확인해주세요" } });
			});

	}, []);

	return (
		// todo : 클릭시 특정 페이지로 이동하도록 수정
		<>
			<CRow>
				<div className="d-flex flex-wrap mb-4 me-4" style={{ padding: 0 }}>
					<PieChart title="BMC by Power"
						bgColors={ColorUtils.CHART_COLORS.TWO_FACTOR} labels={labels} data={dashBoardData} />
				</div>
			</CRow >
		</>
	);
};

export default BmcPower;
