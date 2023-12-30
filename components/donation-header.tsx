import { parseAll } from "$std/yaml/mod.ts";

type CharityAttrs = {
  name: string;
  url: string;
};

const datafile = await Deno.readTextFile("data/charities.yaml");
const data = parseAll(datafile) as CharityAttrs[];

export default function DonationHeader() {
  return (
    <details class="donation-header w-screen py-2 text-center bg-pink-600 text-white">
      <summary class="text-sm font-bold">
        Donate today to help fight breast cancer
      </summary>
      <ul class="pt-4">
        {data.map((charity) => {
          return (
            <li class="pb-6">
              <a
                href={charity.url}
                title="Donate"
                class="text-pink-200 hover:text-white text-[2.8em] leading-0"
              >
                {charity.name}
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
