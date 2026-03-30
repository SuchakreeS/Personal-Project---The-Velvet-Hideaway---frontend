import { create } from "zustand";
import dustInTheWind from "@/assets/DustInTheWind.mp3"
import windOfChange from "@/assets/WindOfChange.mp3"

const useMusicStore = create ( (set, get) => ({
    isPlaying: false,
    volume: 0.5,

    playList: [
        {id:1, title: "Dust In The Wind", artist:"Kansas", url:dustInTheWind},
        {id:2, title: "Wind Of Change", artist:"Scorpions", url:windOfChange}
    ],  
    currentTrack: dustInTheWind,
    currentTrackTitle: "Dust In The Wind",

    togglePlay: () => set((state)=> ({isPlaying: !state.isPlaying})),
    setVolume: (val) => set({volume : val}),

    selectTrack: (track) => set({
        currentTrack: track.url,
        currentTrackTitle: track.title,
        isPlaying: true
    }),
    nextTrack: () => {
        const {playList, currentTrack} = get()
        const currentTrackIndex = playList.findIndex(track => track.url === currentTrack)
        const nextTrackIndex = (currentTrackIndex + 1) % playList.length
        const nextTrackData = playList[nextTrackIndex]

        set ({
            currentTrack: nextTrackData.url,
            currentTrackTitle: nextTrackData.title,
            isPlaying: true
        })
    },
    prevTrack: () => {
        const { playList, currentTrack } = get();
        const currentTrackIndex = playList.findIndex(track => track.url === currentTrack);
        const prevTrackIndex = (currentTrackIndex - 1 + playList.length) % playList.length;
        const prevTrackData = playList[prevTrackIndex];

        set({
            currentTrack: prevTrackData.url,
            currentTrackTitle: prevTrackData.title,
            isPlaying: true
        });
    }
}))

export default useMusicStore