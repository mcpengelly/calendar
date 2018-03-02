import React, { Component } from 'react';
import { VictoryChart, VictoryAxis, VictoryBar } from 'victory';

export default class BarChart extends Component {
	render() {
		return (
			<VictoryChart scale="50%" domainPadding={50}>
				<VictoryAxis />
				<VictoryAxis tickFormat={x => `${x} hours`} dependentAxis />
				<VictoryBar data={this.props.timesheets} x="day" y="hours" />
			</VictoryChart>
		);
	}
}
