import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import "bootstrap/dist/js/bootstrap.bundle"
import "bootstrap/dist/css/bootstrap.min.css"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "./index.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
const root = ReactDOM.createRoot(document.getElementById("root"))
import "react-toastify/dist/ReactToastify.css"

let query = new QueryClient()

root.render(
  <QueryClientProvider client={query}>
    <App />
    {/* <ReactQueryDevtools /> */}
  </QueryClientProvider>
)

reportWebVitals()
