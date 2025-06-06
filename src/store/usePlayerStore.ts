import { create } from 'zustand';
import type { RefObject } from 'react';

interface PlayerState {
  // Referências DOM
  videoRef: RefObject<HTMLVideoElement> | null;
  progressBarRef: RefObject<HTMLDivElement> | null;
  volumeContainerRef: RefObject<HTMLDivElement> | null;
  settingsMenuRef: RefObject<HTMLDivElement> | null;
  containerRef: RefObject<HTMLDivElement> | null;

  // Estados do player
  isLoading: boolean;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  currentTime: number;
  duration: number;
  showSettings: boolean;
  showControls: boolean;

  // Setters de referência
  setVideoRef: (ref: RefObject<HTMLVideoElement> | null) => void;
  setProgressBarRef: (ref: RefObject<HTMLDivElement> | null) => void;
  setVolumeContainerRef: (ref: RefObject<HTMLDivElement> | null) => void;
  setSettingsMenuRef: (ref: RefObject<HTMLDivElement> | null) => void;
  setContainerRef: (ref: RefObject<HTMLDivElement> | null) => void;
  setIsLoading: (loading: boolean) => void;

  // Setters de estado
  setIsPlaying: (playing: boolean) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  setPlaybackRate: (rate: number) => void;
  setCurrentTime: (t: number) => void;
  setDuration: (d: number) => void;
  setShowSettings: (b: boolean) => void;
  setShowControls: (b: boolean) => void;

  // Ações
  togglePlay: () => void;
  seekTo: (t: number) => void;
}

let controlsTimeout: NodeJS.Timeout | null = null;

const usePlayerStore = create<PlayerState>((set, get) => ({
  // Inicializar referências
  videoRef: null,
  progressBarRef: null,
  volumeContainerRef: null,
  settingsMenuRef: null,
  containerRef: null,

  // Inicializar estados
  isLoading: true,
  isPlaying: false,
  volume: 0.7,
  isMuted: false,
  playbackRate: 1,
  currentTime: 0,
  duration: 0,
  showSettings: false,
  showControls: true,

  // Setters de referência
  setVideoRef: (ref) => set({ videoRef: ref }),
  setProgressBarRef: (ref) => set({ progressBarRef: ref }),
  setVolumeContainerRef: (ref) => set({ volumeContainerRef: ref }),
  setSettingsMenuRef: (ref) => set({ settingsMenuRef: ref }),
  setContainerRef: (ref) => set({ containerRef: ref }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  // Setters de estado
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setVolume: (v) => {
    const video = get().videoRef?.current;
    if (video) {
      video.volume = v;
      video.muted = v === 0;
    }
    set({ volume: v, isMuted: v === 0 });
  },
  toggleMute: () => {
    const { volume, isMuted, setVolume } = get();
    setVolume(isMuted ? (volume > 0 ? volume : 0.7) : 0);
  },
  setPlaybackRate: (rate) => {
    const video = get().videoRef?.current;
    if (video) video.playbackRate = rate;
    set({ playbackRate: rate });
  },
  setCurrentTime: (t) => set({ currentTime: t }),
  setDuration: (d) => set({ duration: d }),
  setShowSettings: (b) => set({ showSettings: b }),
  setShowControls: (b) => {
    if (controlsTimeout) clearTimeout(controlsTimeout);

    set({ showControls: b });

    if (b) {
      controlsTimeout = setTimeout(() => {
        get().setShowControls(false);
      }, 3000);
    }
  },

  // Ações
  togglePlay: () => {
    const video = get().videoRef?.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch((e) => console.error('Play error:', e));
    } else {
      video.pause();
    }
  },
  seekTo: (t) => {
    const video = get().videoRef?.current;
    if (video) {
      video.currentTime = t;
      set({ currentTime: t });
    }
  },
}));

export default usePlayerStore;