import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";


const standard_moods = [
  { name: 'Excited', color: 'Neon green', hexcode: '#39FF14', src: "images/emotion-excited.svg", id:"moodblock_excited"},
  { name: 'Very Happy', color: 'Yellow', hexcode: '#FFFF00', src: "images/emotion-placeholder.svg", id:"moodblock_veryhappy" }, // Need to change to very happy
  { name: 'Meh', color: 'Bright blue', hexcode: '#007FFF', src: "images/emotion-meh.svg", id:"moodblock_meh" },
  { name: 'Tired', color: 'Black', hexcode: '#000000', src: "images/emotion-tired.svg", id:"moodblock_tired" },
  { name: 'Content', color: 'Brown', hexcode: '#964B00', src: "images/emotion-placeholder.svg", id:"moodblock_content" },
  { name: 'Angry', color: 'Red', hexcode: '#FF0000', src: "images/emotion-angry.svg", id:"moodblock_angry" },
  { name: 'Happy', color: 'Lime green', hexcode: '#32CD32', src: "images/emotion-happy.svg", id:"moodblock_happy" },
  { name: 'In love', color: 'Pink', hexcode: '#FFC0CB', src: "images/emotion-inlove.svg", id:"moodblock_inlove" },
  { name: 'Unhappy', color: 'Navy blue', hexcode: '#000080', src: "images/emotion-sad.svg", id:"moodblock_unhappy" },
  { name: 'Teary', color: 'Light purple', hexcode: '#E6E6FA', src: "images/emotion-placeholder.svg", id:"moodblock_teary" },
  { name: 'Upset', color: 'Dark blue', hexcode: '#00008B', src: "images/emotion-upset.svg", id:"moodblock_upset" },
  { name: 'Confused', color: 'Gray', hexcode: '#808080', src: "images/emotion-confused.svg", id:"moodblock_confused" },
]


const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;


export const CarouselSwipe = () => {
  const [imgIndex, setImgIndex] = useState(0);

  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === standard_moods.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < standard_moods.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="relative overflow-hidden py-8" id="moodcarousel">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        <Images imgIndex={imgIndex} />
      </motion.div>

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
    </div>
  );
};

const Images = ({ imgIndex }) => {
  return (
    <>
      {standard_moods.map((mood, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${mood.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "max-h",
              width: "auto",
            }}
            id={mood.id}
            animate={{
              scale: imgIndex === idx ? 0.95 : 0.85,
            }}
            className="shrink-0 rounded-xl object-cover"
          />
        );
      })}
    </>
  );
};

const Dots = ({ imgIndex, setImgIndex }) => {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {standard_moods.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex ? "bg-neutral-50" : "bg-neutral-500"
            }`}
          />
        );
      })}
    </div>
  );
};


export default CarouselSwipe;