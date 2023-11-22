'use client'

import { useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import Item from "./Item";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import DocumentsList from "./DocumentsList";

import { RxDoubleArrowLeft } from "react-icons/rx";
import { IoSearchSharp, IoSettingsOutline } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";
import { AiOutlineTeam } from "react-icons/ai";
import { TbTemplate  } from "react-icons/tb";
import { FaCirclePlus } from "react-icons/fa6";
import { PiArrowsClockwiseThin } from "react-icons/pi";
import { TfiImport } from "react-icons/tfi";
import { BsFillTrash2Fill } from "react-icons/bs";

export default function SideBar() {
  const [open, setOpen] = useState(true);
  const { user } = useUser();

  const create = useMutation(api.documents.create);

  const handelCreate = () => {
    const promise = create({ title: "untitled" });

    toast.promise(promise, {
      loading: "Creating a new Note...",
      success: "New note created.",
      error: "Failed to create a new note.",
      duration: 1000,
    });
  };

  const descriptionhandeler = (string: string, n: number) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  return (
    <div className="bg-gray-50 border-r-[1px] border-base-200 relative h-full">
      <div
        className={`bg-dark-purple h-screen p-1 pt-3 relative duration-300 
        ${open ? "w-56" : "w-16"} 
        ${open && "transition-all ease-in-out duration-700"} 
        ${!open && "transition-all ease-in-out duration-700"}`}
      >
        <RxDoubleArrowLeft
          className={`absolute cursor-pointer -right-4 top-[30px] w-7 border-base-200
          border-2 rounded-full bg-base-100 hover:bg-base-300 ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex items-center justify-center hover:bg-base-200 mt-1 py-1 rounded-md gap-2">
          <div
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          >
            <UserButton afterSignOutUrl="/" />
          </div>
          <span className={`cursor-pointer text-sm ${!open && "hidden"}`}>
            {descriptionhandeler(`${user?.fullName}`, 13)}
          </span>
          <PiArrowsClockwiseThin
            className={`cursor-pointer text-sm ${!open && "hidden"}`}
          />
        </div>
        <div className="mt-2">
          <Item
            label="Search"
            isSearch
            onClick={() => {}}
            open={open}
            icon={IoSearchSharp}
          />
          <Item label="Updates" open={open} icon={LuClock3} />
          <Item label="Settings" open={open} icon={IoSettingsOutline} />
          <Item
            onClick={handelCreate}
            label="New Page"
            open={open}
            icon={FaCirclePlus}
          />
        </div>
        <div className="mt-4">
          <DocumentsList open={open} />
        </div>
        <div className="mt-7">
          <Item label="Create a Teamspace" open={open} icon={AiOutlineTeam} />
          <Item label="Template" open={open} icon={TbTemplate} />
          <Item label="Import" open={open} icon={TfiImport} />
          <Item label="Trash" open={open} icon={BsFillTrash2Fill} />
        </div>
      </div>
    </div>
  );
}
