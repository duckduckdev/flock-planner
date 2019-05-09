import React, { PureComponent } from 'react'
import { PieChart, Pie, Sector, Cell } from 'recharts'

const data = [
  { name: '<150', value: 1 },
  { name: '150-500', value: 3 },
  { name: '500-1000', value: 4 },
  { name: '1000-1500', value: 2 },
  { name: '>1500', value: 100 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#00B22E'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class BudgetChart extends PureComponent {

  render() {
    return (
      <div>
        <PieChart width={600} height={600}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={200}
            fill="#8884d8"
            dataKey="value"
          >
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
        </PieChart>
        <div>
          <p>Blue Slice: Less Than $150 </p>
          <p>Slice of Blueish/Green/LakeWaterTypeColor: $150-$500</p>
          <p>Yellow Slice: $500-$1000</p>
          <p>Orange Slice: $1000-$1500</p>
          <p>Green Slice: Greater Than Fifteen-Hundo</p>
        </div>
      </div>
    );
  }
}
