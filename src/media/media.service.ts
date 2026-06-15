import { Injectable } from "@nestjs/common";

import {
  PutObjectCommand,
} from "@aws-sdk/client-s3";

import { s3 } from "../common/aws/s3";

import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class MediaService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async upload(
    file: Express.Multer.File,
  ) {
    const key =
      Date.now() +
      "-" +
      file.originalname;

    await s3.send(
      new PutObjectCommand({
        Bucket:
          process.env.AWS_BUCKET_NAME,

        Key: key,

        Body: file.buffer,

        ContentType:
          file.mimetype,
      }),
    );

    const url =
      `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return this.prisma.media.create({
      data: {
        fileName:
          file.originalname,

        mimeType:
          file.mimetype,

        size: file.size,

        key,

        url,
      },
    });
  }
}