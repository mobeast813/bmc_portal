import React, { useState, useEffect } from "react";
import {
	CFormCheck,
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
} from "@coreui/react";

const BoaGroupList = ({
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
				checkboxStates[item.boaId] = false;
			});
		}
		unselectAll();
	}, [resetCheckbox])


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
				boaId: item.boa_id,
				boaName: item.boa_name,
				createdDate: item.created_date,
				description: item.description,
				_cellProps: { class: { scope: "row" } },
			}));
			setItems(transformedData);
		}
	}, [list]);



	const columns = [
		{ key: "check", label: "선택", _props: { scope: "col" } },
		{ key: "boaId", label: "그룹ID", _props: { scope: "col" } },
		{ key: "boaName", label: "그룹명", _props: { scope: "col" } },
		{ key: "createdDate", label: "등록일", _props: { scope: "col" } },
		{ key: "description", label: "Description", _props: { scope: "col" } },
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
													checkboxStates[item.boaId] = true;
												});
												selectAll();
											} else {
												items.forEach((item) => {
													checkboxStates[item.boaId] = false;
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
									id={`gridCheck-${item.boaId}`}
									checked={checkboxStates[item.boaId] || false}
									onChange={(e) => {
										const isChecked = e.target.checked;
										handleCheckboxChange(item.boaId, isChecked);
										if (isChecked) {
											selectId(item.boaId);
										} else {
											unselectId(item.boaId);
										}
									}}
								/>
							</CTableDataCell>
							<CTableDataCell>{item.boaId}</CTableDataCell>
							<CTableDataCell>{item.boaName}</CTableDataCell>
							<CTableDataCell>{item.createdDate}</CTableDataCell>
							<CTableDataCell>{item.description}</CTableDataCell>
						</CTableRow>
					))}
				</CTableBody>
			</CTable>

		</>
	);
};

export default BoaGroupList;
