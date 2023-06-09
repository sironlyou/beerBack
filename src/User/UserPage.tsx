import { useMutation, useQuery } from "@apollo/client";
import { UserOperations } from "../graphql/operations/user";
import { useLocation, useRoutes } from "react-router-dom";
import { $messageModal, $user, updateMessageModal } from "../utils/store";
import styles from "../styles/styles.module.css";
import { Button } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { Friends } from "./Friends";
import { SendMessageModal } from "./SendMessageModal";
export const UserPage = () => {
  const location = useLocation();
  const userId = location.pathname.substring(6);
  const user = useStore($user);
  const [sendFriendRequest] = useMutation(
    UserOperations.Mutations.sendFriendRequest
  );
  const [acceptFriendRequest] = useMutation(
    UserOperations.Mutations.acceptFriendRequest
  );

  const [cancelFriendRequest] = useMutation(
    UserOperations.Mutations.cancelFriendRequest
  );

  const [removeFromFriends] = useMutation(
    UserOperations.Mutations.removeFromFriends
  );

  const { data, loading } = useQuery(UserOperations.Query.getUserInfo, {
    variables: { userId: userId },
  });
  const messageModal = useStore($messageModal);
  return (
    <>
      {data && (
        <div className={styles.userWrap}>
          <div className={styles.userInfoWrap}>
            <img
              className={styles.userPageAvatar}
              src={data.getUserInfo.avatar}
              alt=''
            />
            <div className={styles.userPageUsername}>
              {data.getUserInfo.username}
            </div>
            <div>
              username; {user.username} user on page {userId}
            </div>
            {user.id !== data.getUserInfo.id && (
              <Button onClick={(e) => updateMessageModal(true)}>
                Text message
              </Button>
            )}
            {messageModal && (
              <SendMessageModal participant={data.getUserInfo} />
            )}
            {user.id === data.getUserInfo.id ? (
              <Button>Edit</Button>
            ) : data.getUserInfo.friends.includes(user.id) ? (
              <Button
                onClick={async (e) =>
                  await removeFromFriends({
                    variables: {
                      recieverUserId: data.getUserInfo.id,
                    },
                  })
                }>
                Friends
              </Button>
            ) : data.getUserInfo.incomingRequests.includes(user.id) ? (
              <Button
                onClick={async (e) =>
                  await cancelFriendRequest({
                    variables: {
                      recieverUserId: data.getUserInfo.id,
                    },
                  })
                }>
                Request sent
              </Button>
            ) : data.getUserInfo.sentRequests.includes(user.id) ? (
              <Button
                onClick={async (e) =>
                  await acceptFriendRequest({
                    variables: {
                      senderUserId: data.getUserInfo.id,
                    },
                  })
                }>
                request received
              </Button>
            ) : (
              <Button
                onClick={async (e) =>
                  await sendFriendRequest({
                    variables: {
                      recieverUserId: data.getUserInfo.id,
                    },
                  })
                }>
                send friend request{" "}
              </Button>
            )}
          </div>
        </div>
      )}
      {data && <Friends userId={data.getUserInfo.id} />}
      {/* {data && (
        <div>
          <div>{data.getUserInfo.friends.length}</div>
          <div>folowers {data.getUserInfo.incomingRequests.length}</div>
        </div>
      )} */}
    </>
  );
};
