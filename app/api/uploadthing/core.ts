import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { validateRequest } from "@/lib/auth";

const f = createUploadthing();

export const ourFileRouter = {
  listingImageUploader: f({
    image: {
      maxFileCount: 6,
      maxFileSize: "4MB",
    },
  })
    .middleware(async () => {
      const { user } = await validateRequest();

      if (!user) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId: user.id };
    })
    .onUploadComplete(({ file, metadata }) => {
      return {
        fileKey: file.key,
        uploadedBy: metadata.userId,
        url: file.ufsUrl,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
