'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '../../../public/logo.png'
import { FaAngleDown, FaAngleUp } from "react-icons/fa6"
import MediaNavbar from './MediaNavbar'
import { GetDemo, GetNotionFree, GetPricing, Getnotionlogin } from './Buttons'

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`navbar bg-base-100 fixed top-0 z-50 px-2 5xl:px-4 6xl:container 6xl:mx-auto ${scrolled && 'border-b-[1px] border-b-base-300 shadow-sm'}`}>
      <div className="navbar-start">
        <div className='flex gap-2 me-5'>
          <Image src={logo} alt="logo/img" width={40} height={40} />
          <span className='capitalize font-bold text-md mt-2'>notion</span>
        </div>
        <div className='hidden 4xl:block'>
          <div className="dropdown dropdown-hover">
            <label tabIndex={0} className="hover:bg-base-200 text-sm px-3 py-1 rounded-md cursor-pointer group flex gap-[6px]">
              Products
              <span className='mt-1'>
                <FaAngleDown className='block group-hover:hidden text-base-content text-[12px]' />
                <FaAngleUp className='hidden group-hover:block text-base-content text-[12px]' />
              </span>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-[2px] z-[1] p-2 shadow bg-white rounded-md w-52">
              <li><a className='text-base-content'>Wikis</a></li>
              <li><a className='text-base-content'>Projects</a></li>
              <li><a className='text-base-content'>Docs</a></li>
              <li><a className='text-base-content'>Notion AI</a></li>
            </ul>
          </div>
        </div>
        <div className='hidden 4xl:block'>
          <div className="dropdown dropdown-hover">
            <label tabIndex={1} className="hover:bg-base-200 text-sm px-3 py-1 rounded-md cursor-pointer group flex gap-[6px]">
              Download
              <span className='mt-1'>
                <FaAngleDown className='block group-hover:hidden text-base-content text-[12px]' />
                <FaAngleUp className='hidden group-hover:block text-base-content text-[12px]' />
              </span>
            </label>
            <ul tabIndex={1} className="menu menu-sm dropdown-content mt-[2px] z-[1] p-2 shadow bg-white rounded-md w-52">
              <li><a className='text-base-content'>IOS & Android</a></li>
              <li><a className='text-base-content'>Mac & Windows</a></li>
              <li><a className='text-base-content'>Web Clipper</a></li>
            </ul>
          </div>
        </div>
        <div className='hidden 4xl:block'>
          <div className="dropdown dropdown-hover">
            <label tabIndex={2} className="hover:bg-base-200 text-sm px-3 py-1 rounded-md cursor-pointer group flex gap-[6px]">
              Solutions
              <span className='mt-1'>
                <FaAngleDown className='block group-hover:hidden text-base-content text-[12px]' />
                <FaAngleUp className='hidden group-hover:block text-base-content text-[12px]' />
              </span>
            </label>
            <ul tabIndex={2} className="menu menu-sm dropdown-content mt-[2px] z-[1] p-2 shadow bg-white rounded-md w-52">
              <li><a className='text-base-content'>Enterprise</a></li>
              <li><a className='text-base-content'>Small Buisness</a></li>
              <li><a className='text-base-content'>Personal</a></li>
            </ul>
          </div>
        </div>
        <div className='hidden 4xl:block'>
          <div className="dropdown dropdown-hover">
            <label tabIndex={3} className="hover:bg-base-200 text-sm px-3 py-1 rounded-md cursor-pointer group flex gap-[6px]">
              Resources
              <span className='mt-1'>
                <FaAngleDown className='block group-hover:hidden text-base-content text-[12px]' />
                <FaAngleUp className='hidden group-hover:block text-base-content text-[12px]' />
              </span>
            </label>
            <ul tabIndex={3} className="menu menu-sm dropdown-content mt-[2px] z-[1] p-2 shadow bg-white rounded-md w-52">
              <li><a className='text-base-content'>Blogs</a></li>
              <li><a className='text-base-content'>Guids & Tutorial</a></li>
              <li><a className='text-base-content'>Webinar</a></li>
              <li><a className='text-base-content'>Help Center</a></li>
              <li><a className='text-base-content'>API Docs</a></li>
              <li><a className='text-base-content'>Community</a></li>
              <li><a className='text-base-content'>Find a Consultant</a></li>
            </ul>
          </div>
        </div>
        <GetPricing />
      </div>
      <div className="navbar-end">
        <div className='hidden 4xl:block'>
          <div className='flex gap-1'>
            <div className='flex gap-4'>
              <GetDemo />
              <div className=' text-xl text-base-content font-extralight mt-1'>|</div>
              <div className='flex gap-1'>
                <Getnotionlogin />
                <GetNotionFree />
              </div>
            </div>
          </div>
        </div>
        <MediaNavbar />
      </div>
    </div>
  )
}

export default Navbar

function useNavScrollEffect() {
  throw new Error('Function not implemented.')
}
