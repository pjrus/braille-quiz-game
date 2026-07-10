import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GameStatCard from './GameStatCard';
import type { GameSettings } from '@/lib/gameStorage';
import type { Difficulty } from '@/types/braille';

interface GameStartScreenProps {
  settings: GameSettings;
  onSettingsChange: (next: Partial<GameSettings>) => void;
  onStart: () => void;
  stats: { totalGames: number; highScore: number; averageScore: number; bestStreak: number };
  onResetStats: () => void;
  hasPlayed: boolean;
}

export default function GameStartScreen({
  settings,
  onSettingsChange,
  onStart,
  stats,
  onResetStats,
  hasPlayed,
}: GameStartScreenProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">Game Settings</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="difficulty" className="text-sm font-semibold text-foreground">
              Difficulty
            </label>
            <Select
              value={settings.difficulty}
              onValueChange={(value) => onSettingsChange({ difficulty: value as Difficulty })}
            >
              <SelectTrigger id="difficulty" className="h-10 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy — lowercase only</SelectItem>
                <SelectItem value="medium">Medium — lowercase + capitals</SelectItem>
                <SelectItem value="hard">Hard — includes numbers</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="gameLength" className="text-sm font-semibold text-foreground">
              Game Length (seconds)
            </label>
            <Input
              id="gameLength"
              name="gameLength"
              type="number"
              inputMode="numeric"
              autoComplete="off"
              min={10}
              max={300}
              className="h-10"
              value={settings.gameLength}
              onChange={(e) =>
                onSettingsChange({ gameLength: Math.max(10, Math.min(300, Number(e.target.value) || 10)) })
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="questions" className="text-sm font-semibold text-foreground">
              Number of Questions
            </label>
            <Input
              id="questions"
              name="questions"
              type="number"
              inputMode="numeric"
              autoComplete="off"
              min={1}
              max={100}
              className="h-10"
              value={settings.questionsPerGame}
              onChange={(e) =>
                onSettingsChange({ questionsPerGame: Math.max(1, Math.min(100, Number(e.target.value) || 1)) })
              }
            />
          </div>

          <Button type="button" size="lg" className="h-11 w-full text-base uppercase" onClick={onStart}>
            {hasPlayed ? 'Play Again' : 'Start Game'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-center text-xl">Your Statistics</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <GameStatCard label="Games Played" value={stats.totalGames} size="large" />
            <GameStatCard label="High Score" value={stats.highScore} size="large" />
            <GameStatCard label="Average Score" value={stats.averageScore} size="large" />
            <GameStatCard label="Best Streak" value={stats.bestStreak} size="large" />
          </div>
          <Button type="button" variant="outline" className="mx-auto" onClick={onResetStats}>
            Reset Stats
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-accent-surface ring-accent-border">
        <CardHeader>
          <CardTitle className="text-center text-lg">How to Play</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-foreground">
            <li>Lowercase questions show a single Braille pattern.</li>
            <li>Number questions show the number sign (⠼) before the pattern.</li>
            <li>Capital questions show the capital sign (⠠) before the pattern.</li>
            <li>Pick the matching letter or number from four options.</li>
            <li>Each correct answer scores 10 points — keep your streak alive!</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
