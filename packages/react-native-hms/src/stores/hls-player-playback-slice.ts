import type { StateCreator } from 'zustand';
import { HMSHLSPlayerPlaybackState } from '../types';
import type {
  HMSHLSPlayerPlaybackCue,
  HMSHLSPlayerPlaybackError,
  HMSHLSPlayerPlaybackSlice,
  HMSStore,
} from './types';

export const createHMSHLSPlayerPlaybackSlice: StateCreator<
  HMSStore,
  [],
  [],
  HMSHLSPlayerPlaybackSlice
> = (set) => ({
  cue: undefined,
  setCue: (cue: HMSHLSPlayerPlaybackCue) => set({ cue }),

  playbackState: HMSHLSPlayerPlaybackState.UNKNOWN,
  setPlaybackState: (playbackState: HMSHLSPlayerPlaybackState) =>
    set({ playbackState }),

  error: undefined,
  setPlaybackError: (error: HMSHLSPlayerPlaybackError) => set({ error }),

  resolution: undefined,
  setResolution: (resolution) => set({ resolution }),

  resetPlaybackSlice: () =>
    set({
      cue: undefined,
      playbackState: HMSHLSPlayerPlaybackState.UNKNOWN,
      error: undefined,
      resolution: undefined,
    }),
});
