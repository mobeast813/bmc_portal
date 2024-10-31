import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
} from "@coreui/react";
import ButtonPrimary from "../../../components/buttons/ButtonPrimary";
import InventoryCatalogDetailModal from "../../maintenance/InventoryCatalogDetailModal";
import PowerAndFanContorlModal from "../../maintenance/PowerAndFanContorlModal";
import AppIfameModal from "../../../components/AppIframeModal";

const EventLogList = ({ list, callback }) => {
	const [items, setItems] = useState();
	const [visible, setVisible] = useState(false);
	const [selectedItem, setSelectedItem] = useState({});
	const [selectedControlMenu, setSelectedControlMenu] = useState();
	const [contorlModalVisible, setContorlModalVisible] = useState();
	const [consoleModalVisible, setConsoleModalVisible] = useState();


	const showDetailPopup = (bmcUUID) => {
		setSelectedItem({ bmcUUID: bmcUUID })
		setVisible(true);
	}

	const showControlPopup = (selectedMenu, bmcUUID, bmcIp, powerValue, fanValue) => {
		setSelectedItem({ bmcUUID: bmcUUID, bmcIp: bmcIp, powerValue: powerValue, fanValue: fanValue })
		setSelectedControlMenu(selectedMenu)
		setContorlModalVisible(true)
	}

	const showConsolePopup = (bmcIp) => {
		setSelectedItem({ bmcIp: bmcIp })
		setConsoleModalVisible(true);
	}

	const dataRefresh = async () => {
		console.log("dataRefresh")
		callback()
	}

	useEffect(() => {
		if (list) {
			const transformedData = list.map((item) => ({
				check: "",
				bmcUUID: item.bmc_UUID,
				bmcName: item.bmc_name,
				boaName: item.boa_name,
				vendor: item.vendor,
				bmcIp: item.bmc_ip,
				logId: item.log_id,
				logDate: item.log_date,
				sensorType: item.sensor_type,
				sensorNum: item.sensor_num,
				description: item.description,
				_cellProps: { class: { scope: "row" } },
			}));
			setItems(transformedData);
		}
	}, [list]);



	const columns = [
		{ key: "bmc_UUID", label: "서버ID", _props: { scope: "col" } },
		{ key: "bmc_name", label: "서버명", _props: { scope: "col" } },
		{ key: "boa_name", label: "그룹", _props: { scope: "col" } },
		{ key: "vendor", label: "벤더", _props: { scope: "col" } },
		{ key: "bmc_ip", label: "IP", _props: { scope: "col" } },
		{ key: "log_id", label: "Log ID", _props: { scope: "col" } },
		{ key: "log_date", label: "Date Time", _props: { scope: "col" } },
		{ key: "sensor_type", label: "Sensor type", _props: { scope: "col" } },
		{ key: "sensor_num", label: "Sensor Num", _props: { scope: "col" } },
		{ key: "description", label: "Description", _props: { scope: "col" } }
	];

	return (
		<>
			<CTable align="middle" responsive bordered={true} hover={true}>
				<CTableHead align="middle" color="primary">
					<CTableRow>
						{columns?.map((column, key) => (
							<CTableHeaderCell key={key}>
								&nbsp; {column.label}
							</CTableHeaderCell>
						))}
					</CTableRow>
				</CTableHead>

				<CTableBody align="middle">
					{items?.map((item, key) => (
						<CTableRow key={key}>
							<CTableDataCell>
								<Link onClick={() => showDetailPopup(item.bmcUUID)}>
									{item.bmcUUID}
								</Link>
							</CTableDataCell>
							<CTableDataCell>{item.vendor}</CTableDataCell>
							<CTableDataCell>{item.bmcName}</CTableDataCell>
							<CTableDataCell>{item.boaName}</CTableDataCell>
							<CTableDataCell>{item.bmcIp}</CTableDataCell>
							<CTableDataCell>{item.logId}</CTableDataCell>
							<CTableDataCell>{item.logDate}</CTableDataCell>
							<CTableDataCell>{item.sensorType}</CTableDataCell>
							<CTableDataCell>{item.sensorNum}</CTableDataCell>
							<CTableDataCell>{item.description}</CTableDataCell>
						</CTableRow>
					))}
				</CTableBody>
			</CTable>
			<InventoryCatalogDetailModal
				visible={visible}
				setVisible={setVisible}
				bmcUUID={selectedItem.bmcUUID}
			/>
			<PowerAndFanContorlModal
				bmcUUID={selectedItem.bmcUUID}
				bmcIp={selectedItem.bmcIp}
				powerValue={selectedItem.powerValue}
				fanValue={selectedItem.fanValue}
				visible={contorlModalVisible}
				setVisible={setContorlModalVisible}
				initTab={selectedControlMenu}
				callBack={dataRefresh}
			/>
			<AppIfameModal
				url={`http://${selectedItem.bmcIp}`}
				visible={consoleModalVisible}
				setVisible={setConsoleModalVisible}
			/>
		</>
	);
};

export default EventLogList;
