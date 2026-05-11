# AriBel-Matematik

**AriBel-Matematik** är en svensk matematik-app för barn från förskoleklass till årskurs 3. Spelet innehåller nivåer med stora knappar, poäng, stjärnor och slumpade uppgifter.

Det finns två versioner:

- en enkel version som kan spelas direkt lokalt utan installation
- en React/Vite-version med mer app-känsla för vidareutveckling

## Versioner

- `spela-direkt/` - fristående HTML/CSS/JavaScript. Öppna `index.html` direkt i webbläsaren.
- `react-vite/` - React/Vite-version för modern appkänsla och vidareutveckling.

## Snabbaste sättet att spela

Använd den här versionen om du bara vill spela direkt på datorn.

1. Öppna mappen `AriBel-Matematik`.
2. Öppna mappen `spela-direkt`.
3. Dubbelklicka på `index.html`.
4. Välj nivå och börja spela.

Den här versionen kräver inte Python, Node.js, npm eller internet. Den körs direkt i en modern webbläsare, till exempel Edge, Chrome eller Firefox.

## Starta React/Vite-versionen

Använd den här versionen om du vill köra appen som ett modernt webbprojekt.

Krav:

- Node.js installerat
- npm installerat

Start:

1. Öppna en terminal i mappen `AriBel-Matematik/react-vite`.
2. Kör `npm install`.
3. Kör `npm run dev`.
4. Öppna adressen som visas i terminalen.

Vanligtvis är adressen:

```text
http://127.0.0.1:5173
```

För att skapa en färdig produktionsversion:

```bash
npm run build
```

## Innehåll

Spelet innehåller fyra nivåer:

- **F-klass** - antal, ordning, former och tal upp till 10
- **Åk 1** - plus, minus, tiokompisar och talföljder
- **Åk 2** - tiotal, ental, dubbelt, hälften och textproblem
- **Åk 3** - multiplikation, division, likheter och problemlösning

Nivåerna bygger på centralt innehåll för matematik i årskurs 1-3 från Skolverket: taluppfattning, räknesätt, positionssystem, likhetstecken, mönster, geometri, dubbelt/hälften och elevnära problemlösning.

Förskoleklassnivån är förenklad med fokus på tidig taluppfattning.

## Så spelar man

1. Tryck på **Starta**.
2. Välj en nivå.
3. Läs uppgiften.
4. Tryck på rätt svar.
5. Samla stjärnor när banan är klar.

Framsteg sparas lokalt i webbläsaren. Knappen **Nollställ framsteg** tar bort sparade stjärnor.

## Felsökning

Om direktversionen inte öppnas:

- kontrollera att du öppnar `spela-direkt/index.html`
- prova en annan webbläsare
- kontrollera att filerna `styles.css`, `app.js` och mappen `assets` ligger kvar bredvid `index.html`

Om React/Vite-versionen inte startar:

- kontrollera att du står i mappen `AriBel-Matematik/react-vite`
- kör `npm install` igen
- kontrollera att Node.js är installerat med `node --version`
- kontrollera att npm är installerat med `npm --version`

## Mappstruktur

```text
AriBel-Matematik/
  README.md
  spela-direkt/
    index.html
    styles.css
    app.js
    assets/
  react-vite/
    package.json
    index.html
    public/
    src/
```
