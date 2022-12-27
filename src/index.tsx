import { createRoot } from "react-dom/client"

import { worker } from "./mocks/worker"
import App from "./App"
import reportWebVitals from "./reportWebVitals"

if (process.env.REACT_APP_USE_MSW) {
  worker.start()
}

createRoot(document.getElementById("root") as HTMLElement).render(<App />)

reportWebVitals()
