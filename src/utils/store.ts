import { createEvent, createStore } from "effector";
import { GetMessagesQuery, User } from "./types";

export const updateUser = createEvent<User>();
export const $user = createStore<User>({
  avatar: "",
  email: "",
  id: "",
  username: "",
}).on(updateUser, (_, newUser) => newUser);

// $user.watch((state) => console.log(state));
export const updateModal = createEvent<boolean>();
export const $modal = createStore<boolean>(false).on(
  updateModal,
  (_, newModal) => newModal
);
// $modal.watch((state) => console.log(state));
export const updateComment = createEvent<string>();
export const $comment = createStore<string>("").on(
  updateComment,
  (_, newComment) => newComment
);
export const commentReply = createEvent<string>();
export const $reply = createStore<string>("").on(
  commentReply,
  (_, newComment) => newComment
);

export const updateConversation = createEvent<GetMessagesQuery>();
export const $conversation = createStore<GetMessagesQuery>({
  conversationid: "",
  participantId: "",
}).on(updateConversation, (_, newConversation) => newConversation);
$conversation.watch((state) => console.log(state));
