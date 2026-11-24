import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, MapPin, Clock, Phone, Star, Menu, X, MessageCircle } from "lucide-react";
import hero from "@/assets/hero-tattoo.jpg";
import fineline from "@/assets/fineline.jpg";
import studio from "@/assets/studio.jpg";
import sketch from "@/assets/sketch.jpg";
import { BIZ, waLink, WA_DEFAULT } from "@/components/site/data";
import { useScrollFx } from "@/components/site/useScrollFx";

const TITLE = "Gaivota Tattoo Estúdio | Tatuagem em Icaraí, Niterói";
const DESC =
  "Estúdio de tatuagem em Icaraí, Niterói. Desenhos autorais, atendimento personalizado e ambiente limpo. Nota 5,0 no Google. Agende pelo WhatsApp.";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  name: "Gaivota Tattoo Estúdio Icaraí",
  telephone: BIZ.phoneE164,
  url: BIZ.site,
  address: { "@type": "PostalAddress", streetAddress: "Av. Roberto Silveira, 368", addressLocality: "Niterói", addressRegion: "RJ", postalCode: "24230-161", addressCountry: "BR" },
  geo: { "@type": "GeoCoordinates", latitude: -22.905657, longitude: -43.104448 },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], opens: "08:00", closes: "18:00" }],
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: BIZ.reviews },
  sameAs: [BIZ.facebook],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Index,
});

const NAV = [
  ["Estúdio", "#estudio"],
  ["Serviços", "#servicos"],
  ["Processo", "#processo"],
  ["Dúvidas", "#faq"],
  ["Contato", "#contato"],
] as const;

function Seagull({ className = "" }: { className?: string }) {
  // Signature: the needle "draws" a seagull in a single stroke.
  return (
    <svg viewBox="0 0 400 200" className={className} fill="none" aria-hidden="true">
      <path
        pathLength={1}
        className="needle-line"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 120 C 60 70, 120 50, 175 95 C 185 103, 192 110, 200 112 C 208 110, 215 103, 225 95 C 280 50, 340 70, 390 120 M 175 95 C 150 80, 120 82, 95 92 M 225 95 C 250 80, 280 82, 305 92 M 200 112 C 196 124, 200 136, 206 140 M 200 112 l 10 -6"
      />
    </svg>
  );
}

function Index() {
  useScrollFx();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-background text-foreground">
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">
          <a href="#topo" className="rounded-full bg-ink/80 px-4 py-1.5 font-display text-2xl text-ink-foreground backdrop-blur">
            Gaivota<span className="text-primary">.</span>
          </a>
          <nav className="hidden items-center gap-8 rounded-full bg-ink/80 px-6 py-2.5 text-sm text-ink-foreground backdrop-blur md:flex" aria-label="Principal">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} className="opacity-80 transition hover:opacity-100">{l}</a>
            ))}
          </nav>
          <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener" className="btn-metallic-3d hidden px-5 py-2.5 text-sm font-semibold md:inline-flex">
            Agendar
          </a>
          <button onClick={() => setOpen(!open)} className="rounded-full bg-ink p-3 text-ink-foreground md:hidden" aria-label="Abrir menu" aria-expanded={open}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {open && (
          <nav className="mx-4 rounded-2xl bg-ink p-6 text-ink-foreground md:hidden" aria-label="Mobile">
            {NAV.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setOpen(false)} className="block border-b border-ink-foreground/10 py-3 font-display text-2xl">{l}</a>
            ))}
            <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener" className="btn-metallic-3d mt-5 flex justify-center px-5 py-3 font-semibold">Agendar pelo WhatsApp</a>
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="topo" className="grain relative min-h-[100svh] overflow-hidden bg-ink text-ink-foreground">
        <div data-parallax="0.35" className="absolute inset-0 will-change-transform">
          <img src={hero} alt="Tatuador trabalhando um traço fino em um antebraço (imagem ilustrativa)" width={1600} height={1008} className="h-[115%] w-full scale-105 object-cover opacity-55" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
        <div data-parallax="-0.12" className="pointer-events-none absolute -right-40 top-1/4 hidden md:block">
          <div className="arc-ring h-[520px] w-[520px]" />
          <div className="arc-ring left-16 top-16 h-[390px] w-[390px] opacity-60" />
          <div className="arc-ring left-32 top-32 h-[260px] w-[260px] opacity-40" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:px-10 md:pb-24">
          <div data-parallax="-0.08" className="anim-glide mb-6 w-48 text-primary md:w-72">
            <Seagull />
          </div>
          <p className="anim-fade-up font-mono text-xs uppercase tracking-[0.3em] text-ink-foreground/70" style={{ animationDelay: "0.4s" }}>
            Estúdio de tatuagem · Icaraí, Niterói
          </p>
          <h1 className="anim-fade-up mt-4 max-w-4xl font-display text-[clamp(2.8rem,8vw,7.5rem)] leading-[0.92]" style={{ animationDelay: "0.6s" }}>
            Sua ideia vira traço. <em className="text-primary">O traço vira</em> história na pele.
          </h1>
          <p className="anim-fade-up mt-6 max-w-xl text-base text-ink-foreground/75 md:text-lg" style={{ animationDelay: "0.9s" }}>
            Desenhos personalizados, atendimento próximo e um ambiente limpo e acolhedor a poucos minutos da praia de Icaraí.
          </p>
          <div className="anim-fade-up mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: "1.1s" }}>
            <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener" className="btn-metallic-3d inline-flex items-center gap-2 px-7 py-4 font-semibold">
              <MessageCircle size={18} /> Conversar sobre minha tattoo
            </a>
            <a href="#servicos" className="btn-ghost-ink inline-flex items-center gap-2 px-6 py-4 text-sm font-medium">
              Ver o que fazemos <ArrowUpRight size={16} />
            </a>
          </div>
          <a href={BIZ.maps} target="_blank" rel="noopener" className="anim-fade-up mt-12 inline-flex w-fit items-center gap-3 border-t border-ink-foreground/20 pt-5 text-sm" style={{ animationDelay: "1.3s" }}>
            <span className="flex text-primary">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</span>
            <span><strong>{BIZ.rating}</strong> no Google · {BIZ.reviews} avaliações</span>
          </a>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-foreground/10 bg-primary py-4 text-primary-foreground" aria-hidden="true">
        <div className="anim-marquee flex w-max gap-10 whitespace-nowrap font-display text-2xl italic md:text-3xl">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Desenho autoral", "Fine line", "Retoques", "Atendimento personalizado", "Ambiente higienizado", "Icaraí · Niterói"].map((t) => (
              <span key={k + t} className="flex items-center gap-10">{t}<span>✦</span></span>
            )),
          )}
        </div>
      </div>

      {/* ESTÚDIO */}
      <section id="estudio" className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <div className="md:col-span-5">
          <p className="reveal font-mono text-xs uppercase tracking-[0.3em] text-primary">01 — O estúdio</p>
          <h2 className="reveal mt-5 font-display text-5xl leading-[0.95] md:text-7xl">Arte com calma, cuidado e mão firme.</h2>
        </div>
        <div className="space-y-6 text-lg text-muted-foreground md:col-span-6 md:col-start-7 md:pt-12">
          <p className="reveal">
            O Gaivota Tattoo é um estúdio de tatuagem na Avenida Roberto Silveira, em Icaraí. Aqui cada projeto começa numa conversa: entendemos o que você quer contar e transformamos isso em um desenho pensado para o seu corpo.
          </p>
          <p className="reveal">
            Quem passou pelo estúdio costuma destacar três coisas nas avaliações: o atendimento atencioso, a qualidade do resultado e o espaço limpo e organizado.
          </p>
          <dl className="reveal grid grid-cols-3 gap-4 border-t border-border pt-8 text-foreground">
            <div><dt className="text-xs uppercase tracking-widest text-muted-foreground">Google</dt><dd className="font-display text-4xl">{BIZ.rating}</dd></div>
            <div><dt className="text-xs uppercase tracking-widest text-muted-foreground">Avaliações</dt><dd className="font-display text-4xl">{BIZ.reviews}</dd></div>
            <div><dt className="text-xs uppercase tracking-widest text-muted-foreground">Aberto</dt><dd className="font-display text-4xl">Seg–Sáb</dd></div>
          </dl>
        </div>
        <figure className="mask-reveal relative md:col-span-12 md:mt-10">
          <img src={studio} alt="Ambiente de estúdio de tatuagem (imagem ilustrativa)" width={1200} height={912} loading="lazy" className="h-[60vh] w-full rounded-sm object-cover" />
          <figcaption className="absolute bottom-4 left-4 rounded-full bg-background/90 px-4 py-2 text-xs">Imagem ilustrativa</figcaption>
        </figure>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="bg-ink py-24 text-ink-foreground md:py-36">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="reveal font-mono text-xs uppercase tracking-[0.3em] text-primary">02 — O que fazemos</p>
              <h2 className="reveal mt-5 max-w-2xl font-display text-5xl leading-[0.95] md:text-7xl">Do primeiro rabisco ao último retoque.</h2>
            </div>
            <a href={waLink("Olá! Vim pelo site e queria saber quais estilos vocês fazem.")} target="_blank" rel="noopener" className="reveal btn-ghost-ink w-fit px-6 py-3 text-sm">Perguntar sobre estilos</a>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-12">
            {[
              { n: "Tatuagem autoral", d: "Criamos o desenho do zero a partir da sua ideia, referências e local do corpo. Você aprova antes da sessão.", img: sketch, w: 800, h: 1008, span: "md:col-span-7", msg: "Olá! Quero criar uma tatuagem personalizada. Posso enviar minha ideia?" },
              { n: "Traço fino e minimalistas", d: "Peças delicadas e precisas, ideais para a primeira tatuagem ou para um detalhe discreto.", img: fineline, w: 800, h: 1008, span: "md:col-span-5 md:mt-24", msg: "Olá! Tenho interesse em uma tatuagem pequena / fine line. Como funciona?" },
            ].map((s) => (
              <article key={s.n} className={`reveal group ${s.span}`}>
                <div className="overflow-hidden rounded-sm">
                  <img src={s.img} alt={`${s.n} (imagem ilustrativa)`} width={s.w} height={s.h} loading="lazy" className="aspect-[4/5] w-full object-cover transition duration-[1200ms] group-hover:scale-105 md:aspect-[5/4]" />
                </div>
                <div className="mt-6 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl">{s.n}</h3>
                    <p className="mt-2 max-w-md text-ink-foreground/70">{s.d}</p>
                  </div>
                  <a href={waLink(s.msg)} target="_blank" rel="noopener" aria-label={`Falar sobre ${s.n}`} className="shrink-0 rounded-full border border-ink-foreground/30 p-3 transition hover:bg-primary hover:text-primary-foreground">
                    <ArrowUpRight size={20} />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <ul className="mt-20 grid border-t border-ink-foreground/15 md:grid-cols-2">
            {[
              ["Retoques", "Reavivamos traços e cores de tatuagens que precisam de um novo cuidado."],
              ["Piercing", "O estúdio aparece no Google também como loja de body piercing — consulte disponibilidade."],
            ].map(([t, d]) => (
              <li key={t} className="reveal flex gap-6 border-b border-ink-foreground/15 py-8 md:pr-10">
                <span className="font-display text-3xl text-primary">✦</span>
                <div><h3 className="font-display text-3xl">{t}</h3><p className="mt-1 text-ink-foreground/70">{d}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROCESSO */}
      <section id="processo" className="relative overflow-hidden py-24 md:py-36">
        <div data-parallax="-0.06" className="pointer-events-none absolute -left-20 top-10 w-[600px] text-primary/15"><Seagull /></div>
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <p className="reveal font-mono text-xs uppercase tracking-[0.3em] text-primary">03 — Como funciona</p>
          <h2 className="reveal mt-5 max-w-3xl font-display text-5xl leading-[0.95] md:text-7xl">Quatro passos, sem pressa e sem surpresa.</h2>
          <ol className="mt-16 grid gap-10 md:grid-cols-4">
            {[
              ["Conversa", "Você manda sua ideia, referências e local do corpo pelo WhatsApp."],
              ["Orçamento", "Avaliamos tamanho e complexidade e passamos valor e prazo."],
              ["Desenho", "O traço é criado e ajustado com você até ficar do seu jeito."],
              ["Sessão", "Você é tatuado com material descartável e recebe as orientações de cuidado."],
            ].map(([t, d], i) => (
              <li key={t} className="reveal" style={{ transitionDelay: `${i * 120}ms` }}>
                <span className="font-display text-7xl italic text-primary">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROVA SOCIAL */}
      <section className="bg-secondary py-24 md:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:px-10">
          <div className="reveal">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">04 — Quem já passou por aqui</p>
            <p className="mt-6 font-display text-[clamp(5rem,14vw,11rem)] leading-none">{BIZ.rating}</p>
            <p className="text-lg text-muted-foreground">Nota média no Google, com {BIZ.reviews} avaliações públicas.</p>
            <a href={BIZ.maps} target="_blank" rel="noopener" className="btn-ghost-ink mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm">Ler avaliações no Google <ArrowUpRight size={16} /></a>
          </div>
          <ul className="space-y-4">
            {["Atendimento atencioso e personalizado", "Qualidade do resultado final", "Ambiente limpo, higiênico e confortável", "Equipe simpática e acolhedora"].map((t, i) => (
              <li key={t} className="reveal flex items-center gap-4 rounded-sm bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md" style={{ transitionDelay: `${i * 80}ms` }}>
                <Star size={18} className="shrink-0 text-primary" fill="currentColor" />
                <span className="text-lg">{t}</span>
              </li>
            ))}
            <li className="px-1 text-xs text-muted-foreground">Temas mais citados nas avaliações públicas do estúdio.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-5 py-24 md:py-36">
        <p className="reveal font-mono text-xs uppercase tracking-[0.3em] text-primary">05 — Dúvidas</p>
        <h2 className="reveal mt-5 font-display text-5xl md:text-6xl">Antes de marcar.</h2>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {[
            ["Quanto custa uma tatuagem?", "O valor depende do tamanho, do local do corpo e do nível de detalhe. Mande sua ideia pelo WhatsApp que passamos um orçamento."],
            ["Vocês criam o desenho?", "Sim. Fazemos desenhos personalizados a partir da sua ideia e referências, e você aprova antes da sessão."],
            ["Nunca fiz tatuagem. É um bom lugar para a primeira?", "Sim. Explicamos todo o processo, tiramos dúvidas e orientamos os cuidados depois da sessão."],
            ["Preciso agendar?", "Recomendamos combinar antes pelo WhatsApp para garantir o horário e preparar o desenho."],
            ["Qual o horário de funcionamento?", "De segunda a sábado, das 8h às 18h. Domingo fechado."],
          ].map(([q, a]) => (
            <details key={q} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-medium">
                {q}
                <span className="font-display text-3xl text-primary transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 max-w-2xl text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA FINAL + CONTATO */}
      <section id="contato" className="grain relative overflow-hidden bg-ink text-ink-foreground">
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="arc-ring h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2" />
          <div className="arc-ring h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto w-40 text-primary"><Seagull /></div>
            <h2 className="reveal mt-6 font-display text-5xl leading-[0.95] md:text-7xl">Tem uma ideia? <em className="text-primary">Vamos desenhar.</em></h2>
            <p className="reveal mt-5 text-lg text-ink-foreground/70">Conte o que você imagina. A gente responde com caminhos, valores e horários.</p>
            <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener" className="btn-metallic-3d reveal mt-10 inline-flex items-center gap-2 px-8 py-5 text-lg font-semibold">
              <MessageCircle size={20} /> Chamar no WhatsApp
            </a>
          </div>

          <div className="mt-20 grid gap-10 md:grid-cols-2">
            <ul className="space-y-6">
              <li className="flex gap-4"><MapPin className="mt-1 shrink-0 text-primary" /><a href={BIZ.maps} target="_blank" rel="noopener" className="hover:underline">{BIZ.address}</a></li>
              <li className="flex gap-4"><Clock className="mt-1 shrink-0 text-primary" /><span>{BIZ.hours}</span></li>
              <li className="flex gap-4"><Phone className="mt-1 shrink-0 text-primary" /><a href={`tel:${BIZ.phoneE164}`} className="hover:underline">{BIZ.phoneDisplay}</a></li>
              <li className="flex flex-wrap gap-3 pt-2">
                <a href={BIZ.maps} target="_blank" rel="noopener" className="btn-ghost-ink px-5 py-2.5 text-sm">Como chegar</a>
                <a href={BIZ.facebook} target="_blank" rel="noopener" className="btn-ghost-ink px-5 py-2.5 text-sm">Facebook</a>
              </li>
            </ul>
            <iframe title="Mapa do Gaivota Tattoo em Icaraí" src={BIZ.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-72 w-full rounded-sm grayscale md:h-full md:min-h-72" />
          </div>
        </div>
        <footer className="relative z-10 border-t border-ink-foreground/10">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 px-5 py-8 text-sm text-ink-foreground/50 md:flex-row md:px-10">
            <span>© {new Date().getFullYear()} Gaivota Tattoo Estúdio · Icaraí, Niterói - RJ</span>
            <span>Imagens do site são ilustrativas.</span>
          </div>
        </footer>
      </section>

      {/* FLOATING WHATSAPP */}
      <a href={waLink(WA_DEFAULT)} target="_blank" rel="noopener" aria-label="Falar no WhatsApp" className="btn-metallic-3d fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center">
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
