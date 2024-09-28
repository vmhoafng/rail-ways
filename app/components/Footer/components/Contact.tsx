import Image from 'next/image'
import React from 'react'

const Contact = () => {
    return (
        <section className="flex items-center justify-center bg-[#ecfaf6] py-12">
            <div className="flex w-full grid-cols-3 flex-col gap-6 px-3 sm:max-w-[540px] lg:mx-auto lg:grid lg:max-w-[1140px] lg:px-10 xl:px-0 2xl:max-w-[1440px]">
                <div>
                    <p className="pb-4 text-[#69696b]">
                        Gửi câu hỏi cho chúng tôi
                    </p>
                    <h6 className="text-lg font-semibold text-[#041686]">
                        phongghidanhtruongan@gmail.com
                    </h6>
                </div>
                <div>
                    <p className="pb-4 text-[#69696b]">
                        Gọi ngay đường dây nóng
                    </p>
                    <h6 className="text-lg font-semibold text-[#041686]">
                        0938.975.269
                    </h6>
                </div>
                <div className="p flex items-center gap-3">
                    <a
                        href=""
                        className="flex h-11 w-11 items-center justify-center rounded-full border"
                    >
                        <Image
                            src={'/favicon.ico'}
                            alt=""
                            height={22}
                            width={22}
                        />
                    </a>
                    <a
                        href=""
                        className="flex h-11 w-11 items-center justify-center rounded-full border"
                    >
                        <Image
                            src={'/favicon.ico'}
                            alt=""
                            height={22}
                            width={22}
                        />
                    </a>
                    <a
                        href=""
                        className="flex h-11 w-11 items-center justify-center rounded-full border"
                    >
                        <Image
                            src={'/favicon.ico'}
                            alt=""
                            height={22}
                            width={22}
                        />
                    </a>
                    <a
                        href=""
                        className="flex h-11 w-11 items-center justify-center rounded-full border"
                    >
                        <Image
                            src={'/favicon.ico'}
                            alt=""
                            height={22}
                            width={22}
                        />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Contact
