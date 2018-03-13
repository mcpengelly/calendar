import React, { Component } from 'react'
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryZoomContainer,
  VictoryBrushContainer
} from 'victory'

const maxY = 24
const minY = 0
const domainPad = 100
const style = {
  width: '50%',
  height: '50%',
  border: '1px solid blue',
  margin: 'auto'
}

export default class ZoomableBarChart extends Component {
  constructor () {
    super()
    const year = new Date().getFullYear()
    const nextYear = year + 1
    const lastYear = year - 1

    this.state = {
      zoomDomain: { x: [new Date(lastYear, 1, 1), new Date(nextYear, 1, 1)] }
    }
  }

  handleZoom (domain) {
    this.setState({ zoomDomain: domain })
  }

  render () {
    return (
      <div style={style}>
        <VictoryChart
          scale={{ x: 'time' }}
          domainPadding={{ x: domainPad, y: domainPad }}
          domain={{ y: [minY, maxY] }}
          containerComponent={
            <VictoryZoomContainer
              zoomDimension='x'
              zoomDomain={this.state.zoomDomain}
              onZoomDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryAxis tickFormat={x => new Date(x).getFullYear()} />
          <VictoryAxis dependentAxis />
          <VictoryBar data={this.props.timesheets} x='day' y='hours' />
        </VictoryChart>
        <VictoryChart
          padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
          width={600}
          height={100}
          scale={{ x: 'time' }}
          containerComponent={
            <VictoryBrushContainer
              brushDimension='x'
              brushDomain={this.state.zoomDomain}
              onBrushDomainChange={this.handleZoom.bind(this)}
            />
          }
        >
          <VictoryAxis tickFormat={x => new Date(x).getFullYear()} />
          <VictoryBar data={this.props.timesheets} x='day' y='hours' />
        </VictoryChart>
      </div>
    )
  }
}
