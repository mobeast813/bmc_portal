import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCol, CRow, CCardTitle } from "@coreui/react";
import "react-datepicker/dist/react-datepicker.css";
import { useCookies } from "react-cookie";
import { SetSelectBoxOptions, SetSelectBoxPageOptions } from "../../utils/Utilities";
import SelectBox from "../../components/selectBox/SelectBox";
import ButtonPrimary from "../../components/buttons/ButtonPrimary";
import { getBmcInventoryCatalogList, getSearchedBmcInventoryCatalogList } from "../../apis/maintenance/Maintenance";
import InventoryCatalogList from "./InventoryCatalogList";

const InventoryCatalogMain = () => {
	const [cookies] = useCookies(["userId"]);
	var userId = `${cookies.userId}`


	// 조회 관련 변수
	// const [selectedIds, setSelectedIds] = useState([]);
	const [list, setList] = useState();
	const [totalPage, setTotalPage] = useState();

	// 페이지네이션
	const [selectBoxReload, setSelectBoxReload] = useState(false);

	// selectBox Options
	const [vendorSelectBoxOption, setVendorSelectBoxOption] = useState([]);
	const [boaGroupSelectBoxOption, setBoaGroupSelectBoxOption] = useState([]);
	const [selectedVendor, setSelectedVendor] = useState(0);
	const [selectedBoaGroup, setSelectedBoaGroup] = useState(0);

	useEffect(() => {
		initList(1);
	}, []);

	const initList = (page) => {
		try {
			return getBmcInventoryCatalogList({ userId: userId, page: page })
				.then((data) => {
					setVendorSelectBoxOption(data.vendor)
					setBoaGroupSelectBoxOption(data.boa_name)
					setList(data.inventory)
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
			return getBmcInventoryCatalogList({
				userId: userId,
				page: isRefresh ? 1 : page
			}).then((data) => {
				setList(data.inventory)
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
			return getSearchedBmcInventoryCatalogList({
				userId: userId,
				vendor: selectedVendor,
				boa: selectedBoaGroup,
				page: isRefresh ? 1 : page
			}).then((data) => {
				setList(data.inventory)
				if (isRefresh) {
					setSelectBoxReload(!selectBoxReload)
					setTotalPage(data.pages)
				}
			});
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
							<CCardTitle style={{ fontWeight: "bold" }}>BMC Inventory Catalog</CCardTitle>
						</div>
						<CRow className="justify-content-end mb-4" xs={{ cols: 'auto' }}>
							<SelectBox
								options={SetSelectBoxOptions(vendorSelectBoxOption, "전체")}
								callBack={(value) => setSelectedVendor(value)} />
							<SelectBox
								options={SetSelectBoxOptions(boaGroupSelectBoxOption, "전체")}
								callBack={(value) => setSelectedBoaGroup(value)} />
							<CCol>
								<ButtonPrimary
									text="검색"
									onClick={async () => {
										if (selectedVendor === "0" && selectedBoaGroup === "0") {
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
											// if ([selectedVendor, selectedBoaGroup, selectedBoaGroup, selectedPower].every((element) => element === 0)) {
											if (selectedVendor === "0" && selectedBoaGroup === "0") {
												getList({ isRefresh: false, page: pageValue });
											} else {
												getSearchedList({ isRefresh: false, page: pageValue })
											}
										}} />
								</div>
							</CCol>
						</CRow>
					</CCardBody>
					<InventoryCatalogList
						list={list}
						callback={reloadData}
					/>
				</CCard>
			</CRow>
		</>
	);
};

export default InventoryCatalogMain;
