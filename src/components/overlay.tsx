import Link from "next/link";
import React from "react";

export default function Overlay({}) {
    return (
        <>
            <h1 className="text-md font-departure absolute top-0 left-0 m-5 pointer-events-auto">
                &#127876; Merry Christmas!
            </h1>
            <p className="text-md font-departure absolute top-0 right-0 m-5 pointer-events-auto">
                {new Date().toLocaleDateString()}
            </p>
            <Link
                href="https://twitter.com/Joshua Guo"
                className="flex text-center text-sm font-departure absolute bottom-0 left-0 m-5 pointer-events-auto"
            >
                Inspired by Joshua Guo
            </Link>
            <Link
                href="https://twitter.com/paolojnn"
                className="flex text-center text-sm font-departure absolute bottom-0 right-0 m-5 pointer-events-auto"
            >
                Built by PaoloJN 💝
            </Link>
        </>
    );
}
