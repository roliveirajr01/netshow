import { RefObject } from "react";

export interface PlayerState {
  videoRef: RefObject<HTMLVideoElement> | null;
  progressBarRef: RefObject<HTMLDivElement> | null;
  volumeContainerRef: RefObject<HTMLDivElement> | null;
  settingsMenuRef: RefObject<HTMLDivElement> | null;
  containerRef: RefObject<HTMLDivElement> | null;

  isLoading: boolean;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  currentTime: number;
  duration: number;
  showSettings: boolean;
  showControls: boolean;
  setVideoRef: (ref: RefObject<HTMLVideoElement> | null) => void;
  setProgressBarRef: (ref: RefObject<HTMLDivElement> | null) => void;
  setVolumeContainerRef: (ref: RefObject<HTMLDivElement> | null) => void;
  setSettingsMenuRef: (ref: RefObject<HTMLDivElement> | null) => void;
  setContainerRef: (ref: RefObject<HTMLDivElement> | null) => void;
  setIsLoading: (loading: boolean) => void;
  setIsPlaying: (playing: boolean) => void;
  setVolume: (v: number) => void;
  toggleMute: () => void;
  setPlaybackRate: (rate: number) => void;
  setCurrentTime: (t: number) => void;
  setDuration: (d: number) => void;
  setShowSettings: (b: boolean) => void;
  setShowControls: (b: boolean) => void;
  togglePlay: () => void;
  seekTo: (t: number) => void;
}