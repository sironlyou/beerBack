import styles from "../styles/styles.module.css";
import { SkeletonLoader } from "../utils/SkeletonLoader";
import { ChatHeaderProps } from "../utils/types";

import { useNavigate } from "react-router-dom";

export const ChatHeader = ({ userData, loading }: ChatHeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className={styles.chatHeader}>
      <div style={{ display: "flex" }}>
        {loading && (
          <SkeletonLoader
            count={1}
            height='40px'
            width='100%'
          />
        )}
        {!loading && (
          <div
            onClick={(e) => navigate(`/user/${userData?.username}`)}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}>
            <img
              className={styles.chatAvatar}
              src={userData?.avatar}
            />
            <div>{userData?.username}</div>
          </div>
        )}
      </div>
    </div>
  );
};
