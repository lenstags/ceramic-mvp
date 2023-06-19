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
    console.log("ceramic.did ", ceramic.did);
    console.log("swwwwww", localStorage.getItem("ceramic:eth_did"));

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
      console.log("ceramic.did2 ", ceramic.did);

      const viewerObj: any = profile?.data?.viewer;
      console.log("ccccc ", viewerObj);
      localStorage.setItem("viewer", viewerObj.id);
      setProfile(viewerObj.basicProfile);
    }
  };
  // Update to include refresh on auth
  useEffect(() => {
    const fetchData = async () => {
      await handleLogin();
      await getProfile();
    };

    console.log("esta logeuado? ", localStorage.getItem("logged_in"));
    if (localStorage.getItem("logged_in")) {
      console.log("siii");
      fetchData();
    }
  }, []);

  return (
    <div className=" flex h-screen w-full ">
      <CeramicWrapper>
        <Sidebar
          name={profile?.name}
          username={profile?.username}
          id={profile?.id}
        />
        <div className="relative flex h-screen  w-8/12 bg-b lue-700">
          <AuthPrompt />
          <Component {...pageProps} ceramic />
        </div>
        <Footer />
      </CeramicWrapper>
    </div>
  );
};

export default MyApp;
