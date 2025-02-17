"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { useSession } from "next-auth/react";
import {
  handleDocumentAction,
  handleFavorite,
} from "@/actions/document";

import { FiLink } from "react-icons/fi";
import { CiCircleCheck, CiTrash } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { ImFileText2 } from "react-icons/im";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { GoArrowUpRight, GoStar } from "react-icons/go";
import Link from "next/link";
import { DocumentInput } from "./document-input";

interface DocumentMenuProps {
  children: React.ReactNode;
  documentId: string;
  documentTitle: string;
  documentIcon: string | undefined;
  isArchived: boolean | undefined;
  isFavorite: boolean | undefined;
  url: string | null | undefined;
}

export const DocumentMenu = ({
  children,
  documentId,
  documentTitle,
  documentIcon,
  isArchived,
  isFavorite,
  url,
}: DocumentMenuProps) => {
  const [copied, setCopied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRenameInputActive, setIsRenameInputActive] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const { data } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.body.addEventListener("click", handleOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  if (!data) return <p>Loading...</p>;

  const handleFavoriteDoc = () => {
    handleFavorite(documentId)
      .then((data) => {
        if (data.success) return toast.success(data.success);
        if (data.error) return toast.error(data.error);
      })
      .finally(() => {
        router.refresh();
        setIsMenuOpen(false);
      });
  };

  const handleDeleteDoc = () => {
    handleDocumentAction("archive", documentId)
      .then((data) => {
        if (data.success) return toast.success(data.success);
        if (data.error) return toast.error(data.error);
      })
      .finally(() => {
        router.refresh();
      });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url!);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="relative h-5 w-5" ref={menuRef}>
      <button onClick={() => setIsMenuOpen((prev) => !prev)}>{children}</button>
      {isMenuOpen && (
        <div className="absolute top-[20%] left-[95%] mt-2 w-72 bg-secondary border border-primary/10 shadow-md rounded-md z-50">
          <div className="py-2">
            {documentIcon ? (
              <div className="flex items-center px-4 py-2 text-sm text-gray-600">
                {documentIcon}
                <span className="truncate ml-2 font-medium">
                  {documentTitle}
                </span>
              </div>
            ) : (
              <div className="flex items-center px-4 py-2 text-sm text-gray-600">
                <ImFileText2 className="w-4 h-4" />
                <span className="truncate ml-2 font-medium">
                  {documentTitle}
                </span>
              </div>
            )}
            <hr className="border-gray-200" />
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-primary/5"
              onClick={handleFavoriteDoc}
            >
              {isFavorite ? (
                <FaStar className="w-4 h-4" />
              ) : (
                <GoStar className="w-4 h-4" />
              )}
              <span className="ml-2">
                {isFavorite ? "Remove from Favorite" : "Add to Favorite"}
              </span>
            </button>
            <hr className="border-gray-200" />
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-primary/5"
              onClick={handleCopyLink}
              disabled={copied}
            >
              {copied ? (
                <>
                  <CiCircleCheck className="h-4 w-4 ml-1" />{" "}
                  <span className="ml-2">Link copied</span>{" "}
                </>
              ) : (
                <>
                  <FiLink className="w-4 h-4" />
                  <span className="ml-2">Copy Link</span>
                </>
              )}
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-primary/5"
              onClick={() => {
                setIsRenameInputActive(true);
                setIsMenuOpen(false);
              }}
            >
              <HiOutlinePencilSquare className="w-4 h-4" />
              <span className="ml-2">Rename</span>
            </button>
            <button
              className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-primary/5"
              onClick={handleDeleteDoc}
            >
              <CiTrash className="w-4 h-4" />
              <span className="ml-2">Delete</span>
            </button>
          </div>
          <div className="border-t border-gray-200">
            <Link
              href={url!}
              target="_blank"
              className="flex items-center w-full px-4 py-2 text-sm text-gray-600 hover:bg-primary/5"
            >
              <GoArrowUpRight className="w-4 h-4" />
              <span className="ml-2">Open in new tab</span>
            </Link>
          </div>
          <hr className="border-gray-200" />
          <div className="px-5 py-1 flex flex-col items-start justify-start gap-1 text-gray-600 text-xs">
            <p>Last edited by: {data.user?.name}</p>
            <p>{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      )}
      {isRenameInputActive && (
        <DocumentInput
          id={documentId}
          title={documentTitle}
          docicon={documentIcon!}
          setClose={setIsRenameInputActive}
        />
      )}
    </div>
  );
};
