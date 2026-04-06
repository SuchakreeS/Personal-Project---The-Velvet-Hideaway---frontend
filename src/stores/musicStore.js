import { create } from "zustand";
import { getMoodTracks } from "@/lib/audius";
import dustInTheWind from "@/assets/DustInTheWind.mp3"
import windOfChange from "@/assets/WindOfChange.mp3"

const useMusicStore = create ( (set, get) => ({
    isPlaying: false,
    volume: 0.5,

    playList: [],  
    currentTrack: null,
    currentTrackTitle: "Choose Your Mood",
    currentArtist: "",
    currentCover:"",

    getMood: async(mood) => {
        const tracks = await getMoodTracks(mood)
        if(tracks.length > 0) {
            set({
                playList: tracks,
                currentTrack: tracks[0].url,
                currentTrackTitle: tracks[0].title,
                currentArtist: tracks[0].artist,
                currentCover: tracks[0].cover,
                isPlaying: true
            })
        }
    },

    togglePlay: () => set((state)=> ({isPlaying: !state.isPlaying})),
    setVolume: (val) => set({volume : val}),

    selectTrack: (track) => set({
        currentTrack: track.url,
        currentTrackTitle: track.title,
        currentArtist: track.artist,
        currentCover: track.cover,
        isPlaying: true
    }),
    nextTrack: () => {
        const { playList, currentTrack } = get();
        if (playList.length === 0) return;
        const index = playList.findIndex(t => t.url === currentTrack);
        const next = playList[(index + 1) % playList.length];
        set({
            currentTrack: next.url,
            currentTrackTitle: next.title,
            currentArtist: next.artist,
            currentCover: next.cover,
            isPlaying: true
        });
    },

    prevTrack: () => {
        const { playList, currentTrack } = get();
        if (playList.length === 0) return;
        const index = playList.findIndex(t => t.url === currentTrack);
        const prev = playList[(index - 1 + playList.length) % playList.length];
        set({
            currentTrack: prev.url,
            currentTrackTitle: prev.title,
            currentArtist: prev.artist,
            currentCover: prev.cover,
            isPlaying: true
        });
    }
}));

export default useMusicStore