import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCol, CRow, CCardTitle } from "@coreui/react";
import "react-datepicker/dist/react-datepicker.css";
import { deleteBmcServer, getBmcServerList, getSearchedBmcServerList } from "../../../apis/bmcDevice/BmcDeviceApi";
import { useCookies } from "react-cookie";
import SelectBox from "../../../components/selectBox/SelectBox";
import ButtonOutLine from "../../../components/buttons/ButtonOutline";
import { SetSelectBoxOptions, SetSelectBoxPageOptions } from "../../../utils/Utilities";
import BmcServerList from "./BmcServerList";
import { useDispatch } from "react-redux";
import AddBmcServerModal from "./AddBmcServerModal";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";

const BmcServerMain = () => {
	const [cookies] = useCookies(["userId"]);
	var userId = `${cookies.userId}`
	const dispatch = useDispatch();

	// 조회 관련 변수
	const [selectedIds, setSelectedIds] = useState([]);
	const [list, setList] = useState();
	const [totalPage, setTotalPage] = useState();

	// 페이지네이션
	const [selectBoxReload, setSelectBoxReload] = useState(false);

	// selectBox Options
	const [joinSelectBoxOption, setJoinSelectBoxOption] = useState(['join', 'unjoin']);
	const [vendorSelectBoxOption, setVendorSelectBoxOption] = useState([]);
	const [boaGroupSelectBoxOption, setBoaGroupSelectBoxOption] = useState([]);
	const [selectedJoin, setSelectedJoin] = useState(0);
	const [selectedVendor, setSelectedVendor] = useState(0);
	const [selectedBoaGroup, setSelectedBoaGroup] = useState(0);

	//그리스 셀렉션 초기화
	const [resetCheckbox, setResetCheckbox] = useState(false);

	//등록요청 팝업
	const [addBmcVisible, setAddBmcVisible] = useState(false);

	useEffect(() => {
		initList(1);
	}, []);

	const initList = (page) => {
		try {
			return getBmcServerList({ userId: userId, page: page })
				.then((data) => {
					setVendorSelectBoxOption(data.vendor)
					setBoaGroupSelectBoxOption(data.boa)
					setList(data.bmc)
					setTotalPage(data.pages)
				}).catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	//BMC서버 리스트 조회
	const getList = ({ isRefresh, page }) => {
		try {
			return getBmcServerList({
				userId: userId,
				page: isRefresh ? 1 : page
			}).then((data) => {
				setList(data.bmc)
				if (isRefresh) {
					setResetCheckbox(!resetCheckbox)
					setSelectBoxReload(!selectBoxReload)
					setTotalPage(data.pages)
				}
			});
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	//BMC서버 리스트 검색 조회
	const getSearchedList = ({ isRefresh, page }) => {
		try {
			return getSearchedBmcServerList({
				userId: userId,
				join: selectedJoin,
				vendor: selectedVendor,
				boaName: selectedBoaGroup,
				page: isRefresh ? 1 : page
			}).then((data) => {
				setList(data.bmc)
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
			setResetCheckbox(!resetCheckbox)
			getSearchedList({ isRefresh: true, page: 1 });
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};

	const selectId = (id) => {
		setSelectedIds([...selectedIds, id]);
	};

	const unselectId = (id) => {
		setSelectedIds(selectedIds.filter((number) => number !== id));
	};

	const selectAll = () => {
		const allIds = list.map((item) => item.number);
		setSelectedIds([...selectedIds, ...allIds]);
	};

	const unselectAll = () => {
		setSelectedIds([]);
	};

	//등록요청 클릭
	const onClickRegister = () => {
		setAddBmcVisible(true)
	};

	//Bmc 서버 삭제 요청
	const onClickDelete = async () => {
		if (selectedIds.length > 0) {
			dispatch({
				type: "modal",
				showConfirmModal: {
					isShow: true,
					title: "BMC서버 삭제 확인",
					msg: `${selectedIds.length}개의 BMC 서버를 삭제하시겠습니까?`,
					onConfirm: () => {
						deleteBmcServer({ bmcUUIDs: selectedIds }).then((response) => {
							if (response) {
								dispatch({ type: "modal", showAlertModal: { isShow: true, title: "삭제 완료", msg: "BMC서버 삭제를 완료하였습니다." } });
								reloadData()
							} else {
								dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 알림", msg: "삭제에 실패하였습니다." } });
							}
						})
					}
				}
			});
		} else {
			dispatch({
				type: "modal",
				showAlertModal: {
					isShow: true,
					title: "BMC서버 삭제 확인",
					msg: "삭제할 서버를 선택해 주세요"
				}
			});
		}
	};

	return (
		<>
			<CRow className="d-flex justify-content-center align-item-center">
				<CCard className="d-flex mb-3">
					<CCardBody>
						<div className="d-flex">
							<CCardTitle style={{ fontWeight: "bold" }}>BMC 서버 관리</CCardTitle>
							{/* {list && <CCardText>(총 {totalCount}건)</CCardText>} */}
						</div>
						<CRow className="justify-content-end mb-4" xs={{ cols: 'auto' }}>
							<SelectBox
								options={SetSelectBoxOptions(joinSelectBoxOption, "전체")}
								callBack={(value) => {
									setSelectedJoin(value)
								}} />
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
										if (selectedJoin === 0 && selectedVendor === 0 && selectedBoaGroup === 0) {
											getList({ isRefresh: true, page: 1 });
										} else {
											getSearchedList({ isRefresh: true, page: 1 });
										}

									}} />
							</CCol>
						</CRow>
						<CRow>
							<CCol className="d-flex justify-content-between">
								<div className="d-flex">
									<ButtonOutLine text="등록요청" onClick={onClickRegister} />
									<ButtonOutLine text="삭제" onClick={onClickDelete} />
								</div>
								<div className="d-flex">
									<SelectBox
										options={SetSelectBoxPageOptions(totalPage)}
										reload={selectBoxReload}
										callBack={(pageValue) => {
											if (selectedJoin === 0 && selectedVendor === 0 && selectedBoaGroup === 0) {
												getList({ isRefresh: false, page: pageValue });
											} else {
												getSearchedList({ isRefresh: false, page: pageValue })
											}
										}} />
								</div>
							</CCol>
						</CRow>
					</CCardBody>
					<BmcServerList
						list={list}
						selectId={selectId}
						unselectId={unselectId}
						selectAll={selectAll}
						unselectAll={unselectAll}
						resetCheckbox={resetCheckbox}
					/>
					<AddBmcServerModal
						visible={addBmcVisible}
						setVisible={setAddBmcVisible}
						vendorOptions={vendorSelectBoxOption}
						boaGroupOptions={boaGroupSelectBoxOption}
						callBack={reloadData}
					/>
				</CCard>
			</CRow>
		</>
	);
};

export default BmcServerMain;
