import React from "react";
import "./PhotographyWheel.css";

const IMAGES_AMOUNT = 6;

interface PhotographyWheelProps {
  collection: string;
}
function PhotographyWheel(props: PhotographyWheelProps) {
  let { collection } = props;
  [collection] = React.useState<string>(collection);

  // * Scroll
  // #region
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState<boolean>(false);
  const [startX, setStartX] = React.useState<number | null>(null);
  const [scrollLeft, setScrollLeft] = React.useState<number>(0);
  const [currenti, setCurrenti] = React.useState<number>(0);
  const incementCurrenti = () => {
    setCurrenti(currenti + 1);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    // * Prevent dragging images
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") e.preventDefault();

    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const scrollX = x - (startX || 0);
    containerRef.current.scrollLeft = scrollLeft - scrollX;
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  // #endregion

  // * Images
  const [images, setImages] = React.useState<string[]>([]);
  React.useEffect(() => {
    const imageFiles: string[] = [];
    for (let i = 1; i <= IMAGES_AMOUNT; i++) {
      imageFiles.push(require(`../../assets/${collection}/i${i}.jpg`) as never);
    }
    setImages(imageFiles);
  }, [collection]);

  return (
    <div
      className="horizontal-scroll-section"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onScroll={(e) => {
        if (containerRef.current?.children[0].children) {
          for (const i in containerRef.current?.children[0].children) {
            const scrollableImage = containerRef.current?.children[0].children[i] as HTMLImageElement;
            const imgX = scrollableImage.x;
            const imgW = scrollableImage.width;
            if (-imgX > imgW) {
              setImages(() => images.concat(images.slice(currenti, currenti + 1)));
              incementCurrenti();
            }
          }
        }
      }}
    >
      <div className="scrollable">
        {images.map((imageSrc, index) => {
          const image =
            index === images.length - 1 ? (
              <img src={imageSrc} alt={index.toString()} key={index} className="last-image" />
            ) : (
              <img src={imageSrc} alt={index.toString()} key={index} />
            );
          return image;
        })}
      </div>
    </div>
  );
}

export default PhotographyWheel;
