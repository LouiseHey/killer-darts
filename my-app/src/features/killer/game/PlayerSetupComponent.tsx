import type React from 'react';
import { type PlayerState } from '../player/playerSlice';

interface PlayerProps {
  player: PlayerState;
  onDelete: (playerId: string) => void
}

export 
const PlayerSetupComponent: React.FC<PlayerProps> = ({ player, onDelete }) => {
    const handleDeleteClick = () => {
        onDelete(player.id);
      };

  return (
    <div>
      <h3>{player.name}</h3>
      <p>ID: {player.id}</p>
      <p>Points: {player.points}</p>
      <p>Status: {player.state}</p>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
};
