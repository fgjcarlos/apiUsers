import React from "react";
import ContentLoader from "react-content-loader";

const AvatarSkeleton = (props) => {
    return (
        <div className="min-w-[40%] w-44 h-52 rounded-lg cursor-pointer relative">
            <ContentLoader
                rtl
                speed={6}
                width={160}
                height={208}
                viewBox="0 0 160 208"
                backgroundColor="#deddda"
                foregroundColor="#9a9996"
                {...props}
            >
                <circle cx="80" cy="52" r="32" />
                <circle cx="80" cy="161" r="70" />
                <rect x="102" y="42" rx="0" ry="0" width="0" height="1" />
            </ContentLoader>
        </div>
    );
}

export default AvatarSkeleton;
