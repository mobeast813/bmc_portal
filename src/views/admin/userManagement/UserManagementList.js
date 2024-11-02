import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	CFormCheck,
	CTable,
	CTableBody,
	CTableDataCell,
	CTableHead,
	CTableHeaderCell,
	CTableRow,
} from "@coreui/react";
import { useDispatch } from "react-redux";


const UserManagementList = ({
	list,
	selectId,
	unselectId,
	selectAll,
	unselectAll,
	resetCheckbox,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [items, setItems] = useState();
	const [headCheckStates, setHeadCheckStates] = useState(false);
	const [checkboxStates, setCheckboxStates] = useState({});
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
				checkboxStates[item.userId] = false;
			});
		}
		unselectAll();
	}, [resetCheckbox])

	const showDetailPopup = (userId) => {
		setSelectedItem(userId)
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
				createdDate: item.created_date,
				userEmail: item.user_email,
				userId: item.user_id,
				userName: item.user_name,
				_cellProps: { class: { scope: "row" } },
			}));
			setItems(transformedData);
		}
	}, [list]);

	const setStoreSelectedRoleUserInfo = ({ userId, name, email }) => {
		dispatch({
			type: "user",
			selectedUserInfo: { userId: userId, name: name, email: email }
		});
	}

	const columns = [
		{ key: "check", label: "선택", _props: { scope: "col" } },
		{ key: "user_id", label: "사용자ID", _props: { scope: "col" } },
		{ key: "user_name", label: "성명", _props: { scope: "col" } },
		{ key: "user_email", label: "이메일 주소", _props: { scope: "col" } },
		{ key: "create_dated", label: "등록일", _props: { scope: "col" } },
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
													checkboxStates[item.userId] = true;
												});
												selectAll();
											} else {
												items.forEach((item) => {
													checkboxStates[item.userId] = false;
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
									id={`gridCheck-${item.userId}`}
									checked={checkboxStates[item.userId] || false}
									onChange={(e) => {
										const isChecked = e.target.checked;
										handleCheckboxChange(item.userId, isChecked);
										if (isChecked) {
											selectId(item.userId);
										} else {
											unselectId(item.userId);
										}
									}}
								/>
							</CTableDataCell>
							<CTableDataCell>
								<Link to={`/admin/manage-user-role/${item.userId}`} onClick={() => setStoreSelectedRoleUserInfo({ userId: item.userId, name: item.userName, email: item.userEmail })}>
									{item.userId}
								</Link>
							</CTableDataCell>
							<CTableDataCell>{item.userName}</CTableDataCell>
							<CTableDataCell>{item.userEmail}</CTableDataCell>
							<CTableDataCell>{item.createdDate}</CTableDataCell>
						</CTableRow>
					))}
				</CTableBody>
			</CTable >
		</>
	);
};

export default UserManagementList;
