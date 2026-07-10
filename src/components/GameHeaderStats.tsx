import { Card, CardContent } from '@/components/ui/card';
import GameStatCard from './GameStatCard';

interface GameHeaderStatsProps {
  score: number;
  question: string;
  time: string;
  streak: number;
  timerLow: boolean;
}

export default function GameHeaderStats({ score, question, time, streak, timerLow }: GameHeaderStatsProps) {
  return (
    <Card className="mb-6">
      <CardContent className="flex flex-col gap-4">
        <h1 className="text-center text-3xl font-bold text-foreground">Braille Character Quiz</h1>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-live="polite">
          <GameStatCard label="Score" value={score} />
          <GameStatCard label="Question" value={question} />
          <GameStatCard label="Time" value={time} danger={timerLow} />
          <GameStatCard label="Streak" value={streak} />
        </div>
      </CardContent>
    </Card>
  );
}
