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
import ButtonPrimary from "../../components/buttons/ButtonPrimary";
import AppIfameModal from "../../components/AppIframeModal";
import InventoryCatalogDetailModal from "./InventoryCatalogDetailModal";


const InventoryCatalogList = ({ list }) => {
	const [items, setItems] = useState();
	const [visible, setVisible] = useState(false);
	const [selectedItem, setSelectedItem] = useState({});
	const [consoleModalVisible, setConsoleModalVisible] = useState();

	const showDetailPopup = (bmcUUID) => {
		setSelectedItem({ bmcUUID: bmcUUID })
		setVisible(true);
	}

	const showConsolePopup = (bmcIp) => {
		setSelectedItem({ bmcIp: bmcIp })
		setConsoleModalVisible(true);
	}

	useEffect(() => {
		if (list) {
			const transformedData = list.map((item) => ({
				check: "",
				bmcUUID: item.bmc_UUID,
				bmcName: item.bmc_name,
				boaName: item.boa_name,
				vendor: item.vendor,
				cpuVendor: item.cpu_vendor,
				memoryStatus: item.memory_status,
				fanStatus: item.fan_status,
				firmwareVersion: item.firmware_version,
				psuStatus: item.psu_status,
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
		{ key: "cpu_vendor", label: "CPU", _props: { scope: "col" } },
		{ key: "memory_status", label: "Memory", _props: { scope: "col" } },
		{ key: "psu_status", label: "Power Supply", _props: { scope: "col" } },
		{ key: "fan_status", label: "FAN", _props: { scope: "col" } },
		{ key: "firmware_version", label: "Firmware", _props: { scope: "col" } },
		{ key: "console", label: "Console", _props: { scope: "col" } },
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
								<Link onClick={() => showDetailPopup(item.bmcUUID, item.bmcIp)}>
									{item.bmcUUID}
								</Link>
							</CTableDataCell>
							<CTableDataCell>{item.bmcName}</CTableDataCell>
							<CTableDataCell>{item.boaName}</CTableDataCell>
							<CTableDataCell>{item.vendor}</CTableDataCell>
							<CTableDataCell>{item.cpuVendor}</CTableDataCell>
							<CTableDataCell>{item.memoryStatus}</CTableDataCell>
							<CTableDataCell>{item.psuStatus}</CTableDataCell>
							<CTableDataCell>{item.fanStatus}</CTableDataCell>
							<CTableDataCell>{item.firmwareVersion}</CTableDataCell>
							<CTableDataCell>
								<div className="me-2 ms-2 mt-1 mb-1">
									<ButtonPrimary text="console" onClick={() => { showConsolePopup(item.bmcIp) }} />
								</div>
							</CTableDataCell>
						</CTableRow>
					))}
				</CTableBody>
			</CTable>
			<InventoryCatalogDetailModal
				visible={visible}
				setVisible={setVisible}
				bmcUUID={selectedItem.bmcUUID}
			/>
			<AppIfameModal
				url={`http://${selectedItem.bmcIp}`}
				visible={consoleModalVisible}
				setVisible={setConsoleModalVisible}
			/>
		</>
	);
};

export default InventoryCatalogList;
