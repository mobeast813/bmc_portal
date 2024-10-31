import { CCol, CForm, CFormLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputTitleTemplate from "../../../components/templates/InputTitleTemplate";
import { registerBmcServer } from "../../../apis/bmcDevice/BmcDeviceApi";
import { Cookies } from "react-cookie";
import SelectBox from "../../../components/selectBox/SelectBox";
import { SetSelectBoxOptions } from "../../../utils/Utilities";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import ButtonSecondary from "../../../components/buttons/ButtonSecondary";

const AddBmcServerModal
	= (props) => {
		const { visible, setVisible, vendorOptions, boaGroupOptions, callBack } = props;
		const dispatch = useDispatch();

		const [bmcName, setBmcName] = useState();
		const [bmcIP, setBmcIP] = useState();
		const [bmcUser, setBmcUser] = useState();
		const [bmcPassword, setBmcPassword] = useState();
		const [selectedVendor, setSelectedVendor] = useState(0);
		const [selectedBoaGroup, setSelectedBoaGroup] = useState(0);

		const cookies = new Cookies()
		var userId = `${cookies.get("userId")}`

		const registerRequest = () => {
			const isVaild = [bmcName, bmcIP, bmcUser, bmcPassword, selectedVendor, selectedBoaGroup].every(item => item)
			if (isVaild) {
				registerBmcServer({
					userId: userId,
					bmcName: bmcName,
					bmcIP: bmcIP,
					bmcUser: bmcUser,
					bmcPassword, bmcPassword,
					vendor: selectedVendor,
					boaGroup: selectedBoaGroup
				}).then(async (response) => {

					if (response) {
						dispatch({ type: "modal", showAlertModal: { isShow: true, title: "서버 등록 완료", msg: "BMC서버 등록을 완료하였습니다." } });
						callBack()
					} else {
						dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 알림", msg: "서버 등록에 실패하였습니다." } });
					}
					setVisible(false)
				}).catch((error) => {
					dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 에러", msg: "BMC서버등록에 문제가 있습니다. 확인해주세요" } });
				});
			} else {
				dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 알림", msg: "항목을 모두 작성해 주세요" } });
			}
			// todo : 생성 테스트 해봐야함
		}

		const clearAndClose = () => {
			setBmcName("");
			setBmcIP("");
			setBmcUser("");
			setBmcPassword("");
			setVisible(false);
		}

		return (

			< CModal
				size="lg"
				alignment="center"
				visible={visible}
				onClose={() => { clearAndClose() }}
				labelledby="VerticallyCenteredExample">
				<CModalHeader>
					<CModalTitle id="VerticallyCenteredExample">BMC 서버 등록 요청</CModalTitle>
				</CModalHeader>
				<CModalBody className="text-center m-3">
					<CForm>
						<CRow className="mb-3">
							<InputTitleTemplate title="BMC Name" setOnChange={setBmcName} />
						</CRow>
						<CRow className="mb-3">
							<InputTitleTemplate title="BMC IP" setOnChange={setBmcIP} />
						</CRow>
						<CRow className="mb-3">
							<InputTitleTemplate title="BMC User" setOnChange={setBmcUser} />
						</CRow>
						<CRow className="mb-3">
							<InputTitleTemplate title="BMC Password" setOnChange={setBmcPassword} />
						</CRow>

						<CRow className="mb-3">
							<CCol sm={6} className="d-flex align-items-center">
								<CFormLabel className="col-form-label col-6 me-2">
									Vendor
								</CFormLabel>
								<SelectBox
									options={SetSelectBoxOptions(vendorOptions, "선택")}
									callBack={(value) => setSelectedVendor(value)} />
							</CCol>
							<CCol sm={6} className="d-flex align-items-center">
								<CFormLabel className="col-form-label col-6 me-2">
									BOA Group
								</CFormLabel>
								<SelectBox
									options={SetSelectBoxOptions(boaGroupOptions, "선택")}
									callBack={(value) => setSelectedBoaGroup(value)} />
							</CCol>
						</CRow>
					</CForm>
				</CModalBody>
				<CModalFooter>
					<div className="d-flex col-6 mx-auto">
						<CCol className="me-2 col-6">
							<ButtonPrimary text="등록 요청" onClick={() => { registerRequest() }} />
						</CCol>
						<CCol className="me-2 col-6">
							<ButtonSecondary text="취소" onClick={() => { clearAndClose() }} />
						</CCol>
					</div>
				</CModalFooter>
			</CModal >
		)
	}


export default AddBmcServerModal
	;