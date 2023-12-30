import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - 80085 not found</title>
      </Head>
      <div class="px-4 py-8 mx-auto">
        <div class="max-w-screen-md mx-auto h-screen flex flex-col items-center justify-center">
          <a href="/" title="Take me home" class="text-blue-500">Error 80085</a>
        </div>
      </div>
    </>
  );
}
