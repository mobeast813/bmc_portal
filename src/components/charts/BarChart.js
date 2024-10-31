import { CCard, CCardTitle } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import ChartDataLabels from 'chartjs-plugin-datalabels'
import PropTypes from 'prop-types'


const BarChart = (props) => {
	const { title, bgColors, labels, data } = props

	const borderWidth = 0;
	const borderColor = 'white';
	var dataSet = {
		ok: [],
		warning: [],
		critical: [],
	}

	dataSet.ok.push(data.cpu_normal)
	dataSet.ok.push(data.mem_normal)
	dataSet.critical.push(data.cpu_critical)
	dataSet.critical.push(data.mem_critical)
	dataSet.warning.push(data.cpu_warning)
	dataSet.warning.push(data.mem_warning)

	return (
		<CCard className="p-4 mt-2 me-2">
			<CCardTitle>{title}</CCardTitle>
			<CChart
				type="bar"
				customTooltips={false}
				width={300}
				height={300}
				data={{
					labels: labels,
					datasets: [
						{
							label: 'Critical',
							backgroundColor: bgColors[0],
							data: dataSet.critical,
							borderWidth: borderWidth,
							borderColor: borderColor,
							stack: 'Stack 0',
						},
						{
							label: 'Warning',
							backgroundColor: bgColors[1],
							data: dataSet.warning,
							borderWidth: borderWidth,
							borderColor: borderColor,
							stack: 'Stack 0',
						},
						{
							label: 'OK',
							backgroundColor: bgColors[2],
							data: dataSet.ok,
							borderWidth: borderWidth,
							borderColor: borderColor,
							stack: 'Stack 0',
						},
					],
				}}
				plugins={[ChartDataLabels]}
				options={{
					responsive: false,
					plugins: {
						datalabels: {

							color: 'black',
							font: { size: 13 }
						},
						tooltips: {
							enabled: false,

						},
						legend: {
							position: 'bottom',
							display: true,
							labels: {
								boxWidth: 15,
								color: '#fff',
							}
						}
					},
				}}
			/>

		</CCard >
	);
}

BarChart.prototype = {
	title: PropTypes.string.isRequired,
	bgColors: PropTypes.arrayOf(PropTypes.string).isRequired,
	data: PropTypes.element.isRequired
}

export default BarChart;