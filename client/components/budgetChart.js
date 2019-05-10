import React, {PureComponent} from 'react'
import {PieChart, Pie, Sector, Cell} from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#00B22E']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default class BudgetChart extends PureComponent {
  constructor() {
    super()
    this.state = {
      budgetPrefs: [
        {name: '< $150', value: 0},
        {name: '$150-$500', value: 0},
        {name: '$500 - $1000', value: 0},
        {name: '$1000-$1500', value: 0},
        {name: '$1500+', value: 0}
      ]
    }
  }
  componentDidMount() {
    setTimeout(async () => {
      const data = [...this.state.budgetPrefs]
      console.log('array of preferences', this.props.arrayPrefs)
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
      <div>
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
          >
            {this.state.budgetPrefs.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
        <div>
          <h1>Legend for Pie Chart</h1>
          <p>Blue Slice: Less Than $150</p>
          <p>Slice of Blueish/Green/LakeWaterTypeColor:</p>
          <p>Yellow Slice: $500-$1000</p>
          <p>Orange Slice: $1000-$1500</p>
          <p>Green Slice: Greater Than Fifteen-Hundo</p>
        </div>
      </div>
    )
  }
}
