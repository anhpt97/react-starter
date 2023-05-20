import { useEffect, useRef, useState } from 'react';

const Video = ({ src, isPlaying }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }, [isPlaying]);

  return <video ref={ref} src={src} loop playsInline />;
};

export const VideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <Video
        isPlaying={isPlaying}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      />
    </>
  );
};

// export const VideoPlayer = () => {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const ref = useRef(null);

//   const handleClick = () => {
//     const nextIsPlaying = !isPlaying;
//     setIsPlaying(nextIsPlaying);

//     if (nextIsPlaying) {
//       ref.current.play();
//     } else {
//       ref.current.pause();
//     }
//   };

//   return (
//     <>
//       <button onClick={handleClick}>{isPlaying ? 'Pause' : 'Play'}</button>
//       <video
//         width="250"
//         ref={ref}
//         onPlay={() => setIsPlaying(true)}
//         onPause={() => setIsPlaying(false)}
//       >
//         <source
//           src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
//           type="video/mp4"
//         />
//       </video>
//     </>
//   );
// };
