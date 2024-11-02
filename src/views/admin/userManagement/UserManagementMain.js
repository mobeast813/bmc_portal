import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCol, CRow, CCardTitle } from "@coreui/react";
import "react-datepicker/dist/react-datepicker.css";
import { useCookies } from "react-cookie";
import SelectBox from "../../../components/selectBox/SelectBox";
import ButtonOutLine from "../../../components/buttons/ButtonOutline";
import { SetSelectBoxOptions, SetSelectBoxPageOptions } from "../../../utils/Utilities";
import { useDispatch } from "react-redux";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import { deleteUser, getSearchedUserList, getUserList } from "../../../apis/user/AdminApi";
import UserManagementList from "./UserManagementList";
import InputTextTempate from "../../../components/text/InputTextTemplete";

const UserManagementMain = () => {
	const dispatch = useDispatch();

	// 조회 관련 변수
	const [selectedIds, setSelectedIds] = useState([]);
	const [list, setList] = useState();
	const [totalPage, setTotalPage] = useState();
	const [searchedUserName, setSearchedUserName] = useState("");

	// 패이지네이션
	const [selectBoxReload, setSelectBoxReload] = useState(false);

	//그리드 셀렉션 초기화
	const [resetCheckbox, setResetCheckbox] = useState(false);

	useEffect(() => {
		initList(1);
	}, []);

	const initList = (page) => {
		try {
			return getUserList({ page: page })
				.then((data) => {
					setList(data.users)
					setTotalPage(data.pages)
				}).catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	// 사용자 리스트 조회
	const getList = ({ isRefresh, page }) => {
		try {
			return getUserList({
				page: isRefresh ? 1 : page
			}).then((data) => {
				setList(data.users)
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

	// 사용자 리스트 검색 조회
	const getSearchedList = ({ isRefresh, page }) => {
		try {
			return getSearchedUserList({
				userName: searchedUserName,
				page: isRefresh ? 1 : page
			}).then((data) => {
				setList(data.users)
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

	//사용자 삭제 요청
	const onClickDelete = async () => {
		if (selectedIds.length > 0) {
			dispatch({
				type: "modal",
				showConfirmModal: {
					isShow: true,
					title: "사용자 삭제 확인",
					msg: `${selectedIds.length}명의 사용자를 삭제하시겠습니까?`,
					onConfirm: () => {
						deleteUser({ userId: selectedIds }).then((response) => {
							if (response) {
								dispatch({ type: "modal", showAlertModal: { isShow: true, title: "삭제 완료", msg: "사용자를 삭제하였습니다." } });
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
					title: "사용자 삭제 확인",
					msg: "삭제할 사용자를 선택해 주세요"
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
							<CCardTitle style={{ fontWeight: "bold" }}>사용자 관리</CCardTitle>
						</div>
						<CRow className="justify-content-end mb-4" xs={{ cols: 'auto' }}>
							<InputTextTempate title="Searched User Name"
								setOnChange={setSearchedUserName}
								placeholder="성명" />
							<CCol>
								<ButtonPrimary
									text="검색"
									onClick={async () => {
										if (searchedUserName.length > 0) {
											getSearchedList({ isRefresh: false, page: 1 })
										} else {
											getList({ isRefresh: false, page: 1 });
										}
									}} />
							</CCol>
						</CRow>
						<CRow>
							<CCol className="d-flex justify-content-between">
								<div className="d-flex">
									<ButtonOutLine text="삭제" onClick={onClickDelete} />
								</div>
								<div className="d-flex">
									<SelectBox
										options={SetSelectBoxPageOptions(totalPage)}
										reload={selectBoxReload}
										callBack={(pageValue) => {
											if (searchedUserName.length > 0) {
												getSearchedList({ isRefresh: false, page: pageValue })
											} else {
												getList({ isRefresh: false, page: pageValue });
											}
										}} />
								</div>
							</CCol>
						</CRow>
					</CCardBody>
					<UserManagementList
						list={list}
						selectId={selectId}
						unselectId={unselectId}
						selectAll={selectAll}
						unselectAll={unselectAll}
						resetCheckbox={resetCheckbox}
					/>
				</CCard>
			</CRow>
		</>
	);
};

export default UserManagementMain;
