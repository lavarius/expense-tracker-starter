import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6', '#ec4899'];

function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([category, value]) => ({ name: category, value }));

  if (data.length === 0) {
    return (
      <div className="spending-chart">
        <h2>Spending by Category</h2>
        <p className="no-data">No expense data to display.</p>
      </div>
    );
  }

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="name" tick={{ fill: '#585d72', fontSize: 12, fontFamily: 'Outfit' }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={(v) => `$${v}`} tick={{ fill: '#585d72', fontSize: 12, fontFamily: 'Outfit' }} axisLine={false} tickLine={false} width={52} />
          <Tooltip
            formatter={(value) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 'Spent']}
            contentStyle={{ background: '#161820', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontFamily: 'Outfit', fontSize: 13 }}
            labelStyle={{ color: '#e4e6f0', fontWeight: 600, marginBottom: 2 }}
            itemStyle={{ color: '#585d72' }}
            cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          />
          <Bar dataKey="value" radius={[5, 5, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
