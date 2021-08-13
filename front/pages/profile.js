import AppLayout from "../components/AppLayout";
import Head from "next/head";
import NicknameEditForm from "../components/NicknameEditForm";
import FollowList from "../components/FollowList";

const profile = () => {
  const followingList = [
    { nickname: "jhkevin21" },
    { nickname: "jaehan" },
    { nickname: "hello" },
    { nickname: "Test" },
  ];
  const followerList = [
    { nickname: "kevin.kim9685" },
    { nickname: "kevin" },
    { nickname: "okay" },
    { nickname: "Nice!" },
  ];

  return (
    <>
      <Head>
        <title>Profile | Share Thoughts</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="Following List" data={followingList} />
        <FollowList header="Follower List" data={followerList} />
      </AppLayout>
    </>
  );
};

export default profile;
