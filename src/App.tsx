import React from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { SignUp } from "./Auth/Signup";
import { SignIn } from "./Auth/SignIn";
import { updateUser } from "./utils/store";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Feed } from "./Feed/Feed";
import { Chat } from "./Chat/Chat";
import { Button } from "@chakra-ui/react";
import styles from "./styles/styles.module.css";
import { UserOperations } from "./graphql/operations/user";
import { UserPage } from "./User/UserPage";
import { MessageOperations } from "./graphql/operations/message";
import { client } from "./graphql/apollo-client";
import { IConversationData, IConversationResponse } from "./utils/types";
import { ConversationOperations } from "./graphql/operations/conversation";

function App() {
  const [logoutUser] = useMutation(UserOperations.Mutations.logoutUser);
  const {
    data: user,
    // loading: postLoading,
    // error: postError,
  } = useQuery(UserOperations.Query.getUser, {
    onError: ({ message }) => {
      console.log(message);
      navigate("/signin");
    },
    onCompleted: (data) => {
      console.log(data);
      updateUser({
        avatar: data.getUser.avatar,
        email: data.getUser.email,
        id: data.getUser.id,
        username: data.getUser.username,
      });
    },
  });
  const {
    data: conversationData,
    // loading: postLoading,
    // error: postError,
    subscribeToMore,
  } = useQuery<IConversationData>(
    ConversationOperations.Query.getConversations,
    {
      onError: ({ message }) => {
        console.log(message);
      },
    }
  );
  const { data: ids } = useQuery(
    ConversationOperations.Query.getAllConversationIds
  );
  console.log("ids", ids);

  const { data: sub } = useSubscription(
    ConversationOperations.Subscription.conversationCreated,
    {
      onData: ({ client, data }) => {
        const { data: subscriptionData } = data;
        console.log("subData", data);
        const conversationData = client.readQuery({
          query: ConversationOperations.Query.getConversations,
        });

        client.writeQuery({
          query: ConversationOperations.Query.getConversations,
          data: {
            getConversations: [
              ...conversationData.getConversations,
              {
                conversation: subscriptionData.conversationCreated.conversation,
                latestMessage: null,
                userItem: subscriptionData.conversationCreated.userItem,
                __typename: "getConversationsResponse",
              },
            ],
          },
        });
        client.writeQuery({
          query: ConversationOperations.Query.getAllConversationIds,
          data: {
            getAllConversationIds: ids.getAllConversationIds.includes(
              subscriptionData.conversationCreated.conversation.id
            )
              ? ids.getAllConversationIds
              : [
                  ...ids.getAllConversationIds,
                  subscriptionData.conversationCreated.conversation.id,
                ],
          },
        });
      },
    }
  );

  const { data } = useSubscription(MessageOperations.Subscription.messageSent, {
    variables: {
      conversationId: ids ? ids.getAllConversationIds : [],
    },

    shouldResubscribe: true,
    onData: ({ client, data }) => {
      const { data: subscriptionData } = data;
      console.log(subscriptionData);
      const conversationData = client.readQuery({
        query: ConversationOperations.Query.getConversations,
      });
      var result = conversationData.getConversations.map(
        (el: IConversationResponse) =>
          el.conversation.id === subscriptionData.messageSent.conversation
            ? { ...el, latestMessage: subscriptionData.messageSent }
            : el
      );
      console.log("result", result);

      // const obj = conversationData.getConversations.findIndex(
      //   (obj: IConversationResponse) =>
      //     obj.conversation.id === subscriptionData.messageSent.conversation
      // );
      // console.log(obj);
      const messageData = client.readQuery({
        query: MessageOperations.Query.getMessages,
        variables: {
          conversationid: subscriptionData.messageSent.conversation,
        },
      });
      messageData
        ? client.writeQuery({
            variables: {
              conversationid: subscriptionData.messageSent.conversation,
            },
            query: MessageOperations.Query.getMessages,
            data: {
              getMessages: [
                ...messageData.getMessages,
                subscriptionData.messageSent,
              ],
            },
          })
        : console.log(data);
      client.writeQuery({
        query: ConversationOperations.Query.getConversations,
        variables: {
          conversationId: subscriptionData.messageSent.conversation,
        },
        data: { getConversations: result },
      });
    },
  });

  const onLogout = async () => {
    await logoutUser();
    navigate("/signin");
    updateUser({
      avatar: "",
      email: "",
      id: "",
      username: "",
    });
  };

  const navigate = useNavigate();
  return (
    <div className='App'>
      <header className={styles.header}>
        <Button onClick={(e) => navigate("/chat")}>chat</Button>
        <Button onClick={(e) => navigate("/feed")}>feed</Button>
        <Button onClick={onLogout}>Logout</Button>
      </header>
      <Routes>
        <Route
          path='/signin'
          element={<SignIn />}
        />
        <Route
          path='/signup'
          element={<SignUp />}
        />
        <Route
          path='/user/*'
          element={<UserPage />}
        />
        <Route
          path='/'
          element={<Navigate to={"/feed"} />}
        />
        <Route
          path='/feed'
          element={<Feed />}
        />
        <Route
          path='/chat/*'
          element={
            <Chat getConversations={conversationData?.getConversations || []} />
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
