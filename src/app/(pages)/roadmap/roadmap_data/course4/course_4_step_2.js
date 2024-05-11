import React from 'react';
import { useRouter } from 'next/navigation';

const course_4_step_2 = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/courses/course_1/lesson_1');
  };

  return (
    <svg width="1000" height="585" viewBox="0 0 1000 585" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_2549_17735)">
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
    <g filter="url(#filter0_d_2549_17735)">
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 88 265)" fill="#519546"/>
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 88 265)" fill="#FFFFFD" fill-opacity="0.4"/>
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 88 265)" stroke="#FFFFFD" stroke-width="8"/>
    <path d="M127.311 233.398V218.878L127.767 219.166C127.543 219.646 127.191 220.102 126.711 220.534C126.231 220.95 125.671 221.31 125.031 221.614C124.391 221.918 123.703 222.134 122.967 222.262V219.262C123.607 219.166 124.255 218.958 124.911 218.638C125.567 218.318 126.159 217.942 126.687 217.51C127.215 217.062 127.591 216.598 127.815 216.118H130.359V233.398H127.311Z" fill="white"/>
    </g>
        <g filter="url(#filter1_d_2549_17735)">
        <circle cx="60" cy="60" r="64" transform="matrix(1 0 0 -1 260 175)" fill="#519546" stroke="#FFFFFD" stroke-width="8" onClick={handleClick}/>
        <path d="M310.853 126.598V123.302C313.029 121.51 314.842 119.963 316.293 118.662C317.765 117.339 318.938 116.176 319.813 115.174C320.687 114.171 321.306 113.254 321.669 112.422C322.053 111.568 322.245 110.736 322.245 109.926C322.245 108.859 321.946 108.027 321.349 107.43C320.751 106.832 319.919 106.534 318.853 106.534C317.743 106.534 316.837 106.864 316.133 107.526C315.429 108.166 315.002 109.072 314.853 110.246H310.629C310.863 108.091 311.727 106.384 313.221 105.126C314.714 103.867 316.655 103.238 319.045 103.238C321.413 103.238 323.269 103.856 324.613 105.094C325.978 106.31 326.661 108.006 326.661 110.182C326.661 111.27 326.469 112.326 326.085 113.35C325.722 114.352 325.103 115.408 324.229 116.518C323.375 117.606 322.223 118.811 320.773 120.134C319.343 121.435 317.551 122.918 315.397 124.582L314.405 123.302H327.077V126.598H310.853Z" fill="white"/>
        </g>
    <g filter="url(#filter2_d_2549_17735)">
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 330 445)" fill="#9E9E9E" stroke="#FFFFFD" stroke-width="8"/>
    <path d="M369.378 413.638C368.194 413.638 367.13 413.422 366.186 412.99C365.258 412.558 364.498 411.918 363.906 411.07C363.33 410.222 362.994 409.198 362.898 407.998H366.018C366.162 409.054 366.514 409.846 367.074 410.374C367.634 410.902 368.378 411.166 369.306 411.166C370.138 411.166 370.81 410.934 371.322 410.47C371.85 410.006 372.114 409.342 372.114 408.478C372.114 407.614 371.858 406.918 371.346 406.39C370.85 405.862 370.066 405.598 368.994 405.598H367.242V403.174H368.922C369.866 403.174 370.562 402.95 371.01 402.502C371.474 402.038 371.706 401.446 371.706 400.726C371.706 400.006 371.498 399.43 371.082 398.998C370.682 398.566 370.066 398.35 369.234 398.35C368.466 398.35 367.802 398.582 367.242 399.046C366.698 399.494 366.37 400.166 366.258 401.062H363.09C363.218 399.99 363.546 399.07 364.074 398.302C364.618 397.534 365.338 396.942 366.234 396.526C367.13 396.094 368.162 395.878 369.33 395.878C370.482 395.878 371.482 396.07 372.33 396.454C373.178 396.822 373.834 397.35 374.298 398.038C374.778 398.71 375.018 399.518 375.018 400.462C375.018 401.278 374.834 401.99 374.466 402.598C374.098 403.206 373.618 403.686 373.026 404.038C372.45 404.374 371.842 404.542 371.202 404.542L371.13 404.038C372.026 404.038 372.794 404.246 373.434 404.662C374.074 405.062 374.562 405.606 374.898 406.294C375.25 406.982 375.426 407.758 375.426 408.622C375.426 409.63 375.162 410.518 374.634 411.286C374.122 412.038 373.41 412.622 372.498 413.038C371.586 413.438 370.546 413.638 369.378 413.638Z" fill="white" fill-opacity="0.5"/>
    </g>
    <g filter="url(#filter3_d_2549_17735)">
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 576 205)" fill="#9E9E9E" stroke="#FFFFFD" stroke-width="8"/>
    <path d="M616.936 173.398V168.838L617.08 168.358V158.494L618.28 159.022L611.176 168.55L609.808 167.422H622V169.894H608.464V167.518L617.032 156.118H620.128V173.398H616.936Z" fill="white" fill-opacity="0.5"/>
    </g>
    <g filter="url(#filter4_d_2549_17735)">
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 654 545)" fill="#9E9E9E" stroke="#FFFFFD" stroke-width="8"/>
    <path d="M693.259 513.638C691.515 513.638 690.091 513.182 688.987 512.27C687.883 511.358 687.203 510.102 686.947 508.502H690.115C690.259 509.35 690.611 510.006 691.171 510.47C691.747 510.934 692.419 511.166 693.187 511.166C694.035 511.166 694.723 510.886 695.251 510.326C695.795 509.766 696.067 508.902 696.067 507.734C696.067 506.598 695.803 505.742 695.275 505.166C694.763 504.574 694.075 504.278 693.211 504.278C692.651 504.278 692.147 504.398 691.699 504.638C691.251 504.878 690.915 505.214 690.691 505.646H687.859L688.699 496.118H698.371V498.59H689.971L691.507 498.158L691.027 504.086L690.067 503.918C690.451 503.326 690.947 502.854 691.555 502.502C692.163 502.15 692.931 501.974 693.859 501.974C694.963 501.974 695.923 502.214 696.739 502.694C697.571 503.174 698.219 503.846 698.683 504.71C699.163 505.558 699.403 506.582 699.403 507.782C699.403 509.014 699.147 510.07 698.635 510.95C698.123 511.814 697.411 512.478 696.499 512.942C695.587 513.406 694.507 513.638 693.259 513.638Z" fill="white" fill-opacity="0.5"/>
    </g>
    <g filter="url(#filter5_d_2549_17735)">
    <circle cx="40" cy="40" r="44" transform="matrix(1 0 0 -1 868 471)" fill="#9E9E9E" stroke="#FFFFFD" stroke-width="8"/>
    <path d="M907.568 439.638C905.376 439.638 903.68 438.902 902.48 437.43C901.296 435.942 900.704 433.83 900.704 431.094C900.704 429.174 900.984 427.526 901.544 426.15C902.12 424.774 902.936 423.718 903.992 422.982C905.064 422.246 906.32 421.878 907.76 421.878C909.376 421.878 910.696 422.318 911.72 423.198C912.744 424.062 913.376 425.27 913.616 426.822H910.448C910.352 426.022 910.056 425.414 909.56 424.998C909.08 424.566 908.472 424.35 907.736 424.35C906.488 424.35 905.544 424.886 904.904 425.958C904.28 427.03 903.968 428.678 903.968 430.902V432.462L903.296 432.246C903.456 431.478 903.768 430.814 904.232 430.254C904.696 429.694 905.28 429.262 905.984 428.958C906.688 428.654 907.464 428.502 908.312 428.502C909.416 428.502 910.384 428.734 911.216 429.198C912.048 429.662 912.696 430.31 913.16 431.142C913.64 431.958 913.88 432.926 913.88 434.046C913.88 435.166 913.616 436.15 913.088 436.998C912.56 437.83 911.824 438.478 910.88 438.942C909.936 439.406 908.832 439.638 907.568 439.638ZM907.4 437.166C908.312 437.166 909.064 436.894 909.656 436.35C910.248 435.806 910.544 435.038 910.544 434.046C910.544 433.038 910.248 432.27 909.656 431.742C909.064 431.198 908.296 430.926 907.352 430.926C906.424 430.926 905.64 431.19 905 431.718C904.376 432.23 904.064 432.974 904.064 433.95C904.064 434.606 904.216 435.182 904.52 435.678C904.824 436.158 905.224 436.526 905.72 436.782C906.232 437.038 906.792 437.166 907.4 437.166Z" fill="white" fill-opacity="0.5"/>
    </g>
    </g>
    <defs>
    <filter id="filter0_d_2549_17735" x="76" y="177" width="104" height="104" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2549_17735"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2549_17735" result="shape"/>
    </filter>
    <filter id="filter1_d_2549_17735" x="248" y="47" width="144" height="144" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2549_17735"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2549_17735" result="shape"/>
    </filter>
    <filter id="filter2_d_2549_17735" x="318" y="357" width="104" height="104" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2549_17735"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2549_17735" result="shape"/>
    </filter>
    <filter id="filter3_d_2549_17735" x="564" y="117" width="104" height="104" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2549_17735"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2549_17735" result="shape"/>
    </filter>
    <filter id="filter4_d_2549_17735" x="642" y="457" width="104" height="104" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2549_17735"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2549_17735" result="shape"/>
    </filter>
    <filter id="filter5_d_2549_17735" x="856" y="383" width="104" height="104" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dy="4"/>
    <feGaussianBlur stdDeviation="2"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2549_17735"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2549_17735" result="shape"/>
    </filter>
    <clipPath id="clip0_2549_17735">
    <rect width="1000" height="585" rx="16" transform="matrix(-1 0 0 1 1000 0)" fill="white"/>
    </clipPath>
    </defs>
    </svg>
  );
};

export default course_4_step_2;
