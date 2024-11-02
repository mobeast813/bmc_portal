import { CCol, CForm, CFormLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputTitleTemplate from "../../../components/text/InputTitleTemplate";
import { registerBmcServer } from "../../../apis/bmcDevice/BmcDeviceApi";
import { Cookies, useCookies } from "react-cookie";
import SelectBox from "../../../components/selectBox/SelectBox";
import { SetSelectBoxOptions, SetSelectBoxPageOptions } from "../../../utils/Utilities";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import ButtonSecondary from "../../../components/buttons/ButtonSecondary";
import { getSearchedBmcListByUserId, getSearchedUnjoinedBmcList, getSearchedUserList, getUnjoinedBmcList, updateUserBmcAuth } from "../../../apis/user/AdminApi";
import EditUserRoleModalBmcList from "./EditUserRoleModalBmcList";
import TitleContentTemplate from "../../../components/text/TitleContentTemplate";

const EditUserRoleModal
	= (props) => {
		const { visible, setVisible, vendorOptions, boaGroupOptions, userId, callBack } = props;
		const dispatch = useDispatch();
		const userInfo = useSelector((state) => state.selectedUserInfo);
		const [cookies, setCookie] = useCookies(["roleName"]);

		const [selectedIds, setSelectedIds] = useState([]);
		const [list, setList] = useState();

		// selectBox Options
		const [authRoleSelectedBoxOption, setAuthRoleSelectedBoxOption] = useState(["Admin", "User"]);
		const [vendorSelectBoxOption, setVendorSelectBoxOption] = useState(vendorOptions);
		const [boaGroupSelectBoxOption, setBoaGroupSelectBoxOption] = useState(boaGroupOptions);
		const [selectedAuthRole, setSelectedAuthRole] = useState(0);
		const [selectedVendor, setSelectedVendor] = useState(0);
		const [selectedBoaGroup, setSelectedBoaGroup] = useState(0);



		useEffect(() => {
			const roleName = cookies.roleName;
			console.log(roleName)
			setSelectedAuthRole(roleName);
			initList();
		}, []);

		const initList = () => {
			try {
				return getUnjoinedBmcList({ userId: userId })
					.then((data) => {
						// setVendorSelectBoxOption(data.vendor)
						// setBoaGroupSelectBoxOption(data.boa_name)
						setList(data.unjoin_bmc)
						console.log(data.unjoin_bmc)
					}).catch((error) => {
						console.log(error);
					});
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		}

		//UnJoin BMC서버 리스트 검색 조회
		const getSearchedList = () => {
			console.log("getSearchedList", selectedVendor, selectedBoaGroup, userId)
			try {
				return getSearchedUnjoinedBmcList({
					userId: userId,
					vendor: selectedVendor,
					boa: selectedBoaGroup,
				}).then((data) => {
					console.log(data.unjoin_bmc)
					setList(data.unjoin_bmc)
				});
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};



		const updateRequest = () => {
			const isVaild = selectedIds.length > 0 && selectedAuthRole !== "0" && userId
			console.log(selectedIds, userId, selectedAuthRole, isVaild)
			if (isVaild) {
				updateUserBmcAuth({
					userId: userId,
					bmcUUIDList: selectedIds,
					authorization: selectedAuthRole
				}).then(async (response) => {

					if (response) {
						dispatch({ type: "modal", showAlertModal: { isShow: true, title: "권한설정 완료", msg: "BMC서버권한 설정을 완료하였습니다." } });
						callBack()
					} else {
						dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 알림", msg: "BMC서버권한 설정에 실패하였습니다." } });
					}
					setVisible(false)
				}).catch((error) => {
					dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 에러", msg: "BMC서버권한 설정에 문제가 있습니다." } });
				});
			} else {
				dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 알림", msg: "항목을 모두 작성해 주세요" } });
			}
		}

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

		const clearAndClose = () => {
			// setBmcName("");
			// setBmcIP("");
			// setBmcUser("");
			// setBmcPassword("");
			setVisible(false);
		}

		return (

			< CModal
				size="xl"
				alignment="center"
				visible={visible}
				onClose={() => { clearAndClose() }}
				labelledby="VerticallyCenteredExample">
				<CModalHeader>
					<CModalTitle id="VerticallyCenteredExample">사용자 권한 설정</CModalTitle>
				</CModalHeader>
				<CModalBody className="text-center m-3">
					<CForm>


						<CRow className="mb-4 justify-content-between" xs={{ cols: 'auto' }}>
							<CCol className="d-flex col-8">
								<TitleContentTemplate title="성명" value={userInfo.name} col={2} />
								<TitleContentTemplate title="이메일" value={userInfo.email} col={2} />
							</CCol>
							<CCol className="d-flex col-2">
								<SelectBox
									options={SetSelectBoxOptions(authRoleSelectedBoxOption, "권한설정")}
									callBack={(value) => setSelectedAuthRole(value)}
									initValue={"User"}
								/>
							</CCol>
						</CRow>


						<CRow className="d-flex align-item-center justify-content-end mb-4" xs={{ cols: 'auto' }}>

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
											getSearchedList()
										}} />
								</CCol>
							</CRow>
						</CRow>
					</CForm>
					<EditUserRoleModalBmcList
						list={list}
						selectId={selectId}
						unselectId={unselectId}
						selectAll={selectAll}
						unselectAll={unselectAll}
					// resetCheckbox={resetCheckbox}
					/>
				</CModalBody>
				<CModalFooter>
					<div className="d-flex col-6 mx-auto">
						<CCol className="me-2 col-6">
							<ButtonPrimary text="수정" onClick={() => { updateRequest() }} />
						</CCol>
						<CCol className="me-2 col-6">
							<ButtonSecondary text="취소" onClick={() => { clearAndClose() }} />
						</CCol>
					</div>
				</CModalFooter>
			</CModal >
		)
	}


export default EditUserRoleModal