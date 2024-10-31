import { CCard, CCardTitle } from "@coreui/react";
import { CChart } from "@coreui/react-chartjs";
import ChartDataLabels from 'chartjs-plugin-datalabels'
import PropTypes from "prop-types";

const lables = ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'];
const bgColor = ['#41B883', '#E46651', '#00D8FF', '#DD1B16'];
const data = [40, 20, 80, 10];

const PieChart = (props) => {
	const { title, labels, bgColors, data } = props

	const borderWidth = 1;
	const borderColor = 'white';
	return (
		<CCard className="p-4 mt-2 me-2">
			<CCardTitle>{title}</CCardTitle>
			<CChart
				type="pie"
				width={300}
				height={300}
				customTooltips={false}

				data={{
					labels: labels,
					datasets: [
						{
							backgroundColor: bgColors,
							data: data,
							borderWidth: 1,
							offset: 2,
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
								boxWidth: 13,
								color: '#fff',

							}
						}
					},

				}}
			/>
		</CCard>
	);
}

PieChart.prototype = {
	title: PropTypes.string.isRequired,
	labels: PropTypes.arrayOf(PropTypes.string).isRequired,
	bgColors: PropTypes.arrayOf(PropTypes.string).isRequired,
	data: PropTypes.element.isRequired
}

export default PieChart;