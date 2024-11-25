"use client";

import { IModule } from '@/shared/interfaces/IModule';
import Image from "next/image";
import Link from 'next/link';

interface NavParams {
    modules: IModule[]
}

export const Nav = ({modules} : NavParams) => {
  return (
    <aside className="w-full ">
     <div className='flex justify-center align-middle'>
     <Image
        src="/images/logo.png"
        alt="Principal logo for Rental Cars App"
        width={150}
        height={150}
        className="object-contain"
        priority
      />
     </div>
      {(modules?? []).map((module : IModule) => {
        return (
           <Link
            className='flex m-4 p-2 hover:rounded-md  hover:bg-gray-100' key={module.name}
            href={module.name.toLowerCase() == 'dashboard' ? '/dashboard' : `/dashboard/${module.name.toLowerCase()}/view`}
          >
            <span>{module.name}</span>
          </Link>
        );
      })}
    </aside>
  );
};
