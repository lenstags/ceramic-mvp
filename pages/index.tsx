import "tailwindcss/tailwind.css";

import { useEffect, useState } from "react";

import AuthPrompt from "./did-select-popup";
import Head from "next/head";
import type { NextPage } from "next";
import Post from "../components/post.component";
import { PostProps } from "../types";
import React from "react";
import { authenticateCeramic } from "../utils";
import { useCeramicContext } from "../context";

const Home: NextPage = () => {
  const clients = useCeramicContext();
  const { ceramic, composeClient } = clients;
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState<PostProps[] | []>([]);

  const createPost = async () => {
    if (ceramic.did !== undefined) {
      const profile = await composeClient.executeQuery(`
        query {
          viewer {
            basicProfile {
              id
              name
            }
          }
        }
      `);
      if (profile && profile.data?.viewer.basicProfile?.name) {
        const post = await composeClient.executeQuery(`
        mutation {
          createPosts(input: {
            content: {
              body: """${newPost}"""
              created: "${new Date().toISOString()}"
              profileId: "${profile.data.viewer.basicProfile.id}"
            }
          })
          {
            document {
              body
            }
          }
        }
      `);
        getPosts();
        setNewPost("");
        alert("Post created!");
      } else {
        alert(
          "Failed to fetch profile for authenticated user. Please register a profile."
        );
      }
    }
  };
  const getPosts = async () => {
    const profile = await composeClient.executeQuery(`
        query {
          viewer {
            id
            basicProfile {
              id
              name
              username
              emoji
            }
          }
        }
      `);
    localStorage.setItem("viewer", profile?.data?.viewer?.id);

    const following = await composeClient.executeQuery(`
      query {
        node(id: "${localStorage.getItem("viewer")}") {
          ...on CeramicAccount {
            followingList(last:300) {
              edges {
                node {
                  profile {
                    id
                    username
                    name
                    emoji
                    posts(last:30) {
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
            }
          }
        }
      }
    `);
    const explore = await composeClient.executeQuery(`
      query {
        postsIndex(last:300) {
          edges {
            node {
              id
              body
              created
              profile{
                id
                name
                username
                emoji
              }
            }
          }
        }
      }
    `);

    // TODO: Sort based off of "created date"
    const posts: PostProps[] = [];

    if (following.data !== undefined) {
      following.data?.node?.followingList.edges.map((profile) => {
        if (profile.node !== null) {
          profile.node.profile.posts.edges.map((post) => {
            if (post.node !== null) {
              posts.push({
                author: {
                  id: profile.node.profile.id,
                  name: profile.node.profile.name,
                  username: profile.node.profile.username,
                  emoji: profile.node.profile.emoji,
                },
                post: {
                  id: post.node.id,
                  body: post.node.body,
                  created: post.node.created,
                },
              });
            }
          });
        }
      });
    } else {
      explore.data?.postsIndex?.edges.map((post) => {
        posts.push({
          author: {
            id: post.node.profile.id,
            name: post.node.profile.name,
            username: post.node.profile.username,
            emoji: post.node.profile.emoji,
          },
          post: {
            id: post.node.id,
            body: post.node.body,
            created: post.node.created,
          },
        });
      });
    }
    posts.sort((a, b) => new Date(b.created) - new Date(a.created));
    console.log(posts);
    setPosts(posts?.reverse()); // reverse to get most recent msgs
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Nata.Social</title>
        {/* TODO: UPDATE FAVICON */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-full">
        <div className="  p-6 flex">
          <input
            value={newPost}
            maxLength={100}
            placeholder="Aye Modular Hackathon! What do you want to say?"
            className="border border-gray-300 rounded-lg px-4 w-10/12 py-2 outline-none "
            onChange={(e) => {
              setNewPost(e.target.value);
            }}
          />
          <button
            className="bg-black text-white rounded-lg w-2/12 ml-4  py-2"
            onClick={() => {
              createPost();
            }}
          >
            Post ➤
          </button>
        </div>
        <p className="ml-6 text-xl font-serif mt-2">Home</p>

        {/* <div className="flex px-4 py-2"> */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-2"> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 py-2">
          {posts.map((post) => (
            <Post author={post.author} post={post.post} key={post.post.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
