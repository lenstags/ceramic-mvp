/* eslint-disable @next/next/no-html-link-for-pages */
import Image from "next/image";

export const Footer = () => {
  return (
    <footer
      className="mr-8 my-6 ml-4 rounded-2xl
        w-3/12 bg-b lue-700
    px-6 py-6 bg-stone-100 font-serif text-sm"
    >
      <div>
        <a
          className="flex p-3 gap-2 items-center"
          rel="noreferrer"
          href="https://www.nata.social"
          target="_blank"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
              fill="#121212"
            />
            <path
              d="M18.1853 25.1734C18.1853 25.6447 17.8033 26.0267 17.332 26.0267H10.3467C9.87538 26.0267 9.49333 25.6447 9.49333 25.1734V12.8828C9.49333 10.6924 11.4393 8.91646 13.8393 8.91646C16.2394 8.91646 18.1853 10.6924 18.1853 12.8828V25.1734Z"
              fill="white"
            />
            <path
              d="M13.8736 6.82662C13.8736 6.35533 14.2557 5.97328 14.7269 5.97328L21.7123 5.97328C22.1836 5.97328 22.5656 6.35533 22.5656 6.82662L22.5656 19.1172C22.5656 21.3076 20.6197 23.0835 18.2196 23.0835C15.8195 23.0835 13.8736 21.3076 13.8736 19.1172V6.82662Z"
              fill="white"
            />
            <path
              d="M18.1852 12.3928C17.4764 9.45791 15.1108 8.87075 13.8769 8.9245V19.3127C14.1559 22.5572 16.5056 23.0337 18.1687 23.0874C18.1687 19.811 18.1852 15.7021 18.1852 12.3928Z"
              fill="#121212"
            />
          </svg>
          About Nata.Social
        </a>
      </div>
      <div className="pb-6">
        <a
          rel="noreferrer"
          href="https://developers.ceramic.network"
          target="_blank"
          className="flex gap-2 p-3 items-center"
        >
          <Image
            width={22}
            height={22}
            // className="m-2"
            src="/ceramicLogo.svg"
            alt=""
          />
          About Ceramic.Network
        </a>
      </div>
      <hr />
      <div className="flex mt-6 cursor-pointer p-3 rounded-lg hover:bg-teal-200  items-center">
        <a rel="noreferrer" href="mailto:info@nata.social" target="_blank">
          Contact
        </a>
      </div>
      <div className="flex cursor-pointer p-3 rounded-lg hover:bg-teal-200  items-center">
        <a
          rel="noreferrer"
          href="/"
          onClick={() => {
            // localStorage.removeItem('logged_in')
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </a>
      </div>
    </footer>
  );
};
