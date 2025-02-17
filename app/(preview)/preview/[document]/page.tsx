import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { NavBar } from "@/components/main/navbat";
import { getDocumentById } from "@/data/document";
import { Skeleton } from "@/components/ui/skeleton";
import { DocContent } from "@/components/main/doc-content";
import { Notification } from "@/components/main/notification";

export async function generateMetadata({
  params,
}: {
  params: { document: string };
}): Promise<Metadata> {
  const { document } = params;
  const res = await getDocumentById(document);

  return {
    title: `${res?.icon ? res?.icon : ""} ${res?.title} | Notion`,
  };
}

export default async function DocumentPreviewPage({
  params,
}: {
  params: { document: string };
}) {
  const { document } = params;
  const res = await getDocumentById(document);

  if (!res) return redirect("/workspace");

  return (
    <>
      {!document ? (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-md 
          font-normal text-base-content"
        >
          Sorry! Not found?
        </div>
      ) : (
        <>
          {document === undefined ? (
            <div className="mt-32">
              <Skeleton className="max-w-xl lg:max-w-2xl xl:mxa-w-3xl 2xl:max-w-4xl mx-auto h-8" />
            </div>
          ) : (
            <>
              <div className="w-full h-auto overflow-auto">
                <DocContent document={res} editable={false} preview={true} />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
