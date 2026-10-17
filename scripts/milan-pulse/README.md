# Milan Pulse feeds

Static JSON under `public/data/milan-pulse/` powers **Milan Tracker** at `/tracker/` (Italian: `/it/tracker/`).

## Why the list looked empty

The UI only shows **upcoming** events (Today / this week). If the JSON is old, every event is in the past → empty list. Refresh the feeds.

## Refresh locally

```bash
cd ~/repo/pvt/themilanpost
nvm use 24   # Node ≥22.12
npm run fetch:milan-pulse
# or force each source:
npm run fetch:eventbrite:force
npm run fetch:dice:force
npm run fetch:mobility:force
npm run fetch:strikes:force
```

Then `npm run dev` and open http://localhost:4321/tracker/

### English strike translations (DeepL)

Strikes are Italian from MIT. English UI uses DeepL via `DEEPL_AUTH_KEY`:

1. Copy the key into `themilanpost/.env` (same value as `events-milan/.env` if you already have it):
   `DEEPL_AUTH_KEY=…`
2. Run `npm run fetch:strikes:force`
3. Confirm `public/data/milan-pulse/strikes.json` has `"translation": { "engine": "deepl", … }` and Milan-relevant items include an `"en"` object.

Without the key, the Strikes tab stays Italian even when the UI language is EN.

## Production

GitHub Actions workflow `.github/workflows/refresh-milan-pulse.yml` runs Mon/Wed/Fri (and on manual dispatch). **Set repo secret `DEEPL_AUTH_KEY`** so CI translations match local.

## JSON shards (mobile payload)

Full dumps (`eventbrite.json`, `dice.json`, `strikes.json`) stay for refresh fingerprints and debugging. The Tracker **client** loads slim shards only:

| Shard | Tab | Contents |
|-------|-----|----------|
| `today.json` | Today | Slim events for Rome “today” |
| `agenda.json` | Agenda | Slim events for next 7 days |
| `strikes-milan.json` | Strikes (+ pills on Today/Agenda) | `milanRelevant` only |
| `mobility.json` | Transport (+ pills) | Unchanged (~4KB) |

Regenerate after feeds (or alone when the calendar day moves):

```bash
npm run write:shards
# or as the last step of:
npm run fetch:milan-pulse
```

CI runs `write:shards` on every refresh so `today`/`agenda` stay correct even when full dumps are unchanged.
