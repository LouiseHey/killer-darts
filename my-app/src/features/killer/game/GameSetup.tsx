import { useState, useEffect } from "react"

import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import type { 
    PlayerState
} from "../player/playerSlice";
import { 
    addPlayer,
    deletePlayer,
    selectPlayers,
} from "../player/playerSlice"
import { 
  addPlayerId,
  deletePlayerId,
  selectGame,
} from "./gameSlice"
import { PlayerSetupComponent } from "./PlayerSetupComponent";


import { v4 as uuidv4 } from 'uuid';
import { GameSettingsComponent } from "./GameSettingsComponent";

export const GameSetup = () => {
    const dispatch = useAppDispatch()
    const players = useAppSelector(selectPlayers)

    const [newPlayerName, setNewPlayerName] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewPlayerName(e.target.value);
    };
  
    const handleAddPlayer = () => {
      if (newPlayerName.trim() !== '') {
        const newPlayer: PlayerState = {
          id: uuidv4(),
          name: newPlayerName,
          points: 0,
          state: "alive",
        };
        dispatch(addPlayer(newPlayer));
        dispatch(addPlayerId(newPlayer.id));
        setNewPlayerName('');
      }
    };

    const handleDeletePlayer = (playerId: string) => {
      dispatch(deletePlayer(playerId));
      dispatch(deletePlayerId(playerId));
    };

  return (
    <div>
      <GameSettingsComponent />
      <div>
        <input type="text" value={newPlayerName} onChange={handleInputChange} placeholder="Enter player name" />
        <button onClick={handleAddPlayer}>Add Player</button>
      </div>
      <h2>Player List</h2>
      <ul>
        {players.map((player: PlayerState) => (
          <li key={player.id}>
            <PlayerSetupComponent player={player} onDelete={handleDeletePlayer} />
          </li>
        ))}
      </ul>
    </div>
  )
}
