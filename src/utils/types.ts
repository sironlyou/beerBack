import { Dispatch, SetStateAction } from "react";

export interface ChatBodyProps {
  messages?: IMessage[];
  loading: boolean;
}
export interface ChatHeaderProps {
  userData?: User;
  loading: boolean;
}
export interface ChatFooterProps {
  userData?: User;
  conversationId: string;
}
export interface SubscriptionData {
  subscriptionData: {
    data: {
      messageSent: IMessage;
    };
  };
}
export interface IMessage {
  body: string;
  conversation: string;
  createdAt: string;

  id: string;

  media: [string];
  readBy: [string];
  senderId: string;
  updatedAt: string;
  visibleFor: [string];
}
export interface GetMessagesData {
  getMessages: IMessage[];
}
export interface IMessageData {
  messages: IMessage[];
  userInfo: User;
}
export interface getLatestMessage {
  getLatestMessage: IMessage;
}
export interface IUnreadCount {
  getUnreadCount: number;
}
export interface ConversationItemProps {
  conversation: IConversation;
  userItem: User;
  latestMessage: Message;
}
export interface IConversation {
  id: string;
  messages: string[];
  participants: string[];
  visibleFor: string[];
}
export interface IConversationResponse {
  conversation: IConversation;
  userItem: User;
  latestMessage: Message;
  unreadCount: number;
}
export interface IConversationData {
  getConversations: IConversationResponse[];
}

export interface getUsersData {
  getUsers: User[];
}
export interface MessageItemProps {
  message: IMessage;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}
export interface SearchProps {
  data?: User[];
}
export interface ICreateConversation {
  conversation: IConversation;
  userItem: User;
}
export interface ConversationData {
  createConversation: ICreateConversation;
}
export interface UserItemProps {
  user: User;
  onClick: (userId: string) => void;
}
export interface CommentFormProps {
  postId: string;
  author: string;
}
export interface IComment {
  id: string;
  postId: string;
  body: string;
  createdAt: string;
  author: string;
}
export interface ICommentData {
  getComments: getCommentResponse[];
}
export interface getCommentResponse {
  comment: IComment;
  user: User;
}
export interface CommentsProps {
  postId: string;
}
export interface IPostData {
  getPosts: getPostsResponse[];
}
export interface IPost {
  id: string;
  author: string;
  origin: string;
  alcohol: string;
  value: string;
  price: string;
  taste: string;
  quality: string;
  alcoholHit: string;
  beerName: string;
  reviewBody: string;
  rating: string;
  image: string;
  likes: [string];
  createdAt: string;
  comments: [string];
}
export interface PostProps {
  commentsOpen: boolean;
  setCommentsOpen: Dispatch<SetStateAction<boolean>>;
}
export interface getPostsResponse {
  post: IPost;
  user: User;
}
export interface PostBodyProps {
  alcohol: string;
  alcoholHit: string;
  origin: string;
  beerName: string;
  value: string;
  image: string;
  price: string;
  quality: string;
  rating: string;
  reviewBody: string;
  taste: string;
}
export interface PostFooterProps {
  likes: [string];
  id: string;
  comments: [string];
  setCommentsOpen: Dispatch<SetStateAction<boolean>>;
  commentsOpen: boolean;
}
export interface SkeletonLoaderProps {
  count: number;
  height: string;
  width: string;
}
export interface PostHeaderProps {
  avatar: string;
  username: string;
  createdAt: string;
}
export interface User {
  email: string;
  avatar: string;
  id: string;
  username: string;
  sentRequests: string[];
  incomingRequests: string[];
  friends: string[];
}
export interface Message {
  conversation: string;
  senderId: string;
  body: string;
  media: string[];
  createdAt: string;
  updatedAt: string;
  readBy: string[];
  visibleFor: string[];
}
export interface GetMessagesQuery {
  conversationid: string;
  participantId: string;
}
export interface FriendsProps {
  userId: string;
}
export interface getFriendsData {
  getFriends: User[];
}
export interface FriendItemProps {
  user: User;
}
export interface LocalUser {
  email: string;
  avatar: string;
  id: string;
  username: string;
}
export interface SendMessageModalProps {
  participant: User;
}
