import React, { useState } from 'react'
import Arrow from './assets/icon'
import { GiMammoth } from "react-icons/gi";
import { Data } from '../data';

const Sidemenu = () => {
  
  //State
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('')

   return (
    <>
      <nav
        id="sidenav-1"
        className="absolute left-0 top-0 z-[1035] h-full w-[300px] overflow-hidden bg-[#070926] shadow-[0_4px_12px_0_rgba(0,0,0,0.07),_0_2px_4px_rgba(0,0,0,0.05)] dark:bg-zinc-800"

      >
        <ul
          className="relative m-0"
        >
          {Data?.map((items, index) => {
            return (
              <>
                <li className="relative" onClick={() => {
                  setOpen(true)
                  setSelected(items.key)
                }} key={items.key}>
                  <a
                    className="h-12 flex gap-3 cursor-pointer items-center truncate  px-6 py-3 text-base text-white outline-none transition duration-300 ease-linear hover:bg-[#3ca3dc] hover:text-white hover:outline-none"
                  >
                    <GiMammoth />
                    <label className='w-full cursor-pointer'>{items.label}</label>
                    <span
                      className={`${open === true && selected === items.key ? "rotate-180" : null} absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300`}
                    >
                      <Arrow />
                    </span>
                  </a>
                  <ul
                    className={`${open === true && selected === items.key ? "block" : "hidden"} relative m-0 p-0 list-disc list-style-position: outside`}
                  >
                    {items?.nodes[0]?.nodes?.map((value) => {
                      return (
                        <li className="relative">
                          <a
                            className="h-12 flex gap-3 cursor-pointer items-center truncate  px-6 py-3 text-base text-white outline-none transition duration-300 ease-linear hover:bg-[#3ca3dc] hover:text-white hover:outline-none pl-[3.1rem]"
                            href={value?.url} target='blank'
                          >

                            <label className='w-full cursor-pointer relative'>{value?.label}</label>
                            {value?.length > 0 ?
                              <span
                                className="absolute right-0 ml-auto mr-[0.8rem] transition-transform duration-300 "
                              >
                                <Arrow />
                              </span> : null}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              </>
            )
          })}
        </ul>
      </nav>
    </>

  )
}

export default Sidemenu