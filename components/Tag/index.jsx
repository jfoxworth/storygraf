import React from "react";
import Link from "next/link";
import styles from "./styles.module.css";

const Tag = ({ tag = {} }) => {
  return (
    <>
      <Link
        href="/Tag/[pTagId]/[tagId]"
        as={`/Tag/${tag.parent_tag_id}/${tag.id}`}
      >
        <div
          className={styles.TagBlock}
          style={{
            backgroundColor: tag.data.tagColor,
            color: tag.data.textColor,
          }}
        >
          <div className={styles.TagInner}>{tag.data?.tagName}</div>
        </div>
      </Link>
    </>
  );
};

export default Tag;
