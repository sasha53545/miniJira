import React from "react";
import styled from "styled-components";
import Button from "./../components/Dashboard/Dashboard";
import animateHoverButtons from "./../components/Dashboard/Dashboard";

const SvgPreviousNext = styled.svg`
    ${Button}:hover & {
        animation: ${animateHoverButtons} .6s ease-in-out 0.6s;
        animation-fill-mode: forwards;
    }
`;

export const nextPreviousIcon = () => {
    return (
        <SvgPreviousNext
            xmlns="http://www.w3.org/2000/svg"
            width="30.966"
            height="30.967"
            x="0"
            y="0"
            enableBackground="new 0 0 791.966 791.967"
            version="1.1"
            viewBox="0 0 791.966 791.967"
        >
            <path
                d="M245.454 396.017L617.077 56.579c12.973-12.94 12.973-33.934 0-46.874-12.973-12.94-34.033-12.94-47.006 0L174.615 370.896c-6.932 6.899-9.87 16.076-9.408 25.087-.462 9.045 2.476 18.188 9.408 25.088l395.456 361.19c12.973 12.94 34.033 12.94 47.006 0 12.973-12.939 12.973-33.934 0-46.873L245.454 396.017z"></path>
        </SvgPreviousNext>
    );
};

export const errorValidationIcon = () => {
    return (
        <svg width={30} height={30}>
            <rect
                fill="#db3c30"
                width={28}
                height={28}
                x={-30}
                y={-30}
                rx={14}
                ry={14}
                transform="matrix(0 -1 -1 0 0 0)"
            />
            <path
                className="prefix__error"
                d="M15 7.997h2v13h-2zm0 16h2v2h-2z"
                opacity={0.2}
            />
            <path
                fill="#fff"
                className="prefix__error"
                d="M15 6.997h2v13h-2zm0 16h2v2h-2z"
            />
            <path
                fill="#fff"
                opacity={0.2}
                d="M16 2C8.244 2 2 8.244 2 16c0 .169.02.333.025.5A13.957 13.957 0 0116 3c7.587 0 13.711 5.98 13.975 13.5.005-.167.025-.331.025-.5 0-7.756-6.244-14-14-14z"
            />
            <path
                opacity={0.2}
                d="M2.025 16.5c-.006.167-.025.331-.025.5 0 7.756 6.244 14 14 14s14-6.244 14-14c0-.169-.02-.333-.025-.5C29.71 24.021 23.587 30 16 30 8.412 30 2.289 24.021 2.025 16.5z"
            />
        </svg>
    );
};

export const googleAuthIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 128 128"
            xmlSpace="preserve"
            width="40.966"
            height="40.967"
        >
            <g>
                <g fillRule="evenodd" clipRule="evenodd">
                    <path fill="none" d="M0 0H128V128H0z"></path>
                    <path
                        fill="#FBBC05"
                        d="M27.585 64c0-4.157.69-8.143 1.923-11.881L7.938 35.648C3.734 44.183 1.366 53.801 1.366 64c0 10.191 2.366 19.802 6.563 28.332l21.558-16.503A37.86 37.86 0 0127.585 64"
                    ></path>
                    <path
                        fill="#EA4335"
                        d="M65.457 26.182c9.031 0 17.188 3.2 23.597 8.436L107.698 16C96.337 6.109 81.771 0 65.457 0 40.129 0 18.361 14.484 7.938 35.648l21.569 16.471a37.77 37.77 0 0135.95-25.937"
                    ></path>
                    <path
                        fill="#34A853"
                        d="M65.457 101.818a37.77 37.77 0 01-35.949-25.937L7.938 92.349C18.361 113.516 40.129 128 65.457 128c15.632 0 30.557-5.551 41.758-15.951L86.741 96.221c-5.777 3.639-13.052 5.597-21.284 5.597"
                    ></path>
                    <path
                        fill="#4285F4"
                        d="M126.634 64c0-3.782-.583-7.855-1.457-11.636h-59.72v24.727h34.376c-1.719 8.431-6.397 14.912-13.092 19.13l20.474 15.828c11.766-10.92 19.419-27.188 19.419-48.049"
                    ></path>
                </g>
            </g>
        </svg>
    );
}

export const facebookAuthIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            enableBackground="new 0 0 112.196 112.196"
            version="1.1"
            viewBox="0 0 112.196 112.196"
            xmlSpace="preserve"
            width="40.966"
            height="40.967"
        >
            <circle cx="56.098" cy="56.098" r="56.098" fill="#3B5998"></circle>
            <path
                fill="#FFF"
                d="M70.201 58.294h-10.01v36.672H45.025V58.294h-7.213V45.406h7.213v-8.34c0-5.964 2.833-15.303 15.301-15.303l11.234.047v12.51h-8.151c-1.337 0-3.217.668-3.217 3.513v7.585h11.334l-1.325 12.876z"
            ></path>
        </svg>
    );
};
