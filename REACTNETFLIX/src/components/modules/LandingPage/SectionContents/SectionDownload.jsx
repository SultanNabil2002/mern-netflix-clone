import React from 'react'
import SectionLayout from '@layouts/SectionLayout'
import EachUtils from '@/utils/EachUtils'

import { useAtom } from 'jotai'
import { languageAtom } from '@/jotai/atoms'
import { DOWNLOAD_COVER_IMAGE, DOWNLOAD_PHONE_IMAGE } from '@/constants/listAsset'
import { LIST_CONTENT_2_ID, LIST_CONTENT_2_EN } from '@/constants/listContent'

const SectionDownload = () => {
    const [language] = useAtom(languageAtom)

    return (
        <SectionLayout>
            <div className='relative max-w-xl mx-auto'>
                <img
                    src={DOWNLOAD_PHONE_IMAGE}
                    alt=""
                    className='relative'
                />
                <div className='absolute bottom-8 left-0 left-1/2 -translate-x-1/2 bg-black border border-white flex item-center rounded-xl py-2 px-4 w-[60%] gap-4'>
                    <img
                        src={DOWNLOAD_COVER_IMAGE}
                        alt=""
                        className='max-h-20'
                    />
                    <div className='flex flex-col text-left'>
                        <p className='font-bold'>Stranger Things</p>
                        <p className='text-blue-400 font-semibold'>Downloading...</p>
                    </div>
                </div>
            </div>
            <EachUtils
                of={language == 'en' ? LIST_CONTENT_2_EN : LIST_CONTENT_2_ID}
                render={(item, index) => (
                    <div key={index}>
                        <h2 className='text-5xl font-black'>{item.title}</h2>
                        <p className='text-2xl mt-4'>{item.desc}</p>
                    </div>
                )}
            />
        </SectionLayout>
    )
}

export default SectionDownload