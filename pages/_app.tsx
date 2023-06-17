import "../styles/globals.css";

import React, { useEffect, useState } from "react";

import type { AppProps } from "next/app";
import AuthPrompt from "./did-select-popup";
import { CeramicWrapper } from "../context";
import { Footer } from "../components/footer.component";
import { Sidebar } from "../components/sidebar.component";
import { authenticateCeramic } from "../utils";
import { useCeramicContext } from "../context";

type Profile = {
  id?: any;
  name?: string;
  username?: string;
  description?: string;
  gender?: string;
  emoji?: string;
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;
  const [profile, setProfile] = useState<Profile | undefined>();

  const handleLogin = async () => {
    await authenticateCeramic(ceramic, composeClient);
    await getProfile();
  };

  const getProfile = async () => {
    if (ceramic.did !== undefined) {
      const profile = await composeClient.executeQuery(`
        query {
          viewer {
            id
            basicProfile {
              id
              name
              username
            }
          }
        }
      `);

      const viewerObj: any = profile?.data?.viewer;

      localStorage.setItem("viewer", viewerObj.id);
      setProfile(viewerObj.basicProfile);
    }
  };
  // Update to include refresh on auth
  useEffect(() => {
    if (localStorage.getItem("logged_in")) {
      handleLogin();
      getProfile();
    }
  }, []);

  return (
    <div className=" flex h-screen w-full ">
      {" "}
      <CeramicWrapper>
        <Sidebar
          name={profile?.name}
          username={profile?.username}
          id={profile?.id}
        />
        <div className="relative flex h-screen  w-9/12 bg-b lue-700">
          <AuthPrompt />

          <Component {...pageProps} ceramic />
          <Footer />
        </div>
      </CeramicWrapper>
    </div>
  );
};

export default MyApp;
