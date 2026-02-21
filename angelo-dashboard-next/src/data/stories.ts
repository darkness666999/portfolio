export interface StoryLink {
  label: string;
  href: string;
}

export interface Story {
  slug: string;
  title: string;
  date: string;
  content: string[];
  links?: StoryLink[];
}

export const stories: Story[] = [
  {
    slug: "ephimero-uptime",
    title: "How Ephimero Stays Awake",
    date: "Feb 2026",
    content: [
      `Ephimero started as a WebRTC chat thingy. No accounts, no dTbE, no memory—just two people trying to talk. But yeah, someone still has to introduce them, so I made a signaler.`,
      `I threw it on a free-tier host because free is... free. Only problem: free servers sleep if you don’t poke them. Vercel, Render, any other non payed is the same story. If no one visits your app every 15 minutes or so, it disappears I mean for sometime you can visit the page and it comes back up. So the goal was simple: keep it alive without spending a dollar. Free-tier hustle engaged.`,
      `First attempt was an external cron job(cronjob.org if you dont want to re-invent the wheeel). Worked, kind of. But uptime now depends on another service. Second attempt was github actions also i was depending on another system but this time closer to my code... will no go into details but you better avoid it. Then things starting to get fuzzy, that is when i decided to actually reinvent the weel, <b>Ephyphonics</b> feel like a phony at the moment but it was for ephimero and it was orchestration and shout out what is happening,  it was clear if you depend on something, you should measure it. Metrics, latency, failures… let's call it what it is, yhea telemetry. And telemetry needs storage, so Redis stepped in. I had some Redis experience in the past so it was a smart move`,
      `Redis free-tier: 30MB, strict, sorted sets, timestamp-scored, self-pruning, seven days rolling window so we do not overstep the storage limit. Every ping logged. Every failure noticed. Zero drama.`,
      `Next I wrapped the worker and Redis connection in a minimal FastAPI layer, easy friendly no hazzle. Trigger the worker, log latency and status, prune old stuff, show a tiny dashboard. Still zero dollars spent. What started as “keep the server awake” became a mini orchestration engine. If something runs every 10 minutes(yhea self preservation kicked in, if 15 minutes is the limit lets visit the page sooner), it deserves to be watched. No cron, no external dependency, fully deterministic.`,
      `Reality check: stateless servers sleep as well, because why keep somehting up all time if they are.. stateless. Observability is useless if the orchestrator never wakes. So I made a tiny Python routine on my always-on computer, because yhea my power bill is "stable" just because my computer is always on. Anyway, it pokes FastAPI, keeps Redis alive, keeps the worker honest. Result: deterministic wake cycles, full telemetry, "zero-cost" uptime.`,
      `So te resume or <b>TLDR</b> for the techies, Ephimero is a secure P2P chat(yes nobody will see your communication or save your chat, even when that can also apply to your future self). Free-tier signaler takes naps. Cron = meh. Redis + FastAPI = accountable, self-pruning, zero-cost. Python on my always-on box = deterministic uptime. Snarky? Sure. Effective? Absolutely.`
    ],
    links: [
      { label: "View Ephymero Signaler", href: "https://ephimero.onrender.com/swagger-ui/index.html" },
      { label: "View Ephyphonic Orchestrator", href: "https://ephyphonic-hybu.vercel.app/" },
      { label: "The code", href: "https://github.com/darkness666999" }
    ]
  }
];
