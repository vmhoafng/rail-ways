import Image from 'next/image'
import React from 'react'

const Suggestion = () => {
    return (
        <section>
            <div className="mb-5 text-xl font-bold text-[#041686]">
                Bài viết hữu ích
            </div>
            <ul className="flex flex-col gap-2">
                <li>
                    <article className="flex">
                        <a
                            href="https://laixetruongan.com.vn/hoc-bang-lai-xe-hang-c-bao-nhieu-tien/"
                            className=""
                        >
                            <Image
                                loading="lazy"
                                src="/"
                                width="80"
                                height="80"
                                alt="Học bằng lái xe hạng c bao nhiêu tiền?"
                            />
                        </a>
                        <div className="pl-4">
                            <h5 className="">
                                <a
                                    href="https://laixetruongan.com.vn/hoc-bang-lai-xe-hang-c-bao-nhieu-tien/"
                                    data-number-line="2"
                                >
                                    Học bằng lái xe hạng c bao nhiêu tiền?
                                </a>
                            </h5>
                            <div className="mt-1">
                                <span className="">Th12 19, 2023</span>
                            </div>
                        </div>
                    </article>
                </li>
                <li>
                    <article className="flex">
                        <a
                            href="https://laixetruongan.com.vn/hoc-bang-lai-xe-hang-c-bao-nhieu-tien/"
                            className=""
                        >
                            <Image
                                loading="lazy"
                                src="/"
                                width="80"
                                height="80"
                                alt="Học bằng lái xe hạng c bao nhiêu tiền?"
                            />
                        </a>
                        <div className="pl-4">
                            <h5 className="">
                                <a
                                    href="https://laixetruongan.com.vn/hoc-bang-lai-xe-hang-c-bao-nhieu-tien/"
                                    data-number-line="2"
                                >
                                    Học bằng lái xe hạng c bao nhiêu tiền?
                                </a>
                            </h5>
                            <div className="mt-1">
                                <span className="">Th12 19, 2023</span>
                            </div>
                        </div>
                    </article>
                </li>
                <li>
                    <article className="flex">
                        <a
                            href="https://laixetruongan.com.vn/hoc-bang-lai-xe-hang-c-bao-nhieu-tien/"
                            className=""
                        >
                            <Image
                                loading="lazy"
                                src="/"
                                width="80"
                                height="80"
                                alt="Học bằng lái xe hạng c bao nhiêu tiền?"
                            />
                        </a>
                        <div className="pl-4">
                            <h5 className="">
                                <a
                                    href="https://laixetruongan.com.vn/hoc-bang-lai-xe-hang-c-bao-nhieu-tien/"
                                    data-number-line="2"
                                >
                                    Học bằng lái xe hạng c bao nhiêu tiền?
                                </a>
                            </h5>
                            <div className="mt-1">
                                <span className="">Th12 19, 2023</span>
                            </div>
                        </div>
                    </article>
                </li>
            </ul>
        </section>
    )
}

export default Suggestion
