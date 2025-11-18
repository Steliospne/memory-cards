'use cache';

const BackgroundVideo = async () => {
  const baseURL = process.env.NEXT_PUBLIC_CDN;
  if (!baseURL) throw new Error('Missing media url.');

  return (
    <video
      src={`${baseURL}/memory-cards-bg.mp4`}
      muted
      loop
      autoPlay
      playsInline
      className='absolute top-0 -z-9999 h-full w-full object-cover'
    />
  );
};

export default BackgroundVideo;
