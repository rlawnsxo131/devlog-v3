import type { ObjectIdentifier } from '@aws-sdk/client-s3';
import {
  DeleteObjectsCommand,
  ListObjectsCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { defaultProvider } from '@aws-sdk/credential-provider-node';

const REGION = 'ap-northeast-2';
const BUCKET = 'devlog-v3.juntae.kim';

const client = new S3Client({
  region: REGION,
  credentials: defaultProvider({
    profile: 'admin',
  }),
});

async function getDeleteChunkKeys() {
  const result = new Set<string>();
  const listCommand = new ListObjectsCommand({
    Bucket: BUCKET,
  });
  const objectList = await client.send(listCommand);
  if (objectList.Contents?.length) {
    for (const content of objectList.Contents) {
      const { LastModified } = content;
      if (LastModified) {
        const today = new Date();
        const lastModifiedDate = new Date(LastModified);
        const diffTime = Math.abs(today.getTime() - lastModifiedDate.getTime());
        const diffDay = Math.ceil(diffTime / (1000 * 3600 * 24));
        if (diffDay >= 3 && content.Key) {
          result.add(content.Key);
        }
      }
    }
  }
  return result;
}

async function removeOldChunks() {
  const chunkKeys = await getDeleteChunkKeys();
  if (chunkKeys.size) {
    const objects: ObjectIdentifier[] = Array.from(chunkKeys).map((key) => ({
      Key: key,
    }));
    const deleteObjectsCommand = new DeleteObjectsCommand({
      Bucket: BUCKET,
      Delete: {
        Objects: objects,
      },
    });
    const result = await client.send(deleteObjectsCommand);
    return result;
  }
  console.log('no chunks to delete');
}

removeOldChunks()
  .then((result) => {
    console.log('success to remove old chunks');
    console.log('Deleted length: ', result?.Deleted?.length);
    console.log('remove result: ', JSON.stringify(result));
  })
  .catch((err) => {
    console.error('fail to remove old chunks');
    console.error(err);
  });
