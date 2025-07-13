
import { useCounter } from '@/hooks/useCounter';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  numericValue: number;
  icon: LucideIcon;
  suffix?: string;
}

const StatCard = ({ label, value, numericValue, icon: Icon, suffix = '' }: StatCardProps) => {
  const animatedCount = useCounter(numericValue, 2500);
  
  const formatValue = (count: number, originalValue: string) => {
    if (originalValue.includes('%')) {
      return `${count}%`;
    } else if (originalValue.includes('+')) {
      return `${count.toLocaleString()}+`;
    }
    return count.toLocaleString();
  };

  return (
    <div className="text-center">
      <Icon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
      <div className="text-3xl font-bold text-gray-900 mb-1">
        {formatValue(animatedCount, value)}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

export default StatCard;
