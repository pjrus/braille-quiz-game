import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GameStatCard from './GameStatCard';

interface GameCompletionScreenProps {
  summary: { score: number; streak: number; answered: number; total: number };
  onPlayAgain: () => void;
}

export default function GameCompletionScreen({ summary, onPlayAgain }: GameCompletionScreenProps) {
  return (
    <Card className="mx-auto max-w-xl">
      <CardHeader>
        <CardTitle className="text-center text-xl">Game Over</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-5 text-center">
        <p className="text-muted-foreground">
          You answered {summary.answered} of {summary.total} questions.
        </p>
        <div className="grid w-full grid-cols-2 gap-3">
          <GameStatCard label="Final Score" value={summary.score} size="large" />
          <GameStatCard label="Best Streak" value={summary.streak} size="large" />
        </div>
        <Button type="button" size="lg" className="h-11 w-full max-w-xs text-base uppercase" onClick={onPlayAgain}>
          Play Again
        </Button>
      </CardContent>
    </Card>
  );
}
