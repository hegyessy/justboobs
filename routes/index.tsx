import { parseAll } from "$std/yaml/mod.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

export type BoobAttrs = {
  title: string;
  description: string;
  slug: string;
  date: Date | string;
  source: string;
  factoid: string;
  published: boolean;
};

export const handler: Handlers = {
  async GET(_req, ctx) {
    const datafile = await Deno.readTextFile("data/boobs.yaml");
    const data = parseAll(datafile) as BoobAttrs[];

    const published = data.filter((boob) => {
      return boob.published === true;
    });

    const boobs = published.sort((a, b) => {
      const boobA = new Date(a.date).getTime() / 1000;
      const boobB = new Date(a.date).getTime() / 1000;
      return boobB - boobA;
    });

    if (!boobs.length) {
      ctx.state.boobs = false;
      const resp = await ctx.render();
      return resp;
    }

    ctx.state.boobs = boobs;
    const resp = await ctx.render();
    return resp;
  },
};

export default function Home(props: PageProps) {
  const boobs = props.state.boobs as BoobAttrs[];

  return (
    <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-2 sm:grid-cols-1 items-center m-auto w-[80%] mt-6">
      {boobs
        ? boobs.map((boob: BoobAttrs) => {
          return (
            <div class="p-4 border bg-gray-50 rounded hover:border-pink-500 hover:shadow-lg hover:shadow-pink-200">
              <a
                href={props.url.href + "80085/" + boob.slug}
                class="hover:text-red-500"
              >
                <figure>
                  <img
                    class="object-cover border rounded"
                    src={props.url.href + boob.source}
                    alt={boob.title}
                  />
                  <figcaption class="capitalize text-center text-gray-400 pt-2 cursor-pointer">
                    {boob.title}
                  </figcaption>
                </figure>
              </a>
            </div>
          );
        })
        : (
          <div class="text-center min-w-full text-3xl">
            Coming soon.
          </div>
        )}
    </div>
  );
}
