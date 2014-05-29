//Highcharts.setOptions({
//	global: {
//		useUTC: false
//	}
//});

Highcharts.theme = {
	chart : {
		backgroundColor : '#f7f2f2'
	},
	title : {
		style : {
			color : '#000000',
			fontWeight : 'bold',
			'font-size' : '1.5em'

		}
	},
	yAxis : {
		title : {
			style : {
				color : '#000000',
				fontWeight : 'bold',
				'font-size' : '1em'

			}
		},
		labels : {
			style : {
				color : 'black'
			}
		},
	},
	xAxis : {
		labels : {
			style : {
				color : 'black'

			}
		},
	},
	legend : {
		itemStyle : {
			color : 'black'
		}
	}
};

// Apply the theme
Highcharts.setOptions(Highcharts.theme);