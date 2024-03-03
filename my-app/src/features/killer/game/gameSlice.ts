import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../../app/createAppSlice"

import { v4 as uuidv4 } from 'uuid';


export interface GameSliceState {
    id: string
    currentPlayerId: string,
    playerIds: string[],
    settings: {
        killerPoints: number,
        canRevivePlayers: boolean,
    },
    gameState: "setup" | "inProgress" | "finished"
    status: "idle" | "loading" | "failed"
  }

const initialState: GameSliceState = {
    id: uuidv4(),
    currentPlayerId: "",
    playerIds: [],
    settings: {
        killerPoints: 5,
        canRevivePlayers: true,
    },
    gameState: "setup",
    status: "idle",
};

export const gameSlice = createAppSlice({
  name: "game",
  initialState,
  reducers: create => ({
    setCurrentPlayerId: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.currentPlayerId = action.payload;
    }),
    setKillerPoints: create.reducer(
      (state, action: PayloadAction<number>) => {
        state.settings.killerPoints = action.payload;
    }),
    setCanRevivePlayers: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.settings.canRevivePlayers = action.payload;
    }),
    setGameState: create.reducer(
      (state, action: PayloadAction<"setup" | "inProgress" | "finished">) => {
        state.gameState = action.payload;
    }),
    resetGame: create.reducer(
      (state) => {
        Object.assign(state, initialState);
        state.id = uuidv4();
    }),
    addPlayerId: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.playerIds.push(action.payload);
      }),
    deletePlayerId: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.playerIds = state.playerIds.filter(id => id !== action.payload);
    }),
  }),

  selectors: {
    selectGame: state => state,
    selectStatus: state => state.status,
  },
})

export const { setCurrentPlayerId, setKillerPoints, setCanRevivePlayers, setGameState, resetGame, addPlayerId, deletePlayerId } =
  gameSlice.actions

export const { selectGame, selectStatus } = gameSlice.selectors
