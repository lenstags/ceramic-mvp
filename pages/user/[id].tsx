import { Author, Posts } from "../../types";
import { useEffect, useState } from "react";

import Head from "next/head";
import type { NextPage } from "next";
import Post from "../../components/post.component";
import { useCeramicContext } from "../../context";
import { useRouter } from "next/router";

const UserProfile: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;
  const [profile, setProfile] = useState<Author | {}>({});
  const [posts, setPosts] = useState<Posts[] | []>([]);

  const getData = async () => {
    const data = await composeClient.executeQuery(`
      query {
        node (id: "${id}") {
          ... on BasicProfile {
            id
            username
            name
            emoji
            posts (last:300) {
              edges {
                node {
                  id
                  body
                  created
                }
              }
            }
          }
        }
      }
    `);
    console.log(data);
    setProfile({
      name: data.data.node.name,
      username: data.data?.node.username,
      id: data.data.node.id,
      emoji: data.data.node.emoji,
    });

    setPosts(data.data.node.posts);
  };

  // TODO: Add check to see if viewer is already following this account to
  //       prevent dupes
  const follow = async () => {
    const follow = await composeClient.executeQuery(`
      mutation {
        createFollowing(input: {
          content: {
            profileId: "${profile.id}"
          }
        }) 
        {
          document {
            profileId
          }
        }
      }
    `);
    console.log(follow);
    alert(`Followed ${profile.name}.`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Head>
        <title>
          {profile !== undefined
            ? `${profile?.username}'s Profile`
            : "No profile"}
        </title>
      </Head>
      {profile !== undefined ? (
        <div className="content">
          <div className="bg-white border border-gray-300 rounded-lg">
            <div className="{userStyles.user}">
              <div className="">{profile.emoji}</div>
              <div className="">
                <div>{profile.name}</div>
                <div>@{profile.username}</div>
              </div>
            </div>
            <div className="{userStyles.follow}">
              <button
                onClick={() => {
                  follow();
                }}
              >
                Follow {`${profile.username}`}
              </button>
            </div>
          </div>
          {posts?.edges !== undefined ? (
            <div className="{styles.postContainer}">
              {posts.edges
                .filter((post) => post.node !== null)
                .map((post) => (
                  <Post author={profile} post={post.node} key={post.node.id} />
                ))}
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="content"></div>
      )}
    </>
  );
};

export default UserProfile;
