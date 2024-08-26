import Navbar from "@/components/Navbar"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { Suspense } from "react"

function PrivacyPolicy() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <div className="hidden lg:block">
                    <Navbar />
                </div>
                <div className="flex items-center border-[#F0F3F7] px-4 py-3 lg:hidden">
                    <ArrowLeftIcon className="h-6 w-6" />
                    <div className="ml-2 font-semibold">Kebijakan Privasi</div>
                </div>
                <div className="min-h-screen">
                    <div className="mx-auto hidden max-w-7xl lg:block">
                        <div className="px-7 pb-1 pt-12 text-2xl font-bold">
                            Kebijakan Privasi
                        </div>
                        <div className="px-7 text-[#007185]">
                            <Link href="/profile" className="cursor-pointer">
                                Home
                            </Link>{" "}
                            / Kebijakan Privasi
                        </div>
                    </div>
                    <div className="border-b border-[#F0F3F7] lg:mt-6"> </div>
                    <div className="mx-auto flex max-w-7xl lg:px-[176px]">
                        <div className="lg:p-7">
                            <div className="items-center rounded-xl bg-white px-12 py-10 shadow">
                                <div className="text-2xl font-bold">
                                    Kebijakan Privasi Bulky
                                </div>
                                <div className="mb-8 mt-4 text-sm font-normal leading-6 opacity-80">
                                    At Bulky, accessible from
                                    https://www.bulky.co.id/, one of our main
                                    priorities is the privacy of our visitors.
                                    This Privacy Policy document contains types
                                    of information that is collected and
                                    recorded by Liquid8 and how we use it. If
                                    you have additional questions or require
                                    more information about our Privacy Policy,
                                    do not hesitate to contact us.
                                </div>
                                <div className="text-2xl font-bold">
                                    Log Files
                                </div>
                                <div className="mb-8 mt-4 text-sm font-normal leading-6 opacity-80">
                                    Bulky follows a standard procedure of using
                                    log files. These files log visitors when
                                    they visit websites. All hosting companies
                                    do this and a part of hosting services'
                                    analytics. The information collected by log
                                    files include internet protocol (IP)
                                    addresses, browser type, Internet Service
                                    Provider (ISP), date and time stamp,
                                    referring/exit pages, and possibly the
                                    number of clicks. These are not linked to
                                    any information that is personally
                                    identifiable. The purpose of the information
                                    is for analyzing trends, administering the
                                    site, tracking users' movement on the
                                    website, and gathering demographic
                                    information.
                                </div>
                                <div className="text-2xl font-bold">
                                    Cookies and Web Beacons
                                </div>
                                <div className="mb-8 mt-4 text-sm font-normal leading-6 opacity-80">
                                    Like any other website, Bulky uses
                                    “cookies”. These cookies are used to store
                                    information including visitors' preferences,
                                    and the pages on the website that the
                                    visitor accessed or visited. The information
                                    is used to optimize the users' experience by
                                    customizing our web page content based on
                                    visitors' browser type and/or other
                                    information.
                                </div>
                                <div className="text-2xl font-bold">
                                    Privacy Policies
                                </div>
                                <div className="mb-4 mt-4 text-sm font-normal leading-6 opacity-80">
                                    You may consult this list to find the
                                    Privacy Policy for each of the advertising
                                    partners of Bulky.
                                </div>
                                <div className="mb-4 mt-4 text-sm font-normal leading-6 opacity-80">
                                    Third-party ad servers or ad networks uses
                                    technologies like cookies, JavaScript, or
                                    Web Beacons that are used in their
                                    respective advertisements and links that
                                    appear on Bulky, which are sent directly to
                                    users' browser. They automatically receive
                                    your IP address when this occurs. These
                                    technologies are used to measure the
                                    effectiveness of their advertising campaigns
                                    and/or to personalize the advertising
                                    content that you see on websites that you
                                    visit.
                                </div>
                                <div className="mb-8 mt-4 text-sm font-normal leading-6 opacity-80">
                                    Note that Bulky has no access to or control
                                    over these cookies that are used by
                                    third-party advertisers.
                                </div>
                                <div className="text-2xl font-bold">
                                    Third Party Privacy Policies
                                </div>
                                <div className="mb-4 mt-4 text-sm font-normal leading-6 opacity-80">
                                    Bulky's Privacy Policy does not apply to
                                    other advertisers or websites. Thus, we are
                                    advising you to consult the respective
                                    Privacy Policies of these third-party ad
                                    servers for more detailed information. It
                                    may include their practices and instructions
                                    about how to opt-out of certain options.
                                </div>
                                <div className="mb-8 mt-4 text-sm font-normal leading-6 opacity-80">
                                    You can choose to disable cookies through
                                    your individual browser options. To know
                                    more detailed information about cookie
                                    management with specific web browsers, it
                                    can be found at the browsers' respective
                                    websites. What Are Cookies?
                                </div>
                                <div className="text-2xl font-bold">
                                    Children's Information
                                </div>
                                <div className="mb-4 mt-4 text-sm font-normal leading-6 opacity-80">
                                    Another part of our priority is adding
                                    protection for children while using the
                                    internet. We encourage parents and guardians
                                    to observe, participate in, and/or monitor
                                    and guide their online activity.
                                </div>
                                <div className="mb-8 mt-4 text-sm font-normal leading-6 opacity-80">
                                    Bulky does not knowingly collect any
                                    Personal Identifiable Information from
                                    children under the age of 13. If you think
                                    that your child provided this kind of
                                    information on our website, we strongly
                                    encourage you to contact us immediately and
                                    we will do our best efforts to promptly
                                    remove such information from our records.
                                </div>
                                <div className="text-2xl font-bold">
                                    Online Privacy Policy Only
                                </div>
                                <div className="mb-8 mt-4 text-sm font-normal leading-6 opacity-80">
                                    This Privacy Policy applies only to our
                                    online activities and is valid for visitors
                                    to our website with regards to the
                                    information that they shared and/or collect
                                    in Bulky. This policy is not applicable to
                                    any information collected offline or via
                                    channels other than this website.
                                </div>
                                <div className="text-2xl font-bold">
                                    Consent
                                </div>
                                <div className="mb-4 mt-4 text-sm font-normal leading-6 opacity-80">
                                    By using our website, you hereby consent to
                                    our Privacy Policy and agree to its Terms
                                    and Conditions.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        </Suspense>
    )
}

export default PrivacyPolicy
