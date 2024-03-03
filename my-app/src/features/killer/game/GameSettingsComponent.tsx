import { useState, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { setKillerPoints, setCanRevivePlayers, selectGame } from './gameSlice';

export const GameSettingsComponent = () => {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame);

  const [killerPoints, setKillerPointsValue] = useState(game.settings.killerPoints);
  const [canRevivePlayers, setCanRevivePlayersValue] = useState(game.settings.canRevivePlayers);

  const handleKillerPointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKillerPointsValue(Number(e.target.value));
  };

  const handleCanRevivePlayersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCanRevivePlayersValue(e.target.checked);
  };

  const updateSettings = () => {
    dispatch(setKillerPoints(killerPoints));
    dispatch(setCanRevivePlayers(canRevivePlayers));
  };

  return (
    <div>
      <div>
        <label htmlFor="killerPoints">Killer Points:</label>
        <input
          type="number"
          id="killerPoints"
          value={killerPoints}
          onChange={handleKillerPointsChange}
        />
      </div>
      <div>
        <label htmlFor="canRevivePlayers">Can Revive Players:</label>
        <input
          type="checkbox"
          id="canRevivePlayers"
          checked={canRevivePlayers}
          onChange={handleCanRevivePlayersChange}
        />
      </div>
      <button onClick={updateSettings}>Update Settings</button>
    </div>
  );
};