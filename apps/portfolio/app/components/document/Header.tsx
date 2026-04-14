import Mikan from "mikanjs";

import Tooltip from "@/components/ui/Tooltip";

import { styles } from "./Header.css";

interface Props {
  title: string;
  createdAt: string;
  updatedAt?: string;
  authors?: string[];
}

const formatDateTime = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const githubAvatar = (author: string) => `https://github.com/${author}`;
const githubProfile = (author: string) =>
  `https://github.com/${author}.png?s=32`;

export default function Header({
  title,
  createdAt,
  updatedAt,
  authors,
}: Props) {
  return (
    <div className={styles.header}>
      <div>
        <h1
          className={styles.title}
          dangerouslySetInnerHTML={{
            __html: Mikan(title, { style: "", className: styles.titleWord }),
          }}
        />
        <p className={styles.meta}>
          <time dateTime={new Date(createdAt).toISOString()} className={styles.date}>
            {formatDateTime(createdAt)}
          </time>
          {updatedAt && (
            <>
              <span>/</span>
              <time dateTime={new Date(updatedAt).toISOString()} className={styles.date}>
                {formatDateTime(updatedAt)}
              </time>
            </>
          )}
        </p>
      </div>
      {authors && authors.length > 0 && (
        <div className={styles.authors}>
          {authors.map((author) => (
            <a
              key={author}
              href={githubAvatar(author)}
              className={styles.author}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Tooltip text={author}>
                <img
                  src={githubProfile(author)}
                  alt={author}
                  width={32}
                  height={32}
                  className={styles.avatar}
                />
              </Tooltip>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
