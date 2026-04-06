import axios from "axios"

const API_BASE = "https://discoveryprovider.audius.co/v1"

export const getMoodTracks = async (query = "90s Rock") => {
    try {
        const resp = await axios.get (`${API_BASE}/tracks/search`, {
            params: {
                query: query,
                app_name: "VELVET_HIDEAWAY"
            }
        })
        const tracks = resp.data.data

        return(
            tracks.map(track => ({
                id: track.id,
                title: track.title,
                artist: track.user.name,
                url: `${API_BASE}/tracks/${track.id}/stream?app_name=VELVET_HIDEAWAY`,
                cover: track.artwork?.['480x480']
            }))
        )
    }
    catch(err) {
        console.log("AudiusErr", err)
        return []
    }
}