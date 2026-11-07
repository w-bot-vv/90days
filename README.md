# 90days challenge 🔥

Devadesátidenní výzva jako webová aplikace. Bez účtu, bez serveru, bez závislostí — jeden HTML soubor, který běží i offline a dá se přidat na plochu telefonu.

## Co to umí

Před spuštěním projdeš sedm otázek: cíl na 90 dní, důvod, proč to dokončíš, tři denní aktivity, týdenní a měsíční odměna, odměna za dokončení a trest za nedokončení. Teprve pak výzva začne běžet.

Pak máš pět obrazovek:

- **Dnes** — tři aktivity k odškrtnutí, prstenec s postupem, série dnů v řadě a připomínka toho, proč jsi začal. Když odškrtneš všechny tři, den se uzavře.
- **Progres** — 90 bublinek ve třech měsíčních blocích. Ťuknutím den odškrtneš nebo odškrtnutí zrušíš. Budoucí dny jsou zamčené, víkendové bublinky jsou přeškrtnuté a nejdou odškrtnout.
- **Vize** — všechny odpovědi z úvodu, stav plnění odměn a záloha dat. Cokoli se dá dodatečně přepsat.
- **Nápady** — fronta vizí na další výzvy. Nápad přidáš z pole nahoře (nebo Enterem), odškrtnutý se přeškrtne a odsune dolů, smazání se ptá na potvrzení. Nápady přežijí uzavření výzvy, takže máš z čeho vybírat, až budeš zakládat další. Dostaneš se k nim i z úvodní obrazovky mezi výzvami.
- **Historie** — uzavřené výzvy. Po 90. dni se běžící výzva uloží celá: cíl, důvod, denní aktivity, odměny, trest, počet splněných dnů a mřížka průběhu. Kdykoli se do ní dá nahlédnout a porovnat, co sis tehdy dal za cíl.

Víkendy jsou z výzvy vynechané automaticky — v mřížce jsou přeškrtnuté, nic se o nich neodškrtává, sérii nepřerušují a do zmeškaných dnů se nepočítají. Postup se proto měří proti všedním dnům (těch je v 90denním úseku zhruba 64), ne proti všem devadesáti. Odměna se odemkne po týdnu nebo měsíci, ve kterém nechybí ani jeden všední den.

Výzva se uzavře po 90. dni, nebo jakmile máš odškrtnuté všechny povinné dny. Pak stačí ťuknout na *Uložit do historie a začít novou* a průvodce se spustí znovu — historie zůstává. Ukončit ji jde i předčasně přes **Vize → Ukončit výzvu předčasně**, s uložením do historie nebo bez něj.

## Nasazení na GitHub Pages

1. Založ nový repozitář, například `90days`.
2. Nahraj do něj celý obsah této složky (`index.html`, `manifest.webmanifest`, `sw.js`, ikony a `.nojekyll`). Soubory musí ležet v kořeni repozitáře, ne v podsložce.
3. V repozitáři otevři **Settings → Pages**, v sekci *Build and deployment* zvol zdroj **Deploy from a branch**, větev `main` a složku `/ (root)`. Ulož.
4. Za minutu nebo dvě poběží web na `https://<tvuj-ucet>.github.io/90days/`.

Přes příkazovou řádku:

```bash
git init
git add .
git commit -m "90days challenge"
git branch -M main
git remote add origin https://github.com/<tvuj-ucet>/90days.git
git push -u origin main
```

## Přidání na plochu iPhonu

Otevři adresu v Safari, ťukni na ikonu sdílení a zvol **Přidat na plochu**. Aplikace se spustí na celou obrazovku s ikonou plamene a poběží i bez signálu.

Na Androidu nabídne Chrome instalaci sám, případně přes menu **Přidat na plochu**.

## Kde jsou data

Všechno se ukládá lokálně v prohlížeči (`localStorage`) pod klíčem `vyzva90` — běžící výzva i celá historie uzavřených výzev. Nikam se nic neodesílá.

Data aplikace přidané na plochu drží iOS odděleně od Safari a nemaže je po sedmi dnech nečinnosti jako běžné weby v prohlížeči. I tak si dělej zálohu.

**Záloha a obnovení** najdeš na kartě **Historie**, dole pod seznamem uzavřených výzev. Má tři cesty:

- *Uložit zálohu do souboru* — stáhne `90days-zaloha-RRRR-MM-DD.json` s běžící výzvou, celou historií i nápady.
- *Sdílet zálohu…* — jen tam, kde to zařízení umí (typicky iPhone); pošle soubor do systémové nabídky, odkud ho uložíš do Souborů nebo na iCloud.
- *Zálohovat textem* — záchranná varianta, když se soubory nedaří: zkopíruješ obsah jako text.

Načtení funguje přes *Načíst ze souboru*. Appka soubor nejdřív zkontroluje a ukáže, co v něm je (cíl výzvy, počet odškrtnutých dní, výzvy v historii, nápady), a teprve po potvrzení data přepíše. Přijme i starší zálohy pořízené textem. Řádek se zálohou ukazuje, kdy sis zálohoval naposled.

Před tlačítkem *Začít novou výzvu* si zálohu udělej vždycky.

Odinstalování aplikace z plochy data smaže.

## Aktualizace

Service worker (`sw.js`) tahá soubory nejdřív ze sítě, takže po pushnutí změn stačí aplikaci zavřít a znovu otevřít. Když měníš seznam souborů, zvyš číslo v konstantě `CACHE` v `sw.js`, aby se stará cache zahodila.

## Struktura

```
index.html               celá aplikace – HTML, CSS i JavaScript
manifest.webmanifest     název, ikony a barvy pro instalaci na plochu
sw.js                    offline cache
icon-*.png               ikony „90", včetně maskable varianty pro Android
.nojekyll                vypne zpracování Jekyllem na GitHub Pages
```

## Ikona

Značka je prstenec postupu z obrazovky Dnes, uzavřený na 90 %, a v něm číslo 90. Tmavá dráha prstence drží celý kruh, světlejší oblouk s kulatým zakončením ukazuje rozdělanou výzvu — ikona tedy neříká jen „90 dní", ale „90 dní rozjetých".

Barvy: Tiffany blue (`#0ABAB5`) s přechodem do `#7FF0E7` nahoře a `#067F7C` dole, aby značka nebyla plochá. Pozadí je černé s nepatrným tmavě zeleným nádechem uprostřed, takže ikona na tmavé ploše nesplyne s pozadím. Číslice jsou Poppins Bold.

Kreslí se vektorově v SVG (`icon-source/`) a rasterizuje přes Chromium, ne jako text v obrázku. Velikosti 180, 192, 512 a 1024 px, k tomu `icon-512-maskable.png` se značkou zmenšenou do bezpečné zóny pro kulatou masku na Androidu a `favicon-64.png` s mírně zvětšenou značkou, protože favicon se nemaskuje. Ověřeno pod iOS squircle i kruhovou maskou a čitelné až do 54 px.
