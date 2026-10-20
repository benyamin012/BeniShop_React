const LoaderSvg = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <span
        className="
          inline-block
          font-mono font-bold
          text-[156px]
          text-[#965659]
          opacity-80
          before:content-['{']
          after:content-['}']
          before:inline-block
          after:inline-block
          before:animate-[loader-pulse_0.4s_ease-in-out_alternate_infinite]
          after:animate-[loader-pulse_0.4s_0.3s_ease-in-out_alternate_infinite]
        "
      />
    </div>
  );
};

export default LoaderSvg;
