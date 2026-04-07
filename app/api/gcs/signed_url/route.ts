import { NextRequest, NextResponse } from 'next/server';
import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  projectId: process.env.GS_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileName, contentType, folder = 'uploads' } = body;

    if (!fileName || !contentType) {
      return NextResponse.json(
        { error: 'fileName y contentType son obligatorios' },
        { status: 400 }
      );
    }

    const bucketName = process.env.GS_BUCKET_NAME;

    if (!bucketName) {
      return NextResponse.json(
        { error: 'GS_BUCKET_NAME no configurado' },
        { status: 500 }
      );
    }

    const safeFileName = fileName.replace(/\s+/g, '-');
    const objectKey = `${folder}/${crypto.randomUUID()}-${safeFileName}`;

    const file = storage.bucket(bucketName).file(objectKey);

    const [signedUrl] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType,
    });

    return NextResponse.json({
      signedUrl,
      key: objectKey,
      publicUrl: `https://storage.googleapis.com/${bucketName}/${objectKey}`,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: 'No se pudo generar la signed URL' },
      { status: 500 }
    );
  }
}