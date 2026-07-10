import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface GameStatCardProps {
  label: string;
  value: string | number;
  size?: 'compact' | 'large';
  danger?: boolean;
}

export default function GameStatCard({ label, value, size = 'compact', danger }: GameStatCardProps) {
  return (
    <Card size="sm" className="items-center text-center">
      <CardContent className="flex w-full flex-col items-center gap-1 px-3">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span
          className={cn(
            'font-bold tabular-nums text-foreground',
            size === 'large' ? 'text-2xl' : 'text-xl',
            danger && 'animate-pulse text-warning',
          )}
        >
          {value}
        </span>
      </CardContent>
    </Card>
  );
}
