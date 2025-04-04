import React, { useState } from 'react';
import { RiMenu2Line } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";


export default function DashboardNavbar() {
    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='w-[100%] lg:z-50  fixed bg-[rgb(214,222,228)]'>
        <div className={`max-w-[1400px] z-[50] flex mx-auto  box-sizing h-[5rem] border-b-2 items-center `}>
            <div className='w-[1400px] flex justify-between items-center h-[5rem]'>
                  <div className='flex items-center h-[5rem] mt-3 text-[2rem] font-bold ml-6 cursor-pointer' >
                          <span className='bg-[black] p-1 mb-2 rounded-lg text-[white]' >Rent</span> <span className=''>Ify</span>
                      </div>
                      <div className={`h-[6rem] items-center mr-6 ${menuOpen?'hidden':'flex'} lg:hidden ease-in-out transition-h duration-500 cursor-pointer`} onClick={()=>setMenuOpen(true)}>
                          <RiMenu2Line className='w-[50px] h-[50px]'/>
                      </div>
                      <div className={`h-[6rem] items-center mr-6 ${menuOpen?'flex':'hidden'} lg:hidden ease-in-out transition-all duration-500 cursor-pointer`} onClick={()=>setMenuOpen(false)}>
                          <RxCross2 className='w-[50px] h-[50px]'/>
                      </div>
                    </div>
            </div>
        </div>
  );

}
