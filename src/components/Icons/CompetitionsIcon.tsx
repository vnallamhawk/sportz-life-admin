import * as React from "react";
import { SVGProps } from "react";
const SVGComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask id="path-1-inside-1_1234_2895" fill="white">
      <path d="M18.5503 11.7743C18.365 12.0203 17.7275 12.7129 17.2198 12.7129C17.213 12.7129 17.2067 12.7129 17.1999 12.7125C17.1309 12.7103 16.922 12.7028 16.6948 12.3517C16.1499 11.5091 17.252 10.2034 18.3182 8.94037C19.5575 7.47225 20.8389 5.95425 19.9678 4.665C19.7 4.269 19.3288 4.04175 18.8938 4.00763C18.4614 3.97575 18.0148 4.1385 17.618 4.362C17.6387 4.32375 17.6567 4.28625 17.6777 4.24762C17.771 4.07737 17.8689 3.91275 17.9668 3.74962H17.9968C18.1573 3.74962 18.3002 3.64763 18.3515 3.49538L18.7344 2.37038C18.7734 2.25563 18.755 2.12962 18.6845 2.03137C18.6152 1.93312 18.5015 1.875 18.3808 1.875H5.61916C5.49841 1.875 5.38516 1.93312 5.31466 2.031C5.24416 2.12925 5.22541 2.25525 5.26366 2.36962L5.64241 3.49463C5.69379 3.64725 5.83666 3.75 5.99791 3.75H6.05416C6.18166 3.96225 6.30016 4.17075 6.41154 4.37587C6.00916 4.14487 5.55204 3.97425 5.10579 4.008C4.67041 4.04212 4.29916 4.26938 4.03179 4.66537C3.16066 5.95463 4.44204 7.47262 5.68104 8.94075C6.74716 10.2034 7.84929 11.5095 7.30441 12.3521C7.07791 12.7027 6.86904 12.7102 6.80041 12.7129C6.29941 12.741 5.63829 12.0236 5.44891 11.7739C5.32366 11.6096 5.08891 11.5766 4.92391 11.7015C4.75891 11.826 4.72591 12.0608 4.85041 12.2257C4.94716 12.3544 5.81154 13.4636 6.78129 13.4633C6.79629 13.4633 6.81166 13.4633 6.82666 13.4625C7.11879 13.452 7.53429 13.3271 7.88754 12.8235C8.01466 13.0785 8.17066 13.3204 8.35816 13.5409C8.99529 14.2905 9.90241 14.7405 10.8748 14.8061V17.625H8.62291C8.45566 17.625 8.30866 17.7356 8.26254 17.8965L7.58679 20.25H7.12479C6.96391 20.25 6.82066 20.3528 6.76929 20.5054L6.39054 21.6304C6.35191 21.7451 6.37104 21.8711 6.44154 21.969C6.51204 22.0669 6.62529 22.125 6.74604 22.125H17.2573C17.2595 22.125 17.2625 22.125 17.2648 22.125C17.4722 22.125 17.6398 21.9574 17.6398 21.75C17.6398 21.6814 17.6218 21.6176 17.5895 21.5625L17.2295 20.5042C17.1782 20.352 17.0353 20.25 16.8748 20.25H16.4128L15.7329 17.8961C15.6864 17.7356 15.5394 17.625 15.3725 17.625H13.1375L13.1255 14.8106C14.4452 14.7476 15.5803 13.9826 16.1552 12.8824C16.499 13.3365 16.8924 13.452 17.1729 13.4621C17.1883 13.4629 17.2033 13.4629 17.2183 13.4629C18.188 13.4629 19.0528 12.354 19.1492 12.2254C19.2737 12.0604 19.2407 11.8252 19.0753 11.7004C18.9099 11.5755 18.6752 11.6093 18.5503 11.7743ZM18.8357 4.75575C19.0438 4.77188 19.2058 4.8765 19.3464 5.085C19.9003 5.90475 18.8049 7.20225 17.7452 8.457C17.3259 8.95388 16.9037 9.456 16.5583 9.954V7.788C16.5583 7.1985 16.6937 6.53925 16.955 5.82075C17.2925 5.47725 18.1899 4.7055 18.8357 4.75575ZM17.8569 2.625L17.729 3H6.26716L6.14079 2.625H17.8569ZM6.25404 8.457C5.19466 7.20188 4.09929 5.90438 4.65279 5.085C4.79341 4.87688 4.95579 4.77225 5.16316 4.75575C5.83404 4.7055 6.78879 5.54625 7.09741 5.87625C7.10116 5.88 7.10641 5.8815 7.11016 5.88525C7.37491 6.59737 7.51254 7.23862 7.51254 7.78837V10.0583C7.15516 9.52612 6.70254 8.98838 6.25404 8.457ZM16.7338 21.375H7.26804L7.39441 21H16.6063L16.7338 21.375ZM15.632 20.25H8.36716L8.90566 18.375H15.0909L15.632 20.25ZM11.6248 17.625V14.8196H12.3755L12.3875 17.625H11.6248ZM12.9512 14.0696H11.1197C10.2759 14.0696 9.47754 13.6999 8.92966 13.0553C8.49954 12.5482 8.26254 11.907 8.26254 11.2496V7.78875C8.26254 6.67125 7.80879 5.313 6.92191 3.75038H17.1005C17.0743 3.79688 17.0465 3.84075 17.0207 3.88762C16.7143 4.44487 16.4664 4.98 16.2759 5.49112L16.2752 5.49263C15.965 6.324 15.8079 7.09237 15.8079 7.78837V11.2492C15.8083 12.8044 14.5265 14.0696 12.9512 14.0696Z" />
    </mask>
    <path
      d="M18.5503 11.7743C18.365 12.0203 17.7275 12.7129 17.2198 12.7129C17.213 12.7129 17.2067 12.7129 17.1999 12.7125C17.1309 12.7103 16.922 12.7028 16.6948 12.3517C16.1499 11.5091 17.252 10.2034 18.3182 8.94037C19.5575 7.47225 20.8389 5.95425 19.9678 4.665C19.7 4.269 19.3288 4.04175 18.8938 4.00763C18.4614 3.97575 18.0148 4.1385 17.618 4.362C17.6387 4.32375 17.6567 4.28625 17.6777 4.24762C17.771 4.07737 17.8689 3.91275 17.9668 3.74962H17.9968C18.1573 3.74962 18.3002 3.64763 18.3515 3.49538L18.7344 2.37038C18.7734 2.25563 18.755 2.12962 18.6845 2.03137C18.6152 1.93312 18.5015 1.875 18.3808 1.875H5.61916C5.49841 1.875 5.38516 1.93312 5.31466 2.031C5.24416 2.12925 5.22541 2.25525 5.26366 2.36962L5.64241 3.49463C5.69379 3.64725 5.83666 3.75 5.99791 3.75H6.05416C6.18166 3.96225 6.30016 4.17075 6.41154 4.37587C6.00916 4.14487 5.55204 3.97425 5.10579 4.008C4.67041 4.04212 4.29916 4.26938 4.03179 4.66537C3.16066 5.95463 4.44204 7.47262 5.68104 8.94075C6.74716 10.2034 7.84929 11.5095 7.30441 12.3521C7.07791 12.7027 6.86904 12.7102 6.80041 12.7129C6.29941 12.741 5.63829 12.0236 5.44891 11.7739C5.32366 11.6096 5.08891 11.5766 4.92391 11.7015C4.75891 11.826 4.72591 12.0608 4.85041 12.2257C4.94716 12.3544 5.81154 13.4636 6.78129 13.4633C6.79629 13.4633 6.81166 13.4633 6.82666 13.4625C7.11879 13.452 7.53429 13.3271 7.88754 12.8235C8.01466 13.0785 8.17066 13.3204 8.35816 13.5409C8.99529 14.2905 9.90241 14.7405 10.8748 14.8061V17.625H8.62291C8.45566 17.625 8.30866 17.7356 8.26254 17.8965L7.58679 20.25H7.12479C6.96391 20.25 6.82066 20.3528 6.76929 20.5054L6.39054 21.6304C6.35191 21.7451 6.37104 21.8711 6.44154 21.969C6.51204 22.0669 6.62529 22.125 6.74604 22.125H17.2573C17.2595 22.125 17.2625 22.125 17.2648 22.125C17.4722 22.125 17.6398 21.9574 17.6398 21.75C17.6398 21.6814 17.6218 21.6176 17.5895 21.5625L17.2295 20.5042C17.1782 20.352 17.0353 20.25 16.8748 20.25H16.4128L15.7329 17.8961C15.6864 17.7356 15.5394 17.625 15.3725 17.625H13.1375L13.1255 14.8106C14.4452 14.7476 15.5803 13.9826 16.1552 12.8824C16.499 13.3365 16.8924 13.452 17.1729 13.4621C17.1883 13.4629 17.2033 13.4629 17.2183 13.4629C18.188 13.4629 19.0528 12.354 19.1492 12.2254C19.2737 12.0604 19.2407 11.8252 19.0753 11.7004C18.9099 11.5755 18.6752 11.6093 18.5503 11.7743ZM18.8357 4.75575C19.0438 4.77188 19.2058 4.8765 19.3464 5.085C19.9003 5.90475 18.8049 7.20225 17.7452 8.457C17.3259 8.95388 16.9037 9.456 16.5583 9.954V7.788C16.5583 7.1985 16.6937 6.53925 16.955 5.82075C17.2925 5.47725 18.1899 4.7055 18.8357 4.75575ZM17.8569 2.625L17.729 3H6.26716L6.14079 2.625H17.8569ZM6.25404 8.457C5.19466 7.20188 4.09929 5.90438 4.65279 5.085C4.79341 4.87688 4.95579 4.77225 5.16316 4.75575C5.83404 4.7055 6.78879 5.54625 7.09741 5.87625C7.10116 5.88 7.10641 5.8815 7.11016 5.88525C7.37491 6.59737 7.51254 7.23862 7.51254 7.78837V10.0583C7.15516 9.52612 6.70254 8.98838 6.25404 8.457ZM16.7338 21.375H7.26804L7.39441 21H16.6063L16.7338 21.375ZM15.632 20.25H8.36716L8.90566 18.375H15.0909L15.632 20.25ZM11.6248 17.625V14.8196H12.3755L12.3875 17.625H11.6248ZM12.9512 14.0696H11.1197C10.2759 14.0696 9.47754 13.6999 8.92966 13.0553C8.49954 12.5482 8.26254 11.907 8.26254 11.2496V7.78875C8.26254 6.67125 7.80879 5.313 6.92191 3.75038H17.1005C17.0743 3.79688 17.0465 3.84075 17.0207 3.88762C16.7143 4.44487 16.4664 4.98 16.2759 5.49112L16.2752 5.49263C15.965 6.324 15.8079 7.09237 15.8079 7.78837V11.2492C15.8083 12.8044 14.5265 14.0696 12.9512 14.0696Z"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.0625}
      mask="url(#path-1-inside-1_1234_2895)"
    />
  </svg>
);
export default SVGComponent;