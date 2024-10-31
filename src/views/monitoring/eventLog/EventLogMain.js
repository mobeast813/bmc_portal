import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCol, CRow, CCardTitle, CCardText } from "@coreui/react";
import "react-datepicker/dist/react-datepicker.css";
import { useCookies } from "react-cookie";
import { FormatDate, SetSelectBoxOptions, SetSelectBoxPageOptions } from "../../../utils/Utilities";
import SelectBox from "../../../components/selectBox/SelectBox";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import { getMonitorSensorEventLog, getSearchedMonitorSensorEventLog } from "../../../apis/monitoring/Monitoring";
import EventLogList from "./EventLogList";
import CIcon from "@coreui/icons-react";
import { cilCalendar } from "@coreui/icons";
import DatePicker from "react-datepicker";

const EventLogMain = () => {
	const [cookies] = useCookies(["userId"]);
	var userId = `${cookies.userId}`

	// 조회 관련 변수
	// const [selectedIds, setSelectedIds] = useState([]);
	const [list, setList] = useState();
	const [totalPage, setTotalPage] = useState();

	// 페이지네이션
	const [selectBoxReload, setSelectBoxReload] = useState(false);

	// selectBox Options
	const [startDate, setStartDate] = useState(new Date("2023-01-01 00:00:00"));
	const [endDate, setEndDate] = useState(new Date("2024-12-30 23:59:59"));
	const [vendorSelectBoxOption, setVendorSelectBoxOption] = useState([]);
	const [boaGroupSelectBoxOption, setBoaGroupSelectBoxOption] = useState([]);
	const [sensorTypeSelectBoxOption, setSensorTypeSelectBoxOption] = useState([]);
	const [selectedVendor, setSelectedVendor] = useState(0);
	const [selectedBoaGroup, setSelectedBoaGroup] = useState(0);
	const [selectedSensorType, setSelectedSensorType] = useState(0);

	useEffect(() => {
		initList(1);
	}, []);

	const initList = (page) => {
		try {
			return getMonitorSensorEventLog({ userId: userId, page: page })
				.then((data) => {
					setVendorSelectBoxOption(data.vendor)
					setBoaGroupSelectBoxOption(data.boa_name)
					setSensorTypeSelectBoxOption(data.sensor_type)
					setList(data.sel)
					setTotalPage(data.pages)
				}).catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	//모니터링 BMC서버 리스트 조회
	const getList = ({ isRefresh, page }) => {
		try {
			return getMonitorSensorEventLog({
				userId: userId,
				page: isRefresh ? 1 : page
			}).then((data) => {
				setList(data.sel)
				if (isRefresh) {
					setSelectBoxReload(!selectBoxReload)
					setTotalPage(data.pages)
				}
			});
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	//모니터링 BMC서버 리스트 검색 조회
	const getSearchedList = ({ isRefresh, page }) => {
		try {
			return getSearchedMonitorSensorEventLog({
				userId: userId,
				vendor: selectedVendor,
				boaName: selectedBoaGroup,
				sensorType: selectedSensorType,
				startDate: FormatDate(startDate),
				endDate: FormatDate(endDate),
				page: isRefresh ? 1 : page
			}).then((data) => {
				setList(data.sel)
				if (isRefresh) {
					setSelectBoxReload(!selectBoxReload)
					setTotalPage(data.pages)
				}
			})
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	// 초기화
	const reloadData = async () => {
		try {
			getSearchedList({ isRefresh: true, page: 1 });
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};


	return (
		<>
			<CRow className="d-flex justify-content-center align-item-center">
				<CCard className="d-flex mb-3">
					<CCardBody>
						<div className="d-flex">
							<CCardTitle style={{ fontWeight: "bold" }}>Event Log</CCardTitle>
						</div>
						<CRow className="justify-content-end mb-4" xs={{ cols: 'auto' }}>

							<SelectBox
								options={SetSelectBoxOptions(vendorSelectBoxOption, "전체")}
								callBack={(value) => setSelectedVendor(value)} />
							<SelectBox
								options={SetSelectBoxOptions(boaGroupSelectBoxOption, "전체")}
								callBack={(value) => setSelectedBoaGroup(value)} />
							<SelectBox
								options={SetSelectBoxOptions(sensorTypeSelectBoxOption, "전체")}
								callBack={(value) => setSelectedSensorType(value)} />
							<div className="d-flex">
								<CCol className="d-flex align-items-center">
									<CIcon
										className="col-sm-1 me-1"
										icon={cilCalendar}
									></CIcon>
									<DatePicker
										dateFormat="yyyy.MM.dd"
										selected={startDate}
										onChange={(date) => setStartDate(date)}
										style={{ "font-size": "0.1rem" }}
									/>
								</CCol>
								<CCardText
									className="mx-1 text-center my-auto"
									style={{ margin: 0 }}
								>
									~
								</CCardText>

								<CCol className="d-flex me-3 align-items-center">
									<CIcon
										className="col-sm-1 me-1"
										icon={cilCalendar}
									></CIcon>
									<DatePicker
										dateFormat="yyyy.MM.dd"
										selected={endDate}
										onChange={(date) => setEndDate(date)}
										style={{ width: "150px" }}
									/>
								</CCol>
							</div>
							<CCol>
								<ButtonPrimary
									text="검색"
									onClick={async () => {
										if (selectedVendor === 0 && selectedBoaGroup === 0 && selectedBoaGroup === 0 && selectedSensorType === 0 && startDate === "" && endDate === "") {
											getList({ isRefresh: true, page: 1 });
										} else {
											getSearchedList({ isRefresh: true, page: 1 });
										}

									}} />
							</CCol>
						</CRow>
						<CRow>
							<CCol className="d-flex justify-content-end">
								<div className="d-flex">
									<SelectBox
										options={SetSelectBoxPageOptions(totalPage)}
										reload={selectBoxReload}
										callBack={(pageValue) => {
											// if ([selectedVendor, selectedBoaGroup, selectedBoaGroup, selectedSensorType].every((element) => element === 0)) {
											if (selectedVendor === 0 && selectedBoaGroup === 0 && selectedBoaGroup === 0 && selectedSensorType === 0 && startDate === "" && endDate === "") {
												getList({ isRefresh: false, page: pageValue });
											} else {
												getSearchedList({ isRefresh: false, page: pageValue })
											}
										}} />
								</div>
							</CCol>
						</CRow>
					</CCardBody>
					<EventLogList
						list={list}
						callback={reloadData}
					/>
				</CCard>
			</CRow>
		</>
	);
};

export default EventLogMain;
