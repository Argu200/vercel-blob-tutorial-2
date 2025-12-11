
// Force runtime rendering so Blob calls run at request time (SSR), not during build
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import Image from "next/image";
import Link from "next/link";
import { list } from "@vercel/blob";

export default async function Gallery() {
  // Fetch images from Vercel Blob storage
  const { blobs } = await list();

  // Filter for only image files (optional)
  const images = blobs; // or blobs.filter(b => /\.(png|jpe?g|webp|gif|bmp|tiff)$/i.test(b.pathname));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-700">Image Gallery</h1>
          <Link
            href="/"
            className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow transition-colorsrounded-xl shadow-lg">
            <p className="text-xl text-gray-600">
              No images found. Upload some images to get started!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image, index) => {
            const name = image.pathname.split("/").pop() || `Image ${index + 1}`;
            return (
              <div
                key={image.url}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={image.url}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-700 text-sm truncate">{name}</p>
                  <a
                    href={image.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 text-xs hover:underline mt-1 block"
                  >
                    View full size
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
