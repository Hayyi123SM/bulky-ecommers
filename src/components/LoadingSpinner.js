import Image from "next/image"
import Link from "next/link"
import { MoonLoader } from "react-spinners"

function LoadingSpinner({
    text = true,
    color = "#FFCF02",
    size = 30,
    isError = false,
    isSuccess = false,
    backToUrl = "/",
    textSuccess,
    textFailure,
}) {
    const renderContent = () => {
        if (isSuccess) {
            return (
                <div className="z-50 flex min-h-screen items-center justify-center bg-white">
                    <Image
                        src="/sucess.svg"
                        width={150}
                        height={80}
                        alt="Logo"
                        priority={false}
                    />
                    <div className="ml-5 text-left">
                        <div className="text-2xl font-semibold text-[#212121]">
                            {textSuccess}
                        </div>
                        <div className="text-sm text-[#007185]">
                            Redirect in a second ...
                        </div>
                    </div>
                </div>
            )
        } else if (isError) {
            return (
                <div className="z-50 flex min-h-screen items-center justify-center bg-white">
                    <Image
                        src="/failed.svg"
                        width={150}
                        height={80}
                        alt="Logo"
                        priority={false}
                    />
                    <div className="ml-5 text-left">
                        <div className="text-2xl font-semibold text-[#212121]">
                            {textFailure}
                        </div>
                        <Link
                            href={backToUrl}
                            className="text-sm text-[#007185]">
                            Back to ...
                        </Link>
                    </div>
                </div>
            )
        } else if (text) {
            return (
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
            )
        }

        return (
            <MoonLoader
                color={color}
                loading={true}
                size={size}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        )
    }

    return <>{renderContent()}</>
}

export default LoadingSpinner
