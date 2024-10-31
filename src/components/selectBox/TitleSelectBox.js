import { CCardText, CCol, CFormSelect } from "@coreui/react";
import { useState } from "react";

const TitleSelectBox = (props) => {
	const { title, options, callBack, initialValue } = props
	const [status, setStatus] = useState(initialValue);

	// const optionSet = [
	// 	{ "전체": "" },
	// 	{ "공개": "Y" },
	// 	{ "숨김": "N" },
	// ]

	return (
		<CCol className="d-flex justify-content-end align-items-center ps-0">
			<CCardText
				className="d-flex align-items-center me-2"
				style={{ fontWeight: "bold", margin: 0 }}
			>
				• {title}
			</CCardText>
			<CFormSelect
				// size="sm"
				className="d-flex w-auto"
				// style={{ height: "30px" }}
				// aria-label="Small select example"
				value={status}
				onChange={(e) => {
					setStatus(e.target.value);
					callBack()
				}}
				options={options}
			>
			</CFormSelect>
		</CCol >
	)
}

export default TitleSelectBox;