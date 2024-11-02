import { CCol, CForm, CFormInput, CFormLabel, CModal, CModalBody, CModalHeader, CModalTitle, CRow } from "@coreui/react";
import { useEffect, useState } from "react";
import TitleContentTemplate from "../../components/text/TitleContentTemplate";
import { getBmcInventoryCatalogDetail } from "../../apis/maintenance/Maintenance";
import { useDispatch } from "react-redux";

const InventoryCatalogDetailModal = (props) => {
	const { bmcUUID, visible, setVisible } = props;
	const dispatch = useDispatch();
	const [data, setData] = useState();

	useEffect(() => {
		if (visible) {
			// todo : bmcUUID로 검색했을떄 정상적인 데이터가 나오지 않음 추후 교체
			// getBmcInventoryCatalogDetail({ bmcUUID: bmcUUID })
			getBmcInventoryCatalogDetail({ bmcUUID: "UUID_1" })
				.then(async (response) => {
					if (response.inventory_detail.length === 0) {
						setVisible(false)
						dispatch({ type: "modal", showAlertModal: { isShow: true, title: "⚠️ 알림", msg: "상세 데이터가 없습니다." } });
					} else {
						setData(response.inventory_detail[0])
					}
				}).catch((error) => {
					dispatch({ type: "modal", showAlertModal: { isShow: true, title: "InventoryCatalogDetail Error", msg: "InventoryCatalogDetail에 문제가 있습니다. 확인해주세요" } });
				});
		}
	}, [visible])

	return (
		data ?
			< CModal
				size="xl"
				alignment="center"
				visible={visible}
				onClose={() => { setVisible(false) }}
				labelledby="VerticallyCenteredExample">
				<CModalHeader>
					<CModalTitle id="VerticallyCenteredExample">BMC Inventory Catalog Detail</CModalTitle>
				</CModalHeader>
				<CModalBody className="text-center m-3">
					<CForm>
						<CRow className="mb-3">
							<TitleContentTemplate title="System ID" value={bmcUUID} />
							<TitleContentTemplate title="Serial Number" value={data.serial_num} />
						</CRow>
						<CRow className="mb-3">
							<TitleContentTemplate title="Firmware Version" value={data.firmware_version} />
							<TitleContentTemplate title="Model" value={data.model} />
						</CRow>
						<CRow className="mb-3">
							<TitleContentTemplate title="BIOS Version" value={data.bios_version} />
							<TitleContentTemplate title="BMC MAC Address" value={data.mac_address} />
						</CRow>
						<CRow className="mb-3">
							<TitleContentTemplate title="BIOS Build Time" value={data.bios_build_time} />
							<TitleContentTemplate title="Power State" value={data.power_status} />
						</CRow>
					</CForm>
				</CModalBody>

			</CModal > : <></>
	)
}


export default InventoryCatalogDetailModal;