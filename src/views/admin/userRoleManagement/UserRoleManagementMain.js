import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCol, CRow, CCardTitle, CFormLabel, CFormInput } from "@coreui/react";
import "react-datepicker/dist/react-datepicker.css";
import SelectBox from "../../../components/selectBox/SelectBox";
import ButtonOutLine from "../../../components/buttons/ButtonOutline";
import { SetSelectBoxOptions, SetSelectBoxPageOptions } from "../../../utils/Utilities";
import { useDispatch, useSelector } from "react-redux";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import UserRoleManagementList from "./UserRoleManagementList";
import { deleteBmcAuthByUserId, getBmcListByUserId, getSearchedBmcListByUserId } from "../../../apis/user/AdminApi";
import { useNavigate, useParams } from "react-router-dom";
import ButtonSecondary from "../../../components/buttons/ButtonSecondary";
import EditUserRoleModal from "./EditUserRoleModal";


const UserRoleManagementMain = () => {
	const { userId } = useParams();


	const dispatch = useDispatch();
	const navigate = useNavigate();

	// 조회 관련 변수
	const [selectedIds, setSelectedIds] = useState([]);
	const [list, setList] = useState();
	const [totalPage, setTotalPage] = useState();

	// 페이지네이션
	const [selectBoxReload, setSelectBoxReload] = useState(false);

	// selectBox Options
	const [vendorSelectBoxOption, setVendorSelectBoxOption] = useState([]);
	const [boaGroupSelectBoxOption, setBoaGroupSelectBoxOption] = useState([]);
	const [selectedVendor, setSelectedVendor] = useState(0);
	const [selectedBoaGroup, setSelectedBoaGroup] = useState(0);

	//그리스 셀렉션 초기화
	const [resetCheckbox, setResetCheckbox] = useState(false);

	//권한 수정 팝업
	const [roleModalVisible, setRoleModalVisible] = useState(false);

	useEffect(() => {
		initList(1);
	}, []);

	const initList = (page) => {
		try {
			return getBmcListByUserId({ userId: userId, page: page })
				.then((data) => {
					setVendorSelectBoxOption(data.vendor)
					setBoaGroupSelectBoxOption(data.boa_name)
					setList(data.user_auth)
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
			return getBmcListByUserId({
				userId: userId,
				page: isRefresh ? 1 : page
			}).then((data) => {
				setList(data.user_auth)
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
		console.log("getSearchedList")
		try {
			return getSearchedBmcListByUserId({
				userId: userId,
				vendor: selectedVendor,
				boa: selectedBoaGroup,
				page: isRefresh ? 1 : page
			}).then((data) => {
				setList(data.user_auth)
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

	const onClickEdit = () => {
		setRoleModalVisible(true)
	}
	//Bmc서버권한 삭제 요청
	const onClickDelete = async () => {
		if (selectedIds.length > 0) {
			dispatch({
				type: "modal",
				showConfirmModal: {
					isShow: true,
					title: "BMC서버권한 삭제 확인",
					msg: `${selectedIds.length}개의 BMC서버권한을 삭제하시겠습니까?`,
					onConfirm: () => {
						deleteBmcAuthByUserId({ userId: userId, bmcUUIDs: selectedIds }).then((response) => {
							if (response) {
								dispatch({ type: "modal", showAlertModal: { isShow: true, title: "삭제 완료", msg: "BMC서버권한을 삭제하였습니다." } });
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
					title: "BMC서버 권한삭제 확인",
					msg: "권한을 삭제할 서버를 선택해 주세요"
				}
			});
		}
	};

	return (
		<>
			<CRow className="d-flex justify-content-center align-item-center">
				<CCard className="d-flex mb-3">
					<CCardBody>
						<CRow className="align-item-center justify-content-start mb-4" xs={{ cols: 'auto' }}>
							<CCol><ButtonSecondary text="뒤로" onClick={() => navigate('/admin/manage-user')} /></CCol>
						</CRow>
						<div className="d-flex align-item-center mb-3">
							<CCardTitle style={{ fontWeight: "bold" }}>사용자 권한 관리</CCardTitle>
						</div>
						<hr
							style={{
								color: "white",
								height: 10,
								marginTop: 3,

							}}
						/>
						<CRow className="d-flex align-item-center justify-content-between mb-4" xs={{ cols: 'auto' }}>
							<CRow className="justify-content-end mb-4" xs={{ cols: 'auto' }}>
								<CCol className="d-flex">
									<CFormLabel className="col-form-label me-2 col-3">
										User ID
									</CFormLabel>
									<CFormInput type="text" id="User ID" value={userId} readOnly={true} />
								</CCol>
								<CCol>
									<ButtonPrimary text="권한수정" onClick={onClickEdit} />
								</CCol>

							</CRow>

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
											if (selectedVendor === 0 && selectedBoaGroup === 0) {
												getList({ isRefresh: true, page: 1 });
											} else {
												getSearchedList({ isRefresh: true, page: 1 });
											}

										}} />
								</CCol>
							</CRow>
						</CRow>
						<CRow className="">
							<CCol className="d-flex justify-content-between">
								<div className="d-flex">
									<ButtonOutLine text="삭제" onClick={onClickDelete} />
								</div>
								<div className="d-flex">
									<SelectBox
										options={SetSelectBoxPageOptions(totalPage)}
										reload={selectBoxReload}
										callBack={(pageValue) => {
											if (selectedVendor === 0 && selectedBoaGroup === 0) {
												getList({ isRefresh: false, page: pageValue });
											} else {
												getSearchedList({ isRefresh: false, page: pageValue })
											}
										}} />
								</div>
							</CCol>
						</CRow>
					</CCardBody>
					<UserRoleManagementList
						list={list}
						selectId={selectId}
						unselectId={unselectId}
						selectAll={selectAll}
						unselectAll={unselectAll}
						resetCheckbox={resetCheckbox}
					/>
					<EditUserRoleModal
						visible={roleModalVisible}
						setVisible={setRoleModalVisible}
						vendorOptions={vendorSelectBoxOption}
						boaGroupOptions={boaGroupSelectBoxOption}
						userId={userId}
						callBack={reloadData}
					/>
				</CCard>
			</CRow>
		</>
	);
};

export default UserRoleManagementMain;
