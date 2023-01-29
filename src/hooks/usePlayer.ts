import { PlayerContext } from "@/contexts/PlayerContexts"
import { useContext } from "react"

export const usePlayer = () => {
    return useContext(PlayerContext)
}