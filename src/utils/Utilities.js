const SetSelectBoxOptions = (values, firstValuelabel) => {
	const result = firstValuelabel ? [{ label: firstValuelabel, value: "0" }] : []
	values.map((element) => (
		result.push({ label: element, value: element })
	))
	return result;
}

const SetSelectBoxPageOptions = (number) => {
	const result = []
	Array.from({ length: number }, (_, index) => (
		result.push({ label: `${index + 1}/${number}`, value: index + 1 })
	))
	return result;
}

const FormatDate = (
	date,
	hours = "00",
	minutes = "00",
	seconds = "00"
) => {
	if (date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
		const day = String(date.getDate()).padStart(2, "0");
		//   const hours = String(date.getHours()).padStart(2, "0");
		//   const minutes = String(date.getMinutes()).padStart(2, "0");
		//   const seconds = String(date.getSeconds()).padStart(2, "0");

		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}
};

export { SetSelectBoxOptions, SetSelectBoxPageOptions, FormatDate }