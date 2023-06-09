import ReactDOM from "react-dom";
import { updateMessageModal } from "../utils/store";
import styles from "../styles/styles.module.css";
import { Break } from "../assets/Break";
import { Button, Input, Textarea } from "@chakra-ui/react";
import { SendMessageModalProps } from "../utils/types";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { MessageOperations } from "../graphql/operations/message";
import { UserOperations } from "../graphql/operations/user";
import { ConversationOperations } from "../graphql/operations/conversation";
import { client } from "../graphql/apollo-client";
export const SendMessageModal = ({ participant }: SendMessageModalProps) => {
  const [messageBody, setMessageBody] = useState("");

  const [createMessage] = useMutation(
    MessageOperations.Mutations.createMessage
  );

  const { data, loading, error } = useQuery(
    ConversationOperations.Query.getConversationId,
    { variables: { participantId: participant.id } }
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMessage({
      variables: {
        conversationId: data.getConversationId.id,
        body: messageBody,
        media: [""],
        receiverId: participant.id,
      },
    });
    setMessageBody("");
    updateMessageModal(false);
  };
  const node = document.querySelector("#modal_root");
  if (!node) return null;
  return ReactDOM.createPortal(
    <>
      <div
        className={styles.backDrop}
        onClick={(e) => updateMessageModal(false)}>
        <div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}>
          <div className={styles.sendMessageModal}>
            <div className={styles.MessageModalHeader}>
              <div>new message</div>
              {data && (
                <Link
                  onClick={(e) => updateMessageModal(false)}
                  to={`/chat/${data.getConversationId.id}`}>
                  text{" "}
                </Link>
              )}
            </div>
            <Break />
            <div className={styles.ModalUserItem}>
              {/* <img
                src={participant.avatar}
                alt=''
              /> */}
              <div>status</div>
            </div>
            <form
              onSubmit={handleSubmit}
              className={styles.ModalInput}>
              <Textarea
                onChange={(e) => setMessageBody(e.target.value)}
                resize={"none"}
              />
              <div className={styles.modalFooter}>
                <Button>send photo</Button>
                <Button onClick={handleSubmit}>Send</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>,
    node
  );
};
