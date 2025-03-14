import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; 
import { DollarSign, Wallet, PiggyBank, ArrowUp, ArrowDown } from "lucide-react"; 

interface InfoCardProps {
  title?: string;
  amount?: string;
  description?: string;
  icon?: React.ReactNode; 
  change?: string; 
  changeType?: "positive" | "negative" | "neutral" | any; 
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  amount,
  description,
  icon,
  change,
  changeType = "neutral",
}) => {
  const changeColor =
    changeType === "positive" ? "text-green-600"
    : changeType === "negative" ? "text-red-600"
    : "text-muted-foreground";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon} 
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{amount}</div>
        {description && <div className="text-xs text-muted-foreground">{description}</div>}
        {change && (
          <p className={`flex items-center text-xs ${changeColor}`}>
            {changeType === 'positive' && <ArrowUp className="h-4 w-4" />}
            {changeType === 'negative' && <ArrowDown className="h-4 w-4" />}
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default InfoCard; 