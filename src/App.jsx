import { ToastContainer } from "react-toastify"
import AppRouter from "./routes/AppRouter"
import GlobalAudio from "./components/GlobalAudio"

function App() {
  return(
    <>
    <GlobalAudio />
    <AppRouter />
    <ToastContainer
    position="top-center"
    style={{zIndex:9999}}
    theme="dark"/>
    
    </>
  )
}

export default App