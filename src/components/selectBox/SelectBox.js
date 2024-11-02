import { CCol, CFormSelect } from "@coreui/react";
import { useEffect, useState } from "react";

const SelectBox = (props) => {
	const { options, callBack, reload, initValue } = props
	const [status, setStatus] = useState(initValue ? initValue : "");
	useEffect(() => {
		if (reload) {
			setStatus(1)
		}
	}, [reload]);

	return <CCol className="d-flex align-items-center ps-0">
		<CFormSelect
			className="d-flex"
			value={status}
			onChange={(e) => {
				setStatus(e.target.value);
				callBack(e.target.value)
			}}
			options={options}
		>
		</CFormSelect>
	</CCol>
}

export default SelectBox;