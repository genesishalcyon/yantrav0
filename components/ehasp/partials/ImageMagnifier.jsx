import { useState, useRef } from "react";
export default function ImageMagnifier({
  id,
  width: magnifierWidth = 600,
  height: magnifierHeight = 400,
  magnifierSize = 400,
  children,
}) {
  const magnifierImageRef = useRef(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (showMagnifier) {
      const image = document.getElementById(id);

      magnifierImageRef.current.style.backgroundImage = `url(${image.src})`;
      magnifierImageRef.current.style.backgroundSize = `${magnifierSize}%`;
      magnifierImageRef.current.style.width = `${magnifierWidth}px`;
      magnifierImageRef.current.style.height = `${magnifierHeight}px`;

      const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect();

      // const x = ((e.pageX - left) / width) * 100;
      // const y = ((e.pageY - top) / height) * 100;

      // prevent the magnifying glass to view outside the image
      let posX = e.pageX - left - window.scrollX;
      let posY = e.pageY - top - window.scrollY;
      let percentagePosX = (posX / width) * 100;
      let percentagePosY = (posY / height) * 100;

      setPosition({
        x: percentagePosX,
        y: percentagePosY,
      });

      // center cursor in magnifying image
      setCursorPosition({
        x: e.pageX - magnifierWidth / 2 > 0 ? e.pageX - magnifierWidth / 2 : 0,
        y: e.pageY - magnifierHeight / 2,
      });
    }
  };

  return (
    <div
      className="img-magnifier-container"
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={handleMouseMove}
    >
      {children}
      {showMagnifier && (
        <div
          className="border-2 border-[#adadad] bg-[#f8f8f9] rounded-[8px]"
          style={{
            position: "absolute",
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y + 10}px`,
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <div
            ref={magnifierImageRef}
            className="magnifier-image bg-no-repeat"
            style={{
              backgroundPosition: `${position.x}% ${position.y}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
