"use client"

import React from "react"
import { MoonLoader } from "react-spinners"

function VerifyEmail() {
    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-white">
                {/* <div className="ml-5 text-left"> */}
                <div className="mr-2 text-lg text-black">
                    Akunmu sedang diverifikasi...
                </div>
                <MoonLoader
                    color={"#FFCF02"}
                    loading={true}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
            {/* </div> */}
        </>
    )
}

export default VerifyEmail
