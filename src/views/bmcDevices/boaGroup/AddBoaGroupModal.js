import { CCol, CForm, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow } from "@coreui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputTitleTemplate from "../../../components/text/InputTitleTemplate";
import { registerBoaGroup } from "../../../apis/bmcDevice/BmcDeviceApi";
import { Cookies } from "react-cookie";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import ButtonSecondary from "../../../components/buttons/ButtonSecondary";

const AddBoaGroupModal
	= (props) => {
		const { visible, setVisible, vendorOptions, boaGroupOptions, callBack } = props;
		const dispatch = useDispatch();

		const [boaName, setBoaName] = useState();
		const [hostIp, setHostIp] = useState();
		const [hostPort, setHostPort] = useState();
		const [hostUser, setHostUser] = useState();
		const [hostPassword, setHostPassword] = useState(0);
		const [description, setDescription] = useState(0);

		const cookies = new Cookies()
		var userId = `${cookies.get("userId")}`

		const registerRequest = () => {
			const isVaild = [boaName, hostIp, hostPort, hostUser, hostPassword, description].every(item => item)
			if (isVaild) {
				registerBoaGroup({
					userId: userId,
					boaName: boaName,
					hostIp: hostIp,
					hostPort: hostPort,
					hostUser: hostUser,
					hostPassword, hostPassword,
					description: description,
				}).then(async (response) => {
					if (response) {
						dispatch({ type: "modal", showAlertModal: { isShow: true, title: "그룹 등록 완료", msg: "BOA그룹 등록을 완료하였습니다." } });
						callBack()
					} else {
						dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 알림", msg: "그룹 등록에 실패하였습니다." } });
					}
					setVisible(false)
				}).catch((error) => {
					dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 에러", msg: "BOA그룹 등록에 문제가 있습니다. 확인해주세요" } });
				});
			} else {
				dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 알림", msg: "항목을 모두 작성해 주세요" } });
			}
			// todo : 생성 테스트 해봐야함
		}

		const clearAndClose = () => {
			setBoaName("")
			setHostIp("")
			setHostPort("")
			setHostUser("")
			setHostPassword("")
			setDescription("")
			setVisible(false)
		}

		return (

			< CModal
				size="lg"
				alignment="center"
				visible={visible}
				onClose={() => { clearAndClose() }}
				labelledby="VerticallyCenteredExample">
				<CModalHeader>
					<CModalTitle id="VerticallyCenteredExample">BOA 그룹 등록</CModalTitle>
				</CModalHeader>
				<CModalBody className="text-center m-3">
					<CForm>
						<CRow className="mb-3">
							<InputTitleTemplate title="BOA Name" setOnChange={setBoaName} />
						</CRow>
						<CRow className="mb-3">
							<InputTitleTemplate title="BOA Host IP" setOnChange={setHostIp} />
						</CRow>
						<CRow className="mb-3">
							<InputTitleTemplate title="BOA Host Port" setOnChange={setHostPort} />
						</CRow>
						<CRow className="mb-3">
							<InputTitleTemplate title="BOA Host User" setOnChange={setHostUser} />
						</CRow>
						<CRow className="mb-3">
							<InputTitleTemplate title="BOA Host PW" setOnChange={setHostPassword} />
						</CRow>
						<CRow className="mb-3">
							<InputTitleTemplate title="Description" setOnChange={setDescription} />
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


export default AddBoaGroupModal
	;