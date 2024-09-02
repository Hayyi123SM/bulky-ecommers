import { MoonLoader } from "react-spinners"

function LoadingSpinner({ text = true, color = "#FFCF02", size = 30 }) {
    return (
        // <div className="sweet-loading z-50 flex items-center justify-center">
        //     <div className="mr-2 py-2 text-xl font-semibold">
        //         Tunggu sebentar...
        //     </div>
        //     <MoonLoader
        //         color={"#FFCF02"}
        //         loading={true}
        //         size={25}
        //         aria-label="Loading Spinner"
        //         data-testid="loader"
        //     />
        // </div>
        <>
            {text ? (
                <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-white">
                    <div className="absolute top-[4rem] flex h-[calc(100%-4rem)] w-full items-center justify-center">
                        <div className="mr-2 text-lg text-black">
                            Tunggu sebentar...
                        </div>
                        <MoonLoader
                            color={color}
                            loading={true}
                            size={size}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </div>
            ) : (
                <MoonLoader
                    color={color}
                    loading={true}
                    size={size}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            )}
        </>
    )
}

export default LoadingSpinner
