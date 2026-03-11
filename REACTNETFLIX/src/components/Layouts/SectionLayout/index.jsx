import React from 'react'

// children dibawah ini didapat dari file src/components/SectionEnjoy.jsx
const SectionLayout = ({ children }) => {
    return (
        <section className='relative bg-black text-white w-full'>
            <div className='grid sm:grid-cols-2 mx-auto  max-w-7xl  justify-center items-center py-16 gap-16 text-center sm:text-left'>
                {children}
            </div>
            <div className='bg-stone-900 w-full absolute top-0 left-0 h-2'></div>
        </section>
    )
}

export default SectionLayout