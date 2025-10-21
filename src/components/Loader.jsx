const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-50 pointer-events-none">
      <div className="size-16 md:size-20 border-4 border-white border-t-transparent rounded-full animate-spin" />
      {text && (
        <p className="absolute bottom-10 text-white text-sm md:text-base font-light animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default Loader;
