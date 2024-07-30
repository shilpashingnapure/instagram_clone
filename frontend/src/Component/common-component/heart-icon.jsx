export const HeartIcon = ({ fillColor, stroke }) => {
    return (
      <svg
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
      >
        <g transform="matrix(1, 0, 0, 1, 209.5339813232422, 12.23534107208252)">
          <g>
            <path
              d="M 57.745 402.616 L 58.291 403.323 C 206.94 341.667 264.218 198.741 198.759 137.086 C 133.293 75.43 58.291 159.497 58.291 159.497 L 57.745 159.497 C 57.745 159.497 -17.263 75.43 -82.723 137.086 C -148.182 198.733 -90.903 340.961 57.745 402.616 Z"
              style={{
                fill: fillColor,
                strokeWidth: "20px",
                stroke: stroke,
              }}
            />
          </g>
        </g>
      </svg>
    );
  };