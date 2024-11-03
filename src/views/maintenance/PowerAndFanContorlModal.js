import { CCardText, CCardTitle, CCol, CForm, CFormCheck, CFormLabel, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CTab, CTabContent, CTabList, CTabPanel, CTabs } from "@coreui/react";
import ButtonPrimary from "../../components/buttons/ButtonPrimary";
import { useEffect, useState } from "react";
import { getFanCurrentStatus, getPowerCurrentStatus, updateFanControlSet, updatePowerControlSet } from "../../apis/maintenance/Maintenance";
import { useDispatch } from "react-redux";
import ButtonSecondary from "../../components/buttons/ButtonSecondary";

const PowerAndFanContorlModal = (props) => {
	const { bmcUUID, bmcIp, visible, setVisible, initTab, callBack } = props;

	const dispatch = useDispatch();
	const [selectedItem, setSelectedItem] = useState("0");
	const [selectedTab, setSelectedTab] = useState("power");
	const [currentPowerStatus, setCurrentPowerStatus] = useState();
	const [currentFanStatus, setCurrentFanStatus] = useState();



	const clearAndClose = () => {
		setSelectedItem(0)
		setVisible(false);
	}

	useEffect(() => {
		onSelectTap(initTab)
		console.log("useEffect initTab", selectedTab, initTab)
	}, [visible])

	useEffect(() => {
		if (bmcUUID) {
			if (selectedTab === "power") {
				getPowerCurrentStatus({ bmcUUID: bmcUUID })
					.then((result) => {
						setCurrentPowerStatus(result.power_status);
					}).catch((error) => {
						console.log(error)
						dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 에러", msg: "현재 상태를 가져오지 못했습니다.\n다시 시도해보세요" } });
					});
			} else {
				getFanCurrentStatus({ bmcUUID: bmcUUID })
					.then((result) => {
						setCurrentFanStatus(result.fan_status);
					}).catch((error) => {
						console.log(error)
						dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 에러", msg: "현재 상태를 가져오지 못했습니다.\n다시 시도해보세요" } });
					});
			}
		}
	}, [selectedTab])

	const onSelectTap = (tab) => {
		setSelectedTab(tab)
		setSelectedItem("0")
	}

	const powerControlRadioButtonList = [
		{ id: "0", label: "Reset Server" },
		{ id: "1", label: "Power Off Server - Immediate" },
		{ id: "2", label: "Power Off Server – Orderly Shutdown" },
		{ id: "3", label: "Power On Server" },
		{ id: "4", label: "Power Cycle Server" }
	]

	const fanControlRadioButtonList = [
		{ id: "0", label: "Set Fan to Standard Speed" },
		{ id: "1", label: "Set Fan to Full Speed" },
		{ id: "2", label: "Set Fan to Optimal Speed" },
		{ id: "3", label: "Set Fan to HeavyIO Speed" }
	]



	const onClickApply = () => {
		if (selectedItem) {
			if (selectedTab === "power") {
				//Power Control
				updatePowerControlSet({ powerOption: selectedItem, bmcUUID: bmcUUID })
					.then((result) => {
						if (result) {
							dispatch({ type: "modal", showAlertModal: { isShow: true, title: "전원설정 완료", msg: "전원설정을 완료하였습니다." } });
							callBack()
						} else {
							dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 알림", msg: "전원설정에 실패하였습니다." } });
						}
						clearAndClose()
					}).catch((error) => {
						console.log(error)
						dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 에러", msg: "전원설정에 문제가 있습니다.\n다시 시도해보세요" } });
					});
			} else {
				//Fan Control
				updateFanControlSet({ fanOption: selectedItem, bmcUUID: bmcUUID })
					.then((result) => {
						if (result) {
							dispatch({ type: "modal", showAlertModal: { isShow: true, title: "FAN설정 완료", msg: "FAN설정을 완료하였습니다." } });
							callBack()
						} else {
							dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 알림", msg: "FAN설정에 실패하였습니다." } });
						}
						clearAndClose()
					}).catch((error) => {
						console.log(error)
						dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 에러", msg: "FAN설정에 문제가 있습니다.\n다시 시도해보세요" } });
					});
			}
		} else {
			dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 알림", msg: "설정 항목을 선택해주세요" } });
		}
	}
	return (
		< CModal
			size="lg"
			alignment="center"
			visible={visible}
			onClose={() => { clearAndClose() }}
			labelledby="VerticallyCenteredExample">
			<CModalHeader>
				<CModalTitle id="VerticallyCenteredExample">Maintenance 관리</CModalTitle>
			</CModalHeader>
			<CModalBody className="text-center m-0">
				<CTabs activeItemKey={selectedTab ? selectedTab : "power"} onChange={(e) => {
					console.log(e)
					onSelectTap(e)
				}}>
					<CTabList variant="tabs">
						<CTab itemKey="power">Power Control</CTab>
						<CTab itemKey="fan">FAN Control</CTab>
					</CTabList>
					<CTabContent>
						<CTabPanel className="p-3" itemKey="power">
							<CCardTitle className="text-start mb-3 mt-4 fw-bolder fst-italic">Power Control</CCardTitle>
							<hr style={{ color: "white", height: 0.1 }} />
							<CCardTitle className="text-start ps-3 pb-5 pt-4 text-success">Host is currently {currentPowerStatus}</CCardTitle>
							<CRow className="m-1 mb-5">
								{
									powerControlRadioButtonList.map((item, index) => (
										<CFormCheck key={index} type="radio" className="text-start mb-3"
											name="powerControl"
											id={`powerControl${item.id}`}
											label={item.label}
											checked={item.id === selectedItem}
											onChange={(e) => setSelectedItem(e.target.id.split('powerControl')[1])}
										/>
									))
								}
							</CRow>
						</CTabPanel>
						<CTabPanel className="p-3" itemKey="fan">
							<CCardTitle className="text-start mb-3 mt-4 fw-bolder fst-italic">FAN Control</CCardTitle>
							<hr style={{ color: "white", height: 0.1 }} />
							<CCardTitle className="text-start ps-3 pb-5 pt-4 text-success">Current FAN Mode is {currentFanStatus}</CCardTitle>
							<CRow className="m-1 mb-5">
								{
									fanControlRadioButtonList.map((item, index) => (
										<CFormCheck key={index} type="radio" className="text-start mb-3"
											name="fanControl"
											id={`fanControl${item.id}`}
											label={item.label}
											checked={item.id === selectedItem}
											onChange={(e) => setSelectedItem(e.target.id.split('fanControl')[1])}
										/>
									))
								}
							</CRow>
						</CTabPanel>

					</CTabContent>
				</CTabs>
			</CModalBody>
			<CModalFooter>
				<div className="d-flex col-6 mx-auto">
					<CCol className="me-2 col-6">
						<ButtonPrimary text="적용" onClick={() => onClickApply()} />
					</CCol>
					<CCol className="me-2 col-6">
						<ButtonSecondary text="취소" onClick={() => { clearAndClose() }} />
					</CCol>
				</div>
			</CModalFooter>
		</CModal >
	)


}

export default PowerAndFanContorlModal;