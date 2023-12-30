import { parseAll } from "$std/yaml/mod.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { BoobAttrs } from "../index.tsx";

export const handler: Handlers = {
  async GET(_req, ctx) {
    const datafile = await Deno.readTextFile("data/boobs.yaml");
    const data = parseAll(datafile) as BoobAttrs[];
    const boob = data.filter((item: BoobAttrs) => {
      return item.slug === ctx.params.slug;
    });

    ctx.state.boob = boob;
    const resp = await ctx.render();
    return resp;
  },
};

export default function Greet(props: PageProps) {
  const boobs = props.state.boob as BoobAttrs[];
  const boob = boobs[0];
  return (
    <div class="flex flex-col items-center text-center">
      <a href="/" title="Back to gallery" class="text-pink-500 mb-6">
        Back to gallery
      </a>
      <header>
        <h1 class="font-bold capitalize">{boob.title}</h1>
        <p>{boob.factoid}</p>
      </header>
      <img
        class="lg:w-[50%] lg:h-[50%] m-6"
        src={`${props.url.origin}/${boob.source}`}
        alt={boob.title}
      />
    </div>
  );
}
