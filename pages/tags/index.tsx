import type { GetStaticProps } from 'next';
import Link from 'next/link';

import { AppMainContentBox, AppMainResponsiveBox } from '@/components/app';
import { getAllPosts, getUniqCountTagFor } from '@/lib/post';
import { css } from '@/styles/_stitches.config';
import {
  contentHoverBorderAndBackgroundBasicStyle,
  linkTagBasicStyle,
} from '@/styles/basicStyle';
import type { CountTag } from '@/types';

interface Props {
  countTag: CountTag;
}

export default function TagsPage({ countTag }: Props) {
  const entries = Object.entries(countTag);

  return (
    <AppMainResponsiveBox>
      <AppMainContentBox>
        <div className={block()}>
          <h1>Tags</h1>
          <div className={tagsBlock()}>
            {entries.map(([tag, count]) => (
              <Link key={tag} href={`/posts/${tag}`}>
                <a>
                  {tag}
                  <span>{count}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </AppMainContentBox>
    </AppMainResponsiveBox>
  );
}

const block = css({
  display: 'flex',
  flexDirection: 'column',
  '& h1': {
    fontSize: '1.5rem',
    fontWeight: '500',
    margin: '0 0 1rem 0',
  },
});

const tagsBlock = css({
  flexFlow: 'row wrap',
  display: 'flex',
  '& a': {
    ...linkTagBasicStyle,
    ...contentHoverBorderAndBackgroundBasicStyle,
    marginTop: '1rem',
    '& span': {
      color: '$cyan9',
      marginLeft: '0.35rem',
    },
  },
});

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPosts();
  const countTag = getUniqCountTagFor(allPosts);

  return {
    props: {
      countTag,
    },
  };
};
