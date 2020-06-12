import React from "react";

const AddTaskIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="62"
        height="62"
        viewBox="0 0 62 62"
      >
          <defs>
              <filter
                id="filter-1"
                width="170.8"
                height="170.8"
                x="-35.4"
                y="-31.2"
                filterUnits="objectBoundingBox"
              >
                  <feOffset
                    dy="2"
                    in="SourceAlpha"
                    result="shadowOffsetOuter1"
                  ></feOffset>
                  <feGaussianBlur
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                    stdDeviation="2"
                  ></feGaussianBlur>
                  <feColorMatrix
                    in="shadowBlurOuter1"
                    result="shadowMatrixOuter1"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
                  ></feColorMatrix>
                  <feMerge>
                      <feMergeNode in="shadowMatrixOuter1"></feMergeNode>
                      <feMergeNode in="SourceGraphic"></feMergeNode>
                  </feMerge>
              </filter>
              <circle id="path-2" cx="24" cy="24" r="24"></circle>
              <filter
                id="filter-3"
                width="135.4"
                height="135.4"
                x="-17.7"
                y="-13.5"
                filterUnits="objectBoundingBox"
              >
                  <feOffset
                    dy="2"
                    in="SourceAlpha"
                    result="shadowOffsetOuter1"
                  ></feOffset>
                  <feGaussianBlur
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                    stdDeviation="2.5"
                  ></feGaussianBlur>
                  <feColorMatrix
                    in="shadowBlurOuter1"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
                  ></feColorMatrix>
              </filter>
          </defs>
          <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
              <g transform="translate(-1225 -101)">
                  <g filter="url(#filter-1)" transform="translate(1232 104)">
                      <path d="M12 12L36 12 36 36 12 36z"></path>
                      <g fillRule="nonzero">
                          <use
                            fill="#000"
                            filter="url(#filter-3)"
                            xlinkHref="#path-2"
                          ></use>
                          <use fill="#9e9e9e" xlinkHref="#path-2"></use>
                      </g>
                      <path
                        fill="#FFF"
                        fillRule="nonzero"
                        d="M31 25L25 25 25 31 23 31 23 25 17 25 17 23 23 23 23 17 25 17 25 23 31 23z"
                      ></path>
                  </g>
              </g>
          </g>
      </svg>
    );
};

export default AddTaskIcon;
