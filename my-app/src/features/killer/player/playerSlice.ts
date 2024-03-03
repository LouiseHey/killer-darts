import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../../app/createAppSlice"

export interface PlayerState {
    id: string;
    name: string;
    points: number;
    state: "killer" | "alive" | "dead" | "eliminated"
}

export interface PlayerSliceState {
    players: PlayerState[]
    status: "idle" | "loading" | "failed"
  }

const initialState: PlayerSliceState = {
    players: [],
    status: "idle",
};

export const playerSlice = createAppSlice({
  name: "players",
  initialState,
  reducers: create => ({
    addPlayer: create.reducer(
      (state, action: PayloadAction<PlayerState>) => {
        state.players.push(action.payload);
    }),
    updatePlayer: create.reducer(
      (state, action: PayloadAction<PlayerState>) => {
        const index = state.players.findIndex(player => player.id === action.payload.id);
        if (index !== -1) {
          state.players[index] = action.payload;
        }
    }),
    deletePlayer: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.players = state.players.filter(player => player.id !== action.payload);
      },
    ),
  }),

  selectors: {
    selectPlayers: state => state.players,
    selectStatus: state => state.status,
  },
})

export const { addPlayer, updatePlayer, deletePlayer } =
  playerSlice.actions

export const { selectPlayers, selectStatus } = playerSlice.selectors
