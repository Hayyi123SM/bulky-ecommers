"use client"

import { Provider } from "react-redux"
import { store } from "../store" // Ensure the path is correct

const ClientProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
}

export default ClientProvider
