import { JUMBOTRON_IMAGE } from '@/constants/listAsset'
import { emailAtom } from '@/jotai/atoms'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { GoChevronLeft } from 'react-icons/go'
import { useNavigate } from 'react-router-dom'
import { auth } from "@/utils/firebase"
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"
import { ToastContainer, toast, Slide } from 'react-toastify';
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import { apiInstanceExpress } from '@/utils/apiInstance'


const Register = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useAtom(emailAtom)
    const [password, setPassword] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault()

        try {
            setIsLoading(true)

            const register = await createUserWithEmailAndPassword(auth, email, password)

            if (register) {
                await signOut(auth)
                const addUser = await apiInstanceExpress.post('sign-up', { email, password })
                if (addUser.status === 201) {
                    toast.success("REGISTER SUCCESS!")
                    setTimeout(() => {
                        setIsLoading(false)
                        navigate("/login")
                    }, 2000)
                }
            }
        } catch (error) {
            setIsLoading(false);
            // Membuang kalimat 'auth/' dan mengganti semua tanda strip (-) menjadi spasi " " agar teks lebih rapi
            const cleanMessage = error.code.replace('auth/', '').replaceAll('-', ' ')

            toast.error(cleanMessage)
            // Hasilnya: "invalid credential" atau "invalid email bukan auth/invalid-email atau auth/invalid-credential"
        }
    }

    return (
        <DefaultLayout>
            <ToastContainer
                position='top-center'
                theme='colored' // <--- UBAH JADI COLORED
                autoClose={2000}
                hideProgressBar={true}
                transition={Slide}
                newestOnTop={true}
                closeOnClick
                pauseOnHover={false}
                // Hapus bg-black nya supaya warna warninya muncul!
                toastClassName="backdrop-blur-md border border-white/20 rounded-lg shadow-2xl font-semibold"
            />
            <img
                src={JUMBOTRON_IMAGE}
                className='w-full h-[100vh] object-cover opacity-70'
            />
            <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-black/80 px-8 py-16 rounded-xl max-w-xl w-full'>
                <form className='flex flex-col gap-4'>
                    <div
                        className='text-xl font-semibold mb-2 flex items-center gap-2'
                    >
                        <GoChevronLeft
                            onClick={() => navigate("/")}
                            size={28}
                            className='text-slate-300 hover:text-white cursor-pointer'
                        />
                        <h3>Sign Up</h3>
                    </div>
                    <div className='relative'>
                        <input
                            placeholder="Email"
                            type='email'
                            value={email ? email : ""}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-full p-4 bg-black/50 rounded-md border-white/50 peer placeholder-transparent'
                        />
                        <label
                            className='absolute left-0 pl-4 -top-[6px] peer-placeholder-shown:top-3.5 peer-focus:-top-[6px] transition-all text-lg -z-10'
                        >Email
                        </label>
                    </div>
                    <div className='relative'>
                        <input
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            className='w-full p-4 bg-black/50 rounded-md border-white/50 peer placeholder-transparent'
                        />
                        <label
                            className='absolute -top-[6px] left-0 pl-4 peer-placeholder-shown:top-3.5 peer-focus:-top-[6px] transition-all text-lg -z-10'
                        >Password
                        </label>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <button
                            onClick={handleRegister}
                            disabled={isLoading}
                            className='bg-red-500 py-3 w-full text-white font-bold rounded-md cursor-pointer disabled:bg-red-400 disabled:cursor-wait'
                        >
                            {isLoading ? "Memeriksa Akun.." : "Sign Up"}
                        </button>
                        <p>Already Have An Account?
                            <span
                                className='text-blue-500 underline cursor-pointer ml-2'
                                onClick={() => navigate("/login")}
                            >
                                Sign In Here
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    )
}

export default Register