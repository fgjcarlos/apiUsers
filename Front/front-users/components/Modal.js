import React from "react";

export default function Modal({ children}) {
    return (
        <div
        className="box-border absolute inset-0 z-10 flex flex-wrap items-center justify-center w-full h-full bg-slate-100/90">
            <div className="box-border flex items-center justify-center w-3/4 max-w-4xl overflow-hidden h-3/4 rounded-3xl bg-slate-300 p10">
                {children}
            </div>
        </div>
    );
}
