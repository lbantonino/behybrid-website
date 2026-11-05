import { chromium } from "playwright";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(2600);
const sec = () => page.evaluate(() => {
  const s = document.querySelector('[class*="scroller"]');
  return Math.round(s.scrollTop / s.clientHeight);
});
const reset = () => page.evaluate(() => new Promise((r) => {
  document.querySelector('[class*="scroller"]').scrollTo({ top: 0, behavior: "instant" });
  setTimeout(r, 600);
}));
const geste = (pic, bruit, pas) => page.evaluate(({ pic, bruit, pas }) => new Promise((res) => {
  const cible = document.elementFromPoint(300, 450);
  const deltas = [];
  for (let i = 0; i < 7; i++) deltas.push(4 + (i * pic) / 7);
  let d = pic, g = Math.floor(pic * 977) + 7;
  const rnd = () => ((g = (g * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  while (d > 1.5) { deltas.push(Math.max(1, d * (1 + (rnd() - 0.5) * 2 * bruit))); d *= 0.94; }
  let i = 0;
  const tick = () => {
    cible.dispatchEvent(new WheelEvent("wheel", { deltaY: deltas[i], bubbles: true, cancelable: true }));
    if (++i >= deltas.length) return res();
    setTimeout(tick, pas);
  };
  tick();
}), { pic, bruit, pas });

let ko = 0, total = 0;
for (const pic of [20, 30, 60, 90, 140, 200]) for (const bruit of [0.1, 0.3, 0.5, 0.7]) for (const pas of [8, 14, 22]) {
  await reset();
  await geste(pic, bruit, pas);
  await page.waitForTimeout(1500);
  const s = await sec();
  total++;
  if (s !== 1) { ko++; console.log(`  ${s === 0 ? "SANS EFFET" : "SAUT (" + s + ")"} : pic ${pic}, bruit ${bruit}, pas ${pas} ms`); }
}
console.log(`\n${total} gestes : ${ko} anomalie(s)`);
await browser.close();
