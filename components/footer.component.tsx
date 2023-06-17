/* eslint-disable @next/next/no-html-link-for-pages */
export const Footer = () => {
  return (
    <footer className="px-6 py-4 bg-stone-100 space-y-2 text-xs">
      <div>
        <a rel="noreferrer" href="https://www.nata.social" target="_blank">
          About Nata.Social
        </a>
      </div>
      <div>
        <a
          rel="noreferrer"
          href="https://developers.ceramic.network"
          target="_blank"
        >
          About Ceramic.Network
        </a>
      </div>
      <div>
        <a rel="noreferrer" href="mailto:info@nata.social" target="_blank">
          Contact
        </a>
      </div>
      <div>
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
