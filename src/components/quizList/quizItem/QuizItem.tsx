import { type FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./QuizItem.module.scss";
import {
  closedIcon,
  successIcon,
  copyIcon,
  authOnlyIcon,
} from "../../../assets";
import { type TQuiz } from "../../../store/reducer/quizConstructor/quizSlice";

interface propsType {
  iconURL: string;
  title: string;
  closed: boolean;
  authOnly: boolean;
  id: string;
  code: string;
}

export const QuizItem: FC<propsType> = ({
  iconURL,
  title,
  authOnly,
  closed,
  code,
  id,
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const navigate = useNavigate();

  const getQuizDetails = async () => {
    navigate(`../quiz-generator/${id}`);
  };

  return (
    <div className={styles.container} onClick={getQuizDetails}>
      <div className={styles.iconContainer}>
        {authOnly ? <img src={authOnlyIcon} alt="only for auth users" /> : null}
        {closed ? <img src={closedIcon} alt="closed for users" /> : null}
      </div>
      <div className={styles.infoContainer}>
        <img src={iconURL} alt="icon" />
        <div className={styles.title}>{title}</div>
      </div>
      <div
        className={styles.code}
        onClick={(e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(code).catch(() => false);
          setIsCopied(() => {
            setTimeout(() => {
              setIsCopied(false);
            }, 1000);
            return true;
          });
        }}
      >
        {code}
        &nbsp;
        {isCopied ? (
          <img
            className={`${styles.isCopied} ${isCopied ? styles.show : null}`}
            src={successIcon}
            alt=""
            width={15}
            height={15}
          />
        ) : (
          <img
            src={copyIcon}
            className={styles.copyIcon}
            alt=""
            width={15}
            height={15}
          />
        )}
      </div>
    </div>
  );
};
