import React, {PureComponent} from 'react'
import {PieChart, Pie, Sector, Cell, Legend, Line} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#00B22E']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <g>
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    </g>
  )
}

export default class BudgetChart extends PureComponent {
  constructor() {
    super()
    this.state = {
      budgetPrefs: [
        {name: '< $150', value: 0},
        {name: '$150-$500', value: 0},
        {name: '$500-$1000', value: 0},
        {name: '$1000-$1500', value: 0},
        {name: '$1500+', value: 0}
      ]
    }
  }
  componentDidMount() {
    setTimeout(async () => {
      const data = [...this.state.budgetPrefs]
      this.props.arrayPrefs
        .map(prefObj => prefObj.budget)
        .forEach(budgetRange => {
          if (budgetRange === data[0].name) {
            data[0].value += 1
          } else if (budgetRange === data[1].name) {
            data[1].value += 1
          } else if (budgetRange === data[2].name) {
            data[2].value += 1
          } else if (budgetRange === data[3].name) {
            data[3].value += 1
          } else {
            data[4].value += 1
          }
        })
      await this.setState({
        budgetPrefs: [...data]
      })
    })
  }
  render() {
    return (
      <PieChart width={600} height={600}>
        <Pie
          data={this.state.budgetPrefs}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={200}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {this.state.budgetPrefs.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend verticalAlign="top" height={36} />
        <Line
          name="< $150"
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          className="legend"
        />
        <Line
          name="$150-$500"
          type="monotone"
          dataKey="value"
          stroke="#82ca9d"
          className="legend"
        />
        <Line
          name="$500-$1000"
          type="monotone"
          dataKey="value"
          stroke="#82ca9d"
          className="legend"
        />
        <Line
          name="$1000-$1500"
          type="monotone"
          dataKey="value"
          stroke="#82ca9d"
          className="legend"
        />
        <Line
          name="$1500+"
          type="monotone"
          dataKey="value"
          stroke="#82ca9d"
          className="legend"
        />
      </PieChart>
    )
  }
}
