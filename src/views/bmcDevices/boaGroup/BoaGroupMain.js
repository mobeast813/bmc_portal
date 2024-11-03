import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CCol, CRow, CCardTitle } from "@coreui/react";
import "react-datepicker/dist/react-datepicker.css";
import { deleteBoaGroup, getBoaGroupList } from "../../../apis/bmcDevice/BmcDeviceApi";
import { useCookies } from "react-cookie";
import SelectBox from "../../../components/selectBox/SelectBox";
import ButtonOutLine from "../../../components/buttons/ButtonOutline";
import { SetSelectBoxPageOptions } from "../../../utils/Utilities";
import { useDispatch } from "react-redux";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import AddBoaGroupModal from "./AddBoaGroupModal";
import BoaGroupList from "./BoaGroupList";

const BoaGroupMain = () => {
	const [cookies] = useCookies(["userId"]);
	var userId = `${cookies.userId}`
	const dispatch = useDispatch();

	// 조회 관련 변수
	const [selectedIds, setSelectedIds] = useState([]);
	const [list, setList] = useState();
	const [totalPage, setTotalPage] = useState();

	// 페이지네이션
	const [selectBoxReload, setSelectBoxReload] = useState(false);

	//그리스 셀렉션 초기화
	const [resetCheckbox, setResetCheckbox] = useState(false);

	//등록요청 팝업
	const [addBoaVisible, setAddBoaVisible] = useState(false);

	useEffect(() => {
		getList({ isRefresh: true, page: 1 });
	}, []);

	const getList = ({ isRefresh, page }) => {

		try {
			return getBoaGroupList({ userId: userId, page: page })
				.then((data) => {
					setList(data.boa)
					if (isRefresh) {
						setTotalPage(data.pages)
						setSelectBoxReload(!selectBoxReload)
					}
				}).catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	}

	// 초기화
	const reloadData = async () => {
		try {
			setResetCheckbox(!resetCheckbox)
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
		setAddBoaVisible(true)
	};

	//BOA그룹 삭제 요청
	const onClickDelete = async () => {
		if (selectedIds.length > 0) {
			dispatch({
				type: "modal",
				showConfirmModal: {
					isShow: true,
					title: "BOA그룹 삭제 확인",
					msg: `${selectedIds.length}개의 BOA 그룹을 삭제하시겠습니까?`,
					onConfirm: () => {
						deleteBoaGroup({ boaIds: selectedIds }).then((response) => {
							if (response) {
								dispatch({ type: "modal", showAlertModal: { isShow: true, title: "삭제 완료", msg: "BOA그룹 삭제를 완료하였습니다." } });
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
					title: "BOA그룹 삭제 확인",
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
							<CCardTitle style={{ fontWeight: "bold" }}>BOA 그룹 관리</CCardTitle>
							{/* {list && <CCardText>(총 {totalCount}건)</CCardText>} */}
						</div>
						<CRow className="justify-content-end mb-4" xs={{ cols: 'auto' }}>
							<CCol>
								<ButtonPrimary
									text="검색"
									onClick={async () => {
										getList({ isRefresh: true, page: 1 });
									}} />
							</CCol>
						</CRow>
						<CRow>
							<CCol className="d-flex justify-content-between">
								<div className="d-flex">
									<ButtonOutLine text="등록" onClick={onClickRegister} />
									<ButtonOutLine text="삭제" onClick={onClickDelete} />
								</div>
								<div className="d-flex">
									<SelectBox
										options={SetSelectBoxPageOptions(totalPage)}
										reload={selectBoxReload}
										callBack={(pageValue) => {
											getList({ isRefresh: false, page: pageValue });
										}} />
								</div>
							</CCol>
						</CRow>
					</CCardBody>
					<BoaGroupList
						list={list}
						selectId={selectId}
						unselectId={unselectId}
						selectAll={selectAll}
						unselectAll={unselectAll}
						resetCheckbox={resetCheckbox}
					/>
					<AddBoaGroupModal
						visible={addBoaVisible}
						setVisible={setAddBoaVisible}
						callBack={reloadData}
					/>
				</CCard>
			</CRow>
		</>
	);
};

export default BoaGroupMain;
