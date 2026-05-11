# AriBel-Matematik - installera och kör som PWA

App-länk:

```text
https://chipchop87.github.io/AriBel-Matematik/
```

## Vad är en PWA?

En PWA är en webbapp som kan installeras från webbläsaren. Den beter sig mer som en vanlig app, men laddas från en webbadress.

Du behöver inte installera Python, Node.js eller npm för att använda appen.

## Installera på Windows med Chrome eller Edge

1. Öppna app-länken i Chrome eller Edge.
2. Vänta tills sidan har laddat klart.
3. Titta i adressfältet efter en ikon för **Installera app**.
4. Klicka på ikonen.
5. Välj **Installera**.

Efter installationen kan appen startas från Start-menyn som en vanlig app.

## Installera via webbläsarens meny

Om installera-ikonen inte syns:

1. Öppna app-länken.
2. Klicka på webbläsarens meny, ofta tre punkter uppe till höger.
3. Välj något av följande:
   - **Installera AriBel-Matematik**
   - **Appar**
   - **Installera den här webbplatsen som en app**
   - **Lägg till på skrivbordet**
4. Bekräfta installationen.

## Installera på Android

1. Öppna app-länken i Chrome på mobilen.
2. Tryck på menyn med tre punkter.
3. Välj **Lägg till på startskärmen** eller **Installera app**.
4. Bekräfta.

Appen hamnar då som en ikon på startskärmen.

## Installera på iPhone eller iPad

1. Öppna app-länken i Safari.
2. Tryck på dela-knappen.
3. Välj **Lägg till på hemskärmen**.
4. Tryck **Lägg till**.

## Köra appen

Efter installation:

- öppna appen från Start-menyn, skrivbordet eller mobilens startskärm
- välj nivå
- spela som vanligt

## Offline

Appen har service worker och cache. Det betyder att grundfiler kan sparas lokalt efter första besöket.

För bästa resultat:

1. Öppna appen en gång med internet.
2. Låt den ladda klart.
3. Installera appen.
4. Testa offline efteråt.

Offline-stöd kan variera mellan webbläsare och enheter.

## Uppdatera appen

När appen ändras på GitHub Pages kan webbläsaren ibland fortsätta använda cachade filer.

Om du inte ser den senaste versionen:

1. Öppna appen i webbläsaren.
2. Ladda om sidan.
3. Stäng och öppna appen igen.
4. Om det fortfarande inte hjälper: rensa webbplatsdata för `chipchop87.github.io`.

## Om installation inte fungerar

Kontrollera:

- att du använder app-länken med `https`
- att appen öppnas i Chrome, Edge eller Safari
- att GitHub Actions-deployen är klar
- att sidan inte visar 404
- att du inte öppnar filen lokalt från `file://`

PWA-installation fungerar från GitHub Pages-länken, inte från den lokala `spela-direkt/index.html`.
