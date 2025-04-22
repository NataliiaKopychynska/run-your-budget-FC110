import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CurrencyChart = ({ data }) => {
  // Формуємо дані для графіка
  const chartData = data.map((rate) => ({
    name:
      rate.currencyCodeA === 840
        ? "USD"
        : rate.currencyCodeA === 978
        ? "EUR"
        : "Other",
    rate: rate.rateBuy,
  }));

  return (
    <div style={{ width: "100%", height: 120 }}>
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis dataKey="name" hide />
          <YAxis domain={["dataMin", "dataMax"]} hide />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#ff6699"
            strokeWidth={2}
            dot={{ fill: "#ff6699", r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CurrencyChart;
