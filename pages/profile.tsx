import Head from "next/head";
import type { NextPage } from "next";
import { Userform } from "../components/userform.component";

const ProfilePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="p-6 w-full">
        <div>
          <p className="text-xl font-serif mt-2">Profile settings</p>
          <div className="border border-stone-200 mt-6 rounded-lg shadow-lg px-6 py-4 bg-stone-100">
            <Userform />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
