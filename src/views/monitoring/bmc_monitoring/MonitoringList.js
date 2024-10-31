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

const MonitoringList = ({ list, callback }) => {
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
				vendor: item.vendor,
				boaName: item.boa_name,
				bmcIp: item.bmc_ip,
				version: item.version,
				power: item.power,
				cpuTemp: item.cpu_temp,
				memTemp: item.mem_temp,
				psu: item.psu,
				volt: item.volt,
				fan: item.fan,
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
		{ key: "version", label: "버전", _props: { scope: "col" } },
		{ key: "power", label: "전원", _props: { scope: "col" } },
		{ key: "cpu_temp", label: "CPU 온도", _props: { scope: "col" } },
		{ key: "mem_temp", label: "MEM 온도", _props: { scope: "col" } },
		{ key: "psu", label: "PSU", _props: { scope: "col" } },
		{ key: "volt", label: "Voltage", _props: { scope: "col" } },
		{ key: "fan", label: "FAN", _props: { scope: "col" } },
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
							<CTableDataCell>{item.bmcIp}</CTableDataCell>
							<CTableDataCell>{item.version}</CTableDataCell>
							<CTableDataCell>
								<Link onClick={() => {
									showControlPopup("power", item.bmcUUID, item.bmcIp, item.power, item.fan)
								}}>
									{item.power}
								</Link>
							</CTableDataCell>
							<CTableDataCell>{item.cpuTemp}</CTableDataCell>
							<CTableDataCell>{item.memTemp}</CTableDataCell>
							<CTableDataCell>{item.psu}</CTableDataCell>
							<CTableDataCell>{item.volt}</CTableDataCell>
							<CTableDataCell>
								<Link onClick={() => {
									showControlPopup("fan", item.bmcUUID, item.bmcIp, item.power, item.fan)
								}}>
									{item.fan}
								</Link>
							</CTableDataCell>
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

export default MonitoringList;
