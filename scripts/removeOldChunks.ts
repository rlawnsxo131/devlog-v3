import {
  S3Client,
  ListObjectsCommand,
  DeleteObjectsCommand,
  ObjectIdentifier,
} from '@aws-sdk/client-s3';

const REGION = 'ap-northeast-2';
const BUCKET = 'devlog-v3.juntae.kim';

const client = new S3Client({
  region: REGION,
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
      const today = new Date();
      const lastModifiedDate = new Date(LastModified);
      const diffTime = Math.abs(today.getTime() - lastModifiedDate.getTime());
      const diffDay = Math.ceil(diffTime / (1000 * 3600 * 24));
      if (diffDay >= 3 && content.Key) {
        result.add(content.Key);
      }
    }
  }
  return result;
}

async function removeOldChunks() {
  const chunkKeys = await getDeleteChunkKeys();
  const objects: ObjectIdentifier[] = Array.from(chunkKeys).map((key) => ({
    Key: key,
  }));
  if (chunkKeys.size) {
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
    console.log('remove result: ', JSON.stringify(result));
  })
  .catch((err) => {
    console.log('fail to remove old chunks');
    console.error(err);
  });
