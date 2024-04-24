import React from "react";
import { Metadata } from "next";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { SideBar } from "@/components/main/sidebar";

export const metadata: Metadata = {
  title: "Workspace | Notion",
  description: "Workspace | Notion",
};

export default async function Mainlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <main className="w-full h-full flex">
      <div className="h-full sticky top-0 left-0">
        <SideBar />
      </div>
      <section className="flex-1 h-full overflow-y-auto">
        {children}
      </section>
    </main>
  );
}
