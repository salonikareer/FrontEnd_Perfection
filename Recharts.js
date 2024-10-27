import React, { useState, useCallback } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  ScatterChart, Scatter, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  PolarRadiusAxis, RadialBarChart, RadialBar, ComposedChart, ZAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Brush, Cell, ReferenceArea, ReferenceLine
} from 'recharts';

// Enhanced sample data
const data = [
  { name: 'Jan', sales: 4000, profit: 2400, customers: 2400, satisfaction: 85, marketingCost: 1200, returns: 120 },
  { name: 'Feb', sales: 3000, profit: 1398, customers: 2210, satisfaction: 78, marketingCost: 1100, returns: 150 },
  { name: 'Mar', sales: 2000, profit: 9800, customers: 2290, satisfaction: 92, marketingCost: 1500, returns: 80 },
  { name: 'Apr', sales: 2780, profit: 3908, customers: 2000, satisfaction: 88, marketingCost: 1300, returns: 110 },
  { name: 'May', sales: 1890, profit: 4800, customers: 2181, satisfaction: 95, marketingCost: 1400, returns: 90 },
  { name: 'Jun', sales: 2390, profit: 3800, customers: 2500, satisfaction: 89, marketingCost: 1250, returns: 100 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];

const Recharts = () => {
  // State for zoom functionality
  const [zoomData, setZoomData] = useState({
    left: 'dataMin',
    right: 'dataMax',
    refAreaLeft: '',
    refAreaRight: '',
  });

  // State for interactive elements
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [animationEnabled, setAnimationEnabled] = useState(true);

  // Complex data transformations
  const calculateMetrics = useCallback((data) => {
    return data.map(item => ({
      ...item,
      efficiency: ((item.profit / item.marketingCost) * 100).toFixed(2),
      customerValue: (item.sales / item.customers).toFixed(2),
      returnRate: ((item.returns / item.sales) * 100).toFixed(2),
      performanceScore: (
        (item.satisfaction * 0.4) +
        ((1 - (item.returns / item.sales)) * 100 * 0.3) +
        ((item.profit / item.marketingCost) * 20 * 0.3)
      ).toFixed(2)
    }));
  }, []);

  const enrichedData = calculateMetrics(data);

  // Exponential Moving Average calculation
  const calculateEMA = (data, key, alpha = 0.3) => {
    let ema = data[0][key];
    return data.map(item => {
      ema = alpha * item[key] + (1 - alpha) * ema;
      return { ...item, [`${key}EMA`]: ema };
    });
  };

  const dataWithEMA = calculateEMA(enrichedData, 'sales');

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload) return null;
    return (
      <div className="bg-white p-4 border rounded shadow-lg">
        <h3 className="font-bold text-gray-800">{label}</h3>
        {payload.map((entry, index) => (
          <div key={index} className="flex justify-between gap-4">
            <span style={{ color: entry.color }}>{entry.name}:</span>
            <span className="font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  // Zoom handling
  const handleZoom = (event) => {
    if (!event) return;
    const { startIndex, endIndex } = event;
    setZoomData({
      left: data[startIndex].name,
      right: data[endIndex].name,
      refAreaLeft: '',
      refAreaRight: '',
    });
  };

  return (
    <div className="space-y-8 p-4">
      {/* Advanced Line Chart with EMA and Zoom */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Interactive Line Chart with EMA</h3>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => setAnimationEnabled(!animationEnabled)}
          >
            Toggle Animation
          </button>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <ComposedChart data={dataWithEMA}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                domain={[zoomData.left, zoomData.right]}
                type="category"
              />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8884d8"
                isAnimationActive={animationEnabled}
                animationDuration={1500}
                animationBegin={300}
              />
              <Line
                type="monotone"
                dataKey="salesEMA"
                stroke="#82ca9d"
                strokeWidth={2}
                dot={false}
                isAnimationActive={animationEnabled}
              />
              <Bar
                dataKey="returns"
                fill="#ffc658"
                opacity={0.5}
                isAnimationActive={animationEnabled}
              />
              <Brush
                dataKey="name"
                height={30}
                stroke="#8884d8"
                onChange={handleZoom}
              />
              <ReferenceLine
                y={data.reduce((acc, item) => acc + item.sales, 0) / data.length}
                stroke="red"
                strokeDasharray="3 3"
                label="Average"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Scatter Plot with Z-axis */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">3D Performance Analysis</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <ScatterChart>
              <CartesianGrid />
              <XAxis dataKey="marketingCost" name="Marketing Cost" />
              <YAxis dataKey="profit" name="Profit" />
              <ZAxis
                dataKey="performanceScore"
                range={[50, 400]}
                name="Performance"
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter
                name="Performance Metrics"
                data={enrichedData}
                fill="#8884d8"
                isAnimationActive={animationEnabled}
                animationDuration={1500}
                animationBegin={300}
              >
                {enrichedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Radar Performance Overview */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Multi-metric Performance Radar</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer>
            <RadarChart data={enrichedData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
              <Radar
                name="Performance Score"
                dataKey="performanceScore"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
                isAnimationActive={animationEnabled}
              />
              <Radar
                name="Efficiency"
                dataKey="efficiency"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
                isAnimationActive={animationEnabled}
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Recharts;
