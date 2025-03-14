import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts"; 

interface LineChartCardProps {
    title: string;
    data: any[]; // Data for the chart
    dataKey: string; // Key for the Y axis (chart value)
    xAxisKey?: string; // Key for the X axis (optional, defaults to "name")
    strokeColor?: string; // Line color (optional, defaults to "currentColor")
    height?: number; // Chart height (optional, defaults to 350)
    cardClassName?: string; // Additional classes for the card (optional)
  }
  

const LineChartCard: React.FC<LineChartCardProps> = ({
  title,
  data,
  dataKey,
  xAxisKey = "name",
  strokeColor = "currentColor",
  height = 350,
  cardClassName = "col-span-4",
}) => {
  return (
    <Card className={cardClassName}> 
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <XAxis dataKey={xAxisKey} stroke="#888888" fontSize={12} />
            <YAxis stroke="#888888" fontSize={12} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={strokeColor}
              strokeWidth={2}
              className="stroke-primary" 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LineChartCard;