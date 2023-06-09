import { useQuery } from "@apollo/client";
import { FriendsProps, getFriendsData } from "../utils/types";
import { UserOperations } from "../graphql/operations/user";
import styles from "../styles/styles.module.css";
import { FriendItem } from "./FriendItem";
export const Friends = ({ userId }: FriendsProps) => {
  const { data, loading, error } = useQuery<getFriendsData>(
    UserOperations.Query.getFriends,
    {
      variables: { userId: userId },
    }
  );

  return (
    <>
      <div className={styles.Friends}>
        <h2>Friends</h2>
        <div className={styles.friendItemsWrap}>
          {data &&
            data.getFriends.map((item) => (
              <FriendItem
                user={item}
                key={item.id}
              />
            ))}
        </div>
      </div>
    </>
  );
};
