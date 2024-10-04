'use server';

import { r2 } from '@/lib/utils/r2';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuid } from 'uuid';

type getFileSignedUrlActionReturn =
  | {
      isError: true;
      error: string;
      description?: string;
    }
  | {
      isError: false;
      signedUrl: string;
      url: string;
    };

export async function getFileSignedUrlAction({ contentType }: { contentType: string }): Promise<getFileSignedUrlActionReturn> {
  try {
    const fileId = uuid();

    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileId,
        ContentType: contentType as string,
      }),
      { expiresIn: 3600 },
    );

    return { isError: false, signedUrl, url: `${process.env.R2_PUBLIC_SUB_DOMAIN}/${fileId}` };
  } catch (err) {
    if (err instanceof Error)
      return {
        isError: true,
        error: 'Failed to upload image!',
        description: err.message,
      };
    return {
      isError: true,
      error: 'Failed to upload image!',
    };
  }
}
