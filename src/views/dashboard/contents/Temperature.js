import React, { useState, useEffect } from "react";
import { CRow } from "@coreui/react";
import { getDashboardTemperature } from "../../../apis/dashboard/DashBoardApi";
import { useDispatch } from "react-redux";
import ColorUtils from "../../../utils/ColorUtils";
import BarChart from "../../../components/charts/BarChart";

const Temperature = (props) => {
	const { userId } = props
	const dispatch = useDispatch();
	const [dashBoardData, setDashBoardData] = useState([]);

	useEffect(() => {
		getDashboardTemperature({ userId: userId })
			.then(async (response) => {
				setDashBoardData(response.dash_temp[0]);
			}).catch((error) => {
				console.log(error)
				//dispatch({ type: "modal", showAlertModal: { isShow: true, title: "Status Temperature Error", msg: "Status Temperature에 문제가 있습니다. 확인해주세요" } });
			});

	}, []);

	return (
		// todo : 클릭시 특정 페이지로 이동하도록 수정
		<>
			<CRow>
				<div className="d-flex flex-wrap mb-4 me-4" style={{ padding: 0 }}>
					<BarChart title="Status - Temperature"
						bgColors={ColorUtils.CHART_COLORS.STATUS} labels={["CPU", "MEMORY"]} data={dashBoardData} />
				</div>
			</CRow >
		</>
	);
};

export default Temperature;
