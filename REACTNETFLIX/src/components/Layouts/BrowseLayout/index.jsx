import Loading from '@/components/modules/Elements/Loading'
import { emailStorageAtom, tokenAtom } from '@/jotai/atoms'
import Navbar from '@/pages/Browse/Navbar'
import { auth } from '@/utils/firebase'
import { useAtom } from 'jotai'
import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth"

// children dibawah di isi dari apapun child di function Browse di file path ini src/pages/browse/index.js dan pages/watch/index
const BrowseLayout = ({ children }) => {
    const [user, loading, error] = useAuthState(auth)
    const [emailStorage] = useAtom(emailStorageAtom)
    const [tokenStorage] = useAtom(tokenAtom)

    if (loading) return <Loading />

    if (error) return <p>error...</p>

    if (!user && !emailStorage && !tokenStorage) return location.replace("/")

    return (
        <>
            <Navbar />
            <div>
                {children}
            </div>
        </>
    )
}

export default BrowseLayout