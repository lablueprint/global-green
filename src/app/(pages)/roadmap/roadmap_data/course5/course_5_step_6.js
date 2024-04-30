import React from 'react';
import { useRouter } from 'next/navigation';

const course_5_step_6 = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/courses/course_1/lesson_6');
  };

  return (
    <svg width="1000" height="585" viewBox="0 0 1000 585" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_2549_18283)">
    <rect width="1000" height="585" rx="16" transform="matrix(-1 0 0 1 1000 0)" fill="#DDF0C7"/>
    <path d="M694 510C748.167 510.667 839 569 902 443" stroke="white" stroke-width="18"/>
    <path d="M648.5 162.5C703 182.833 798 258 689.5 346C581.86 433.302 634 482 689.5 516" stroke="white" stroke-width="18"/>
    <path d="M388 421C440.167 423.667 537.6 403.7 510 302.5C482.4 201.3 565.5 168.333 610.5 164.5" stroke="white" stroke-width="18"/>
    <path d="M314.001 126.5C344.501 110.998 437.501 209.5 328.501 258.5C227.552 303.88 308.334 391.333 361.501 405.5" stroke="#FFD66C" stroke-width="18"/>
    <path d="M314.001 126.5C344.501 110.998 437.501 209.5 328.501 258.5C227.552 303.88 308.334 391.333 361.501 405.5" stroke="white" stroke-width="18"/>
    <path d="M128 201.999C139.833 168.333 144 94.0013 300.5 115.5" stroke="#FFFFFD" stroke-width="18"/>
    <path d="M629.782 57.3443C628.392 134.302 706.389 79.3007 871.617 201.101C1036.84 322.902 1117.09 143.127 1118.48 66.169C1119.87 -10.789 1011.6 -75.1512 876.649 -77.5881C741.698 -80.0249 631.172 -19.6137 629.782 57.3443Z" fill="#82C512" fill-opacity="0.4"/>
    <path d="M679.473 40.4655C678.252 108.101 751.339 59.844 906.42 167.068C1061.5 274.291 1136.57 116.377 1137.79 48.7415C1139.01 -18.8936 1037.4 -75.5753 910.842 -77.8606C784.282 -80.146 680.695 -27.1696 679.473 40.4655Z" fill="#80C212" fill-opacity="0.4"/>
    <path d="M408.523 488.277C560.923 483.877 582.69 569.444 574.523 612.777C557.023 761.777 287.523 749.278 176.023 734.778C64.5234 720.278 -40.9766 682.278 -91.9766 571.778C-142.977 461.278 -62.9766 354.778 15.0234 317.278C93.0234 279.778 152.023 353.778 176.023 396.778C200.023 439.778 218.023 493.777 408.523 488.277Z" fill="#81C50E" fill-opacity="0.33"/>
    <path d="M382.523 539.277C534.923 534.877 556.69 620.444 548.523 663.777C531.023 812.777 261.523 800.278 150.023 785.778C38.5234 771.278 -66.9766 733.278 -117.977 622.778C-168.977 512.278 -88.9766 405.778 -10.9766 368.278C67.0234 330.778 126.023 404.778 150.023 447.778C174.023 490.778 192.023 544.777 382.523 539.277Z" fill="#81C50E" fill-opacity="0.33"/>
    <g filter="url(#filter0_d_2549_18283)">
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 88 265)" fill="#519546"/>
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 88 265)" fill="#FFFFFD" fill-opacity="0.4"/>
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 88 265)" stroke="#FFFFFD" stroke-width="8"/>
    <path d="M127.311 233.398V218.878L127.767 219.166C127.543 219.646 127.191 220.102 126.711 220.534C126.231 220.95 125.671 221.31 125.031 221.614C124.391 221.918 123.703 222.134 122.967 222.262V219.262C123.607 219.166 124.255 218.958 124.911 218.638C125.567 218.318 126.159 217.942 126.687 217.51C127.215 217.062 127.591 216.598 127.815 216.118H130.359V233.398H127.311Z" fill="white"/>
    </g>
    <g filter="url(#filter1_d_2549_18283)">
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 285 165)" fill="#519546"/>
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 285 165)" fill="#FFFFFD" fill-opacity="0.4"/>
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 285 165)" stroke="#FFFFFD" stroke-width="8"/>
    <path d="M318.24 133.398V130.926C319.872 129.582 321.232 128.422 322.32 127.446C323.424 126.454 324.304 125.582 324.96 124.83C325.616 124.078 326.08 123.39 326.352 122.766C326.64 122.126 326.784 121.502 326.784 120.894C326.784 120.094 326.56 119.47 326.112 119.022C325.664 118.574 325.04 118.35 324.24 118.35C323.408 118.35 322.728 118.598 322.2 119.094C321.672 119.574 321.352 120.254 321.24 121.134H318.072C318.248 119.518 318.896 118.238 320.016 117.294C321.136 116.35 322.592 115.878 324.384 115.878C326.16 115.878 327.552 116.342 328.56 117.27C329.584 118.182 330.096 119.454 330.096 121.086C330.096 121.902 329.952 122.694 329.664 123.462C329.392 124.214 328.928 125.006 328.272 125.838C327.632 126.654 326.768 127.558 325.68 128.55C324.608 129.526 323.264 130.638 321.648 131.886L320.904 130.926H330.408V133.398H318.24Z" fill="white"/>
    </g>
    <g filter="url(#filter2_d_2549_18283)">
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 330 459)" fill="#519546"/>
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 330 459)" fill="#FFFFFD" fill-opacity="0.4"/>
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 330 459)" stroke="#FFFFFD" stroke-width="8"/>
    <path d="M369.378 427.638C368.194 427.638 367.13 427.422 366.186 426.99C365.258 426.558 364.498 425.918 363.906 425.07C363.33 424.222 362.994 423.198 362.898 421.998H366.018C366.162 423.054 366.514 423.846 367.074 424.374C367.634 424.902 368.378 425.166 369.306 425.166C370.138 425.166 370.81 424.934 371.322 424.47C371.85 424.006 372.114 423.342 372.114 422.478C372.114 421.614 371.858 420.918 371.346 420.39C370.85 419.862 370.066 419.598 368.994 419.598H367.242V417.174H368.922C369.866 417.174 370.562 416.95 371.01 416.502C371.474 416.038 371.706 415.446 371.706 414.726C371.706 414.006 371.498 413.43 371.082 412.998C370.682 412.566 370.066 412.35 369.234 412.35C368.466 412.35 367.802 412.582 367.242 413.046C366.698 413.494 366.37 414.166 366.258 415.062H363.09C363.218 413.99 363.546 413.07 364.074 412.302C364.618 411.534 365.338 410.942 366.234 410.526C367.13 410.094 368.162 409.878 369.33 409.878C370.482 409.878 371.482 410.07 372.33 410.454C373.178 410.822 373.834 411.35 374.298 412.038C374.778 412.71 375.018 413.518 375.018 414.462C375.018 415.278 374.834 415.99 374.466 416.598C374.098 417.206 373.618 417.686 373.026 418.038C372.45 418.374 371.842 418.542 371.202 418.542L371.13 418.038C372.026 418.038 372.794 418.246 373.434 418.662C374.074 419.062 374.562 419.606 374.898 420.294C375.25 420.982 375.426 421.758 375.426 422.622C375.426 423.63 375.162 424.518 374.634 425.286C374.122 426.038 373.41 426.622 372.498 427.038C371.586 427.438 370.546 427.638 369.378 427.638Z" fill="white"/>
    </g>
    <g filter="url(#filter3_d_2549_18283)">
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 574 215)" fill="#519546"/>
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 574 215)" fill="#FFFFFD" fill-opacity="0.4"/>
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 574 215)" stroke="#FFFFFD" stroke-width="8"/>
    <path d="M614.936 183.398V178.838L615.08 178.358V168.494L616.28 169.022L609.176 178.55L607.808 177.422H620V179.894H606.464V177.518L615.032 166.118H618.128V183.398H614.936Z" fill="white"/>
    </g>
    <g filter="url(#filter4_d_2549_18283)">
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 634 551)" fill="#519546"/>
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 634 551)" fill="#FFFFFD" fill-opacity="0.4"/>
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 634 551)" stroke="#FFFFFD" stroke-width="8"/>
    <path d="M673.259 519.638C671.515 519.638 670.091 519.182 668.987 518.27C667.883 517.358 667.203 516.102 666.947 514.502H670.115C670.259 515.35 670.611 516.006 671.171 516.47C671.747 516.934 672.419 517.166 673.187 517.166C674.035 517.166 674.723 516.886 675.251 516.326C675.795 515.766 676.067 514.902 676.067 513.734C676.067 512.598 675.803 511.742 675.275 511.166C674.763 510.574 674.075 510.278 673.211 510.278C672.651 510.278 672.147 510.398 671.699 510.638C671.251 510.878 670.915 511.214 670.691 511.646H667.859L668.699 502.118H678.371V504.59H669.971L671.507 504.158L671.027 510.086L670.067 509.918C670.451 509.326 670.947 508.854 671.555 508.502C672.163 508.15 672.931 507.974 673.859 507.974C674.963 507.974 675.923 508.214 676.739 508.694C677.571 509.174 678.219 509.846 678.683 510.71C679.163 511.558 679.403 512.582 679.403 513.782C679.403 515.014 679.147 516.07 678.635 516.95C678.123 517.814 677.411 518.478 676.499 518.942C675.587 519.406 674.507 519.638 673.259 519.638Z" fill="white"/>
    </g>
    <g filter="url(#filter5_d_2549_18283)">
    <circle cx="60" cy="60" r="64" transform="matrix(1 0 0 -1 848 479)" fill="#519546" stroke="#FFFFFD" stroke-width="8" onClick={handleClick}/>
    <path d="M907.289 430.918C904.366 430.918 902.105 429.936 900.505 427.974C898.926 425.99 898.137 423.174 898.137 419.526C898.137 416.966 898.51 414.768 899.257 412.934C900.025 411.099 901.113 409.691 902.521 408.71C903.95 407.728 905.625 407.238 907.545 407.238C909.7 407.238 911.46 407.824 912.825 408.998C914.19 410.15 915.033 411.76 915.353 413.83H911.129C911.001 412.763 910.606 411.952 909.945 411.398C909.305 410.822 908.494 410.534 907.513 410.534C905.849 410.534 904.59 411.248 903.737 412.678C902.905 414.107 902.489 416.304 902.489 419.27V421.35L901.593 421.062C901.806 420.038 902.222 419.152 902.841 418.406C903.46 417.659 904.238 417.083 905.177 416.678C906.116 416.272 907.15 416.07 908.281 416.07C909.753 416.07 911.044 416.379 912.153 416.998C913.262 417.616 914.126 418.48 914.745 419.59C915.385 420.678 915.705 421.968 915.705 423.462C915.705 424.955 915.353 426.267 914.649 427.398C913.945 428.507 912.964 429.371 911.705 429.99C910.446 430.608 908.974 430.918 907.289 430.918ZM907.065 427.622C908.281 427.622 909.284 427.259 910.073 426.534C910.862 425.808 911.257 424.784 911.257 423.462C911.257 422.118 910.862 421.094 910.073 420.39C909.284 419.664 908.26 419.302 907.001 419.302C905.764 419.302 904.718 419.654 903.865 420.358C903.033 421.04 902.617 422.032 902.617 423.334C902.617 424.208 902.82 424.976 903.225 425.638C903.63 426.278 904.164 426.768 904.825 427.11C905.508 427.451 906.254 427.622 907.065 427.622Z" fill="white"/>
    </g>
    </g>
    <defs>
    <filter id="filter0_d_2549_18283" x="76" y="177" width="104" height="104" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2549_18283"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2549_18283" result="shape"/>
    </filter>
    <filter id="filter1_d_2549_18283" x="273" y="77" width="104" height="104" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2549_18283"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2549_18283" result="shape"/>
    </filter>
    <filter id="filter2_d_2549_18283" x="318" y="371" width="104" height="104" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2549_18283"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2549_18283" result="shape"/>
    </filter>
    <filter id="filter3_d_2549_18283" x="562" y="127" width="104" height="104" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2549_18283"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2549_18283" result="shape"/>
    </filter>
    <filter id="filter4_d_2549_18283" x="622" y="463" width="104" height="104" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2549_18283"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2549_18283" result="shape"/>
    </filter>
    <filter id="filter5_d_2549_18283" x="836" y="351" width="144" height="144" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2549_18283"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2549_18283" result="shape"/>
    </filter>
    <clipPath id="clip0_2549_18283">
    <rect width="1000" height="585" rx="16" transform="matrix(-1 0 0 1 1000 0)" fill="white"/>
    </clipPath>
    </defs>
    </svg> 
  );
};

export default course_5_step_6;
