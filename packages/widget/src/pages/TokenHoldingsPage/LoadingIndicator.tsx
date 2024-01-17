export const LoadingIndicator = () => {
  return (
    <>
      {/* <a
        rel="noopener noreferrer nofollow"
        href="https://telegram.me/telefrensbot"
        target="_blank"
      > */}
      {/* <div>
        <Image
          className="py-4"
          src="/images/Logo.png"
          alt="telefrens"
          width={200}
          height={195}
        />
      </div> */}
      <div className="flex flex-col pt-80 text-white">
        <div
          style={{
            textAlign: 'center',
            width: '100%',
            fontWeight: 700,
          }}
        >
          Please wait...{' '}
          <svg
            className="animate-spin h-5 w-5 ml-3 bg-yellow-300 mt-2"
            viewBox="0 0 24 24"
          ></svg>
        </div>
      </div>
    </>
  );
};
