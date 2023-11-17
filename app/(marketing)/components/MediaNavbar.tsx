'use client'

import React, { useState } from 'react'
import { IoIosMenu, IoMdClose } from "react-icons/io";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import { GetNotionFree, Getnotionlogin } from './Buttons';

function Icon({ id, open }: { id: number, open: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    ); 
}

function MediaNavbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value: React.SetStateAction<number>) => setOpen(open === value ? 0 : value);

    return (
        <div className='4xl:hidden'>
            {!isOpen ? (<button className='me-4' onClick={() => setIsOpen(true)}>
                <IoIosMenu className='text-[26px] text-base-content' />
            </button>) :
                (<button className='me-4' onClick={() => setIsOpen(false)}>
                    <IoMdClose className='text-[26px] text-base-content' />
                </button>)}
            {isOpen ? <div className='absolute left-0 top-[62px] w-full h-full bg-base-100 max-h-max px-3'>
                <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
                    <AccordionHeader className='MediaNavAccor' onClick={() => handleOpen(1)}>Products</AccordionHeader>
                    <AccordionBody>
                        <ul tabIndex={1} className="menu menu-sm z-[1] -mt-5 bg-transparent w-full min-w-full">
                            <li><a className='text-base-content'>Homepage</a></li>
                            <li><a className='text-base-content'>Portfolio</a></li>
                            <li><a className='text-base-content'>About</a></li>
                        </ul>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
                    <AccordionHeader className='MediaNavAccor' onClick={() => handleOpen(2)}>Solutions</AccordionHeader>
                    <AccordionBody>
                        <ul tabIndex={2} className="menu menu-sm z-[1] -mt-5 bg-transparent w-full min-w-full">
                            <li><a className='text-base-content'>Homepage</a></li>
                            <li><a className='text-base-content'>Portfolio</a></li>
                            <li><a className='text-base-content'>About</a></li>
                        </ul>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
                    <AccordionHeader className='MediaNavAccor' onClick={() => handleOpen(3)}>Resources</AccordionHeader>
                    <AccordionBody>
                        <ul tabIndex={3} className="menu menu-sm z-[1] -mt-5 bg-transparent w-full min-w-full">
                            <li><a className='text-base-content'>Homepage</a></li>
                            <li><a className='text-base-content'>Portfolio</a></li>
                            <li><a className='text-base-content'>About</a></li>
                        </ul>
                    </AccordionBody>
                </Accordion>
                <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
                    <AccordionHeader className='MediaNavAccor' onClick={() => handleOpen(4)}>Downlode</AccordionHeader>
                    <AccordionBody>
                        <ul tabIndex={4} className="menu menu-sm z-[1] -mt-5 bg-transparent w-full min-w-full">
                            <li><a className='text-base-content'>Homepage</a></li>
                            <li><a className='text-base-content'>Portfolio</a></li>
                            <li><a className='text-base-content'>About</a></li>
                        </ul>
                    </AccordionBody>
                </Accordion>
                <div className='border-t-[1px] border-base-300'>
                    <button className='my-4 font-bold text-sm w-full min-w-full text-start'>Pricing</button>
                </div>
                <div className='border-t-[1px] border-b-[1px] border-base-300'>
                    <button className='my-4 font-bold text-sm w-full min-w-full text-start'>Request a Demo</button>
                </div>
                <div className='mt-7'>
                    <button className='w-full min-w-full bg-base-content text-sm font-bold text-base-100 py-2 rounded-md cursor-pointer'>Get Notion Free</button>
                </div>
                <div className='mt-4'>
                    <button className='w-full min-w-full border border-gray-500 text-sm font-bold text-base-content py-2 rounded-md cursor-pointer'>Login</button>
                </div>
            </div> : null}
        </div>
    )
}

export default MediaNavbar