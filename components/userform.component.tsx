import { useEffect, useState } from "react";

import { Profile } from "../types";
import { authenticateCeramic } from "../utils";
import { useCeramicContext } from "../context";

export const Userform = () => {
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;

  const [profile, setProfile] = useState<Profile | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    await authenticateCeramic(ceramic, composeClient);
    await getProfile();
  };

  const getProfile = async () => {
    setLoading(true);
    if (ceramic.did !== undefined) {
      const profile = await composeClient.executeQuery(`
        query {
          viewer {
            basicProfile {
              id
              name
              username
              description
              gender
              emoji
            }
          }
        }
      `);
      const viewer: any = profile?.data?.viewer;
      setProfile(viewer.basicProfile);
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    setLoading(true);
    if (ceramic.did !== undefined) {
      const update = await composeClient.executeQuery(`
        mutation {
          createBasicProfile(input: {
            content: {
              name: "${profile?.name}"
              username: "${profile?.username}"
              description: "${profile?.description}"
              gender: "${profile?.gender}"
              emoji: "${profile?.emoji}"
            }
          }) 
          {
            document {
              name
              username
              description
              gender
              emoji
            }
          }
        }
      `);
      if (update.errors) {
        alert(update.errors);
      } else {
        alert("Profile updated!");
        setLoading(true);
        const updatedProfile = await composeClient.executeQuery(`
        query {
          viewer {
            basicProfile {
              id
              name
              username
              description
              gender
              emoji
            }
          }
        }
      `);
        const viewer: any = updatedProfile?.data?.viewer;

        setProfile(viewer.basicProfile);
        const followSelf = await composeClient.executeQuery(`
        mutation {
          createFollowing(input: {
            content: {
              profileId: "${viewer.basicProfile.id}"
            }
          }) 
          {
            document {
              profileId
            }
          }
        }
      `);
        console.log(followSelf);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      {profile === undefined && ceramic.did === undefined ? (
        <div className="content">
          <button
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </button>
        </div>
      ) : (
        <div className="{styles.formGroup}">
          <div className="flex items-center">
            <span className="w-2/12">Username</span>
            <input
              className=" w-10/12 px-4 py-2 mx-4 my-2 border border-gray-200 rounded-lg outline-none"
              type="text"
              placeholder="5 charactes minimum..."
              defaultValue={profile?.username || ""}
              onChange={(e) => {
                setProfile({ ...profile, username: e.target.value });
              }}
            />
          </div>

          <div className="flex items-center">
            <span className="w-2/12">Full name</span>
            <input
              className=" w-10/12 px-4 py-2 mx-4 my-2 border border-gray-200 rounded-lg outline-none"
              type="text"
              defaultValue={profile?.name || ""}
              onChange={(e) => {
                setProfile({ ...profile, name: e.target.value });
              }}
            />
          </div>

          <div className="flex items-center">
            <span className="w-2/12">Bio</span>
            <input
              className=" w-10/12 px-4 py-2 mx-4 my-2 border border-gray-200 rounded-lg outline-none"
              type="text"
              defaultValue={profile?.description || ""}
              onChange={(e) => {
                setProfile({ ...profile, description: e.target.value });
              }}
            />
          </div>
          <div className="flex items-center">
            <span className="w-2/12">Gender</span>
            <input
              className=" w-2/12 px-4 py-2 mx-4 my-2 border border-gray-200 rounded-lg outline-none"
              type="text"
              defaultValue={profile?.gender || ""}
              onChange={(e) => {
                setProfile({ ...profile, gender: e.target.value });
              }}
            />
          </div>
          <div className="flex items-center">
            <span className="w-2/12">Emoji</span>
            <input
              className=" w-2/12 px-4 py-2 mx-4 my-2 border border-gray-200 rounded-lg outline-none"
              type="text"
              defaultValue={profile?.emoji || ""}
              onChange={(e) => {
                setProfile({ ...profile, emoji: e.target.value });
              }}
              maxLength={2}
            />
          </div>
          <div className="mt-4 text-right">
            <button
              className="bg-black text-white rounded-lg w-2/12 py-2"
              onClick={() => {
                updateProfile();
              }}
            >
              {loading ? "..." : "Save"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
