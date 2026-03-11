import React from 'react'
import DefaultButton from '@/components/modules/LandingPage/DefaultButton'
import EachUtils from '@/utils/EachUtils'

import { useAtom } from 'jotai'
import { emailAtom, languageAtom } from '@/jotai/atoms'
import { LIST_CTA_ID, LIST_CTA_EN } from '@/constants/listCTA'
import { useNavigate } from 'react-router-dom'

const InputMembership = () => {
    const navigate = useNavigate()
    const [language] = useAtom(languageAtom)
    const [, setEmail] = useAtom(emailAtom)

    const handleEmail = (e) => {
        e.preventDefault()

        navigate("/register")
    }

    return (
        <form>
            <EachUtils
                of={language == "en" ? LIST_CTA_EN : LIST_CTA_ID}
                render={(item, index) => (
                    <div key={index}>
                        <h3 className='text-white text-xl'>{item.title}</h3>
                        <div className='relative flex justify-center items-center gap-3 py-4'>
                            <input
                                type='email'
                                placeholder={item.labelInput}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full p-4 bg-black/50 rounded-md border  border-white/50 peer placeholder-transparent focus:border-white focus:outline-none'
                            />
                            <label
                                className='absolute left-0 pl-4 text-gray-400 pointer-events-none transition-all z-10 top-[17px] text-sm peer-placeholder-shown:top-8 peer-placeholder-shown:text-lg peer-focus:top-[13px] peer-focus:text-sm'
                            >
                                {item.labelInput}
                            </label>
                            <DefaultButton
                                onClick={handleEmail}
                                text={item.buttonSubmit} isArrowIcon={true}
                                styles="flex py-4 w-1/2 flex justify-center items-center gap-2 text-xl cursor-pointer"
                            />
                        </div>
                    </div>
                )}
            />
        </form>
    )
}

export default InputMembership