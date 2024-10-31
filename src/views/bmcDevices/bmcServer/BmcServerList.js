import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	CFormCheck,
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
} from "@coreui/react";
import InventoryCatalogDetailModal from "../../maintenance/InventoryCatalogDetailModal";

const BmcServerList = ({
	list,
	selectId,
	unselectId,
	selectAll,
	unselectAll,
	resetCheckbox,
}) => {
	const [items, setItems] = useState();
	const [headCheckStates, setHeadCheckStates] = useState(false);
	const [checkboxStates, setCheckboxStates] = useState({});
	const [visible, setVisible] = useState(false);
	const [selectedItem, setSelectedItem] = useState();

	const handleCheckboxChange = (id, isChecked) => {
		setCheckboxStates((prevState) => ({
			...prevState,
			[id]: isChecked,
		}));
	};

	useEffect(() => {
		setHeadCheckStates(false)
		if (items) {
			items.forEach((item) => {
				checkboxStates[item.bmcUUID] = false;
			});
		}
		unselectAll();
	}, [resetCheckbox])

	const showDetailPopup = (bmcUUID) => {
		setSelectedItem(bmcUUID)
		setVisible(true);
	}


	useEffect(() => {
		// checkboxStates가 초기 상태({})인 경우 실행하지 않음
		if (Object.keys(checkboxStates).length === 0) return;

		// 모든 id가 true인지 확인
		const allChecked = Object.values(checkboxStates).every((value) => value);

		if (allChecked) {
			// 모든 id가 true일 때 실행할 코드
			setHeadCheckStates(true);
		} else {
			setHeadCheckStates(false);
		}
	}, [checkboxStates]); // checkboxStates가 변경될 때마다 useEffect 실행

	useEffect(() => {
		if (list) {
			const transformedData = list.map((item) => ({
				check: "",
				bmcUUID: item.bmc_UUID,
				bmcName: item.bmc_name,
				boaName: item.boa_name,
				vendor: item.vendor,
				bmcIp: item.bmc_ip,
				version: item.version,
				joinState: item.join_state,
				joinDate: item.join_date,
				_cellProps: { class: { scope: "row" } },
			}));
			setItems(transformedData);
		}
	}, [list]);



	const columns = [
		{ key: "check", label: "선택", _props: { scope: "col" } },
		{ key: "bmc_UUID", label: "서버ID", _props: { scope: "col" } },
		{ key: "bmc_name", label: "서버명", _props: { scope: "col" } },
		{ key: "boa_name", label: "그룹", _props: { scope: "col" } },
		{ key: "vendor", label: "벤더", _props: { scope: "col" } },
		{ key: "bmc_ip", label: "IP", _props: { scope: "col" } },
		{ key: "version", label: "버전", _props: { scope: "col" } },
		{ key: "join_state", label: "등록상태", _props: { scope: "col" } },
		{ key: "join_date", label: "등록일", _props: { scope: "col" } },
	];

	return (
		<>
			<CTable align="middle" responsive bordered={true} hover={true}>
				<CTableHead align="middle" color="primary">
					<CTableRow>
						{columns?.map((column, key) => (
							<CTableHeaderCell key={key}>
								{column.label == "선택" ? (
									<CFormCheck
										checked={headCheckStates || false}
										onChange={(e) => {
											const isChecked = e.target.checked;
											setHeadCheckStates(isChecked);
											if (isChecked) {
												items.forEach((item) => {
													checkboxStates[item.bmcUUID] = true;
												});
												selectAll();
											} else {
												items.forEach((item) => {
													checkboxStates[item.bmcUUID] = false;
												});
												unselectAll();
											}
										}}
									/>
								) : (
									<></>
								)}
								&nbsp; {column.label}
							</CTableHeaderCell>
						))}
					</CTableRow>
				</CTableHead>

				<CTableBody align="middle">
					{items?.map((item, key) => (
						<CTableRow key={key}>
							<CTableDataCell>
								<CFormCheck
									type="checkbox"
									id={`gridCheck-${item.bmcUUID}`}
									checked={checkboxStates[item.bmcUUID] || false}
									onChange={(e) => {
										const isChecked = e.target.checked;
										handleCheckboxChange(item.bmcUUID, isChecked);
										if (isChecked) {
											selectId(item.bmcUUID);
										} else {
											unselectId(item.bmcUUID);
										}
									}}
								/>
							</CTableDataCell>
							<CTableDataCell>
								<Link onClick={() => showDetailPopup(item.bmcUUID)}>
									{item.bmcUUID}
								</Link>
							</CTableDataCell>
							<CTableDataCell>{item.bmcName}</CTableDataCell>
							<CTableDataCell>{item.boaName}</CTableDataCell>
							<CTableDataCell>{item.vendor}</CTableDataCell>

							<CTableDataCell>{item.bmcIp}</CTableDataCell>
							<CTableDataCell>{item.version}</CTableDataCell>
							<CTableDataCell>{item.joinState}</CTableDataCell>
							<CTableDataCell>{item.joinDate}</CTableDataCell>
						</CTableRow>
					))}
				</CTableBody>
			</CTable>
			<InventoryCatalogDetailModal
				visible={visible}
				setVisible={setVisible}
				bmcUUID={selectedItem}
			/>
		</>
	);
};

export default BmcServerList;
