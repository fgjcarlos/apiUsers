export const AvatarSkeleton1 = (
  <svg
    role="img"
    width="160"
    height="208"
    aria-labelledby="loading-aria"
    viewBox="0 0 160 208"
    preserveAspectRatio="none"
    style="transform: scaleX(-1)"
  >
    <title id="loading-aria">Loading...</title>
    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      clip-path="url(#clip-path)"
      style='fill: url("#fill");'
    ></rect>
    <defs>
      <clipPath id="clip-path">
        <circle cx="80" cy="52" r="32" />
        <circle cx="80" cy="161" r="70" />
        <rect x="102" y="42" rx="0" ry="0" width="0" height="1" />
      </clipPath>
      <linearGradient id="fill">
        <stop offset="0.599964" stop-color="#deddda" stop-opacity="1">
          <animate
            attributeName="offset"
            values="-2; -2; 1"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="1.59996" stop-color="#9a9996" stop-opacity="1">
          <animate
            attributeName="offset"
            values="-1; -1; 2"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop offset="2.59996" stop-color="#deddda" stop-opacity="1">
          <animate
            attributeName="offset"
            values="0; 0; 3"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
      </linearGradient>
    </defs>
  </svg>
);
