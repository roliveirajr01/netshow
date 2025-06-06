import { PlayerState } from '@models/store';
import { create } from 'zustand';

let controlsTimeout: NodeJS.Timeout | null = null;

const usePlayerStore = create<PlayerState>((set, get) => ({
  videoRef: null,
  progressBarRef: null,
  volumeContainerRef: null,
  settingsMenuRef: null,
  containerRef: null,

  isLoading: true,
  isPlaying: false,
  volume: 0.7,
  isMuted: false,
  playbackRate: 1,
  currentTime: 0,
  duration: 0,
  showSettings: false,
  showControls: true,

  setVideoRef: (ref) => set({ videoRef: ref }),
  setProgressBarRef: (ref) => set({ progressBarRef: ref }),
  setVolumeContainerRef: (ref) => set({ volumeContainerRef: ref }),
  setSettingsMenuRef: (ref) => set({ settingsMenuRef: ref }),
  setContainerRef: (ref) => set({ containerRef: ref }),
  setIsLoading: (loading) => set({ isLoading: loading }),

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