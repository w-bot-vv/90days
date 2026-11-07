# 90days challenge 🔥

Devadesátidenní výzva jako webová aplikace. Bez účtu, bez serveru, bez závislostí — jeden HTML soubor, který běží i offline a dá se přidat na plochu telefonu.

## Co to umí

Před spuštěním projdeš sedm otázek: cíl na 90 dní, důvod, proč to dokončíš, tři denní aktivity, týdenní a měsíční odměna, odměna za dokončení a trest za nedokončení. Teprve pak výzva začne běžet.

Pak máš tři obrazovky:

- **Dnes** — tři aktivity k odškrtnutí, prstenec s postupem, série dnů v řadě a připomínka toho, proč jsi začal. Když odškrtneš všechny tři, den se uzavře.
- **Progres** — 90 bublinek ve třech měsíčních blocích. Ťuknutím den odškrtneš nebo odškrtnutí zrušíš. Budoucí dny jsou zamčené.
- **Vize** — všechny odpovědi z úvodu, stav plnění odměn a záloha dat. Cokoli se dá dodatečně přepsat.
- **Historie** — uzavřené výzvy. Po 90. dni se běžící výzva uloží celá: cíl, důvod, denní aktivity, odměny, trest, počet splněných dnů a mřížka průběhu. Kdykoli se do ní dá nahlédnout a porovnat, co sis tehdy dal za cíl.

Víkendy jsou dobrovolné: nepřerušují sérii a nepočítají se do zmeškaných dnů. Odměna se odemkne po týdnu nebo měsíci, ve kterém nechybí ani jeden povinný den.

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

Data aplikace přidané na plochu drží iOS odděleně od Safari a nemaže je po sedmi dnech nečinnosti jako běžné weby v prohlížeči. I tak si dělej zálohu: **Vize → Záloha a obnovení** vypíše celý obsah jako text, který si zkopíruješ a v případě potřeby vložíš zpátky. Před tlačítkem *Začít novou výzvu* to udělej vždycky.

Odinstalování aplikace z plochy data smaže.

## Aktualizace

Service worker (`sw.js`) tahá soubory nejdřív ze sítě, takže po pushnutí změn stačí aplikaci zavřít a znovu otevřít. Když měníš seznam souborů, zvyš číslo v konstantě `CACHE` v `sw.js`, aby se stará cache zahodila.

## Struktura

```
index.html               celá aplikace – HTML, CSS i JavaScript
manifest.webmanifest     název, ikony a barvy pro instalaci na plochu
sw.js                    offline cache
icon-*.png               ikony plamene, včetně maskable varianty pro Android
.nojekyll                vypne zpracování Jekyllem na GitHub Pages
```
