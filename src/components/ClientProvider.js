"use client"

import { Provider } from "react-redux"
import store from "../store" // Sesuaikan path

const ClientProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
}

export default ClientProvider
