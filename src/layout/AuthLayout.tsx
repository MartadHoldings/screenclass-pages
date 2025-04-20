import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative flex h-screen">
        <div className="h-full w-1/2 bg-blue-900/90"></div>
        <div className="h-full w-1/2 bg-zinc-100"></div>
        <main className="absolute left-1/2 top-1/2 max-h-[90vh] w-full max-w-xl -translate-x-1/2 -translate-y-1/2 transform overflow-auto rounded-md bg-white px-4 py-6 shadow-xl">
          {children}
        </main>
      </div>
    </>
  );
}
