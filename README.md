# Half-Term Recall

Revision built around how memory actually decays, organised the way school actually works:
each half-term splits into **Part A** (lessons before the mid-half-term test) and **Part B**
(the rest), with a mock for each.

Open `index.html` in a browser. No build step, no install, no account.

## What it does

**Topics are the unit, not subjects.** A test is on "Photosynthesis", not on "Biology", so that's
what the app tracks. The home screen lists every topic in the current half-term, weakest first,
with its own recall percentage and a Revise button; the Revise screen filters down to a single
topic; and Tests has a per-topic mock for the test on just this week's work. Subjects are only
there to group topics.

**Cards come back exactly when you're about to forget them.** Every card carries a stability
value. Recall is modelled as `R = 0.9 ^ (t / S)` — the chance you can still pull it out of your
head `t` days after the last time you got it right. A card falls due when that hits 90%, which
is the last comfortable moment to rehearse it and the moment that buys the biggest jump in
stability. Get it right and the gap grows; forget it and the gap collapses to a day and rebuilds.

**"I don't know" is a first-class button.** Press it the instant you blank — guessing and
waiting doesn't build the memory, seeing the answer does. That card:

1. is shown to you immediately,
2. comes back **3 questions later**, then again near the end of the session,
3. can't leave the session until you've got it right **twice in a row**,
4. is booked back in for **tomorrow** rather than in two weeks.

**Questions, not just flashcards.** Mixed mode alternates between flashcards, multiple choice
(wrong options are pulled from the same topic, so they're actually plausible) and typing the
answer out, which is marked with a fuzzy match so a spelling slip counts as "nearly" rather
than wrong.

**Two tests per half-term, like the real thing.** A mid-half-term mock over Part A, and a
whole-half-term mock over A + B. Scored, with a list of exactly what you missed and a button to
drill only those until they stick. Mocks count as real practice — right answers schedule
forward, wrong ones come back within the day.

**Nudges before the decay.** The badge in the header counts what's fading. With browser
reminders switched on you get a notification when a batch of cards reaches the edge of
forgetting, plus a daily reminder at a time you pick. Notifications fire while the page is open
in a tab, so pin it or add it to your home screen.

## Getting your own material in

**Tell it the topic and it writes the cards.** Under **Cards**, pick the subject and half-term,
name the topic you covered in the lesson, set your year group, and it writes a set of questions
for you. Name it narrowly — "Trigonometry: SOHCAHTOA" gets far sharper questions than "Maths" —
and the box remembers topics you already have, so you add to one rather than starting a
near-duplicate. Paste your lesson notes into the optional box and every card comes from them.

The prompt is built to hold the line on specificity: a question a student could answer from
general subject knowledge is treated as a failed card, and it's told to work through the topic's
named parts, terms, steps, numbers and exceptions rather than circling the headline.

Nothing is added until you've read through the batch and unticked anything you weren't taught —
and questions already in that topic are sent as a do-not-repeat list, so "write more" genuinely
extends the set.

This runs on the published Artifact version, which can ask Claude on your account. Opened as a
plain file there's no Claude to ask, so the panel says so and you write cards by hand instead.

You can also add cards one at a time, or paste a whole lesson's worth:

```
# Photosynthesis
What gas do plants take in? | Carbon dioxide
Where does photosynthesis happen? | In the chloroplasts
# Respiration
Word equation for aerobic respiration | glucose + oxygen → carbon dioxide + water
```

Lines starting with `#` set the topic. `|`, `::` and ` — ` all work as the separator.

The app ships with example cards across four subjects so nothing is empty on first run — there's
a **Clear example cards** button on the home screen when you're ready to replace them.

## Test dates

Defaults follow a typical English school year (six half-terms, mid-term test halfway through
each). Set your real dates under **Tests → Test dates** and every countdown, the term spine and
the Part A/Part B split follow them.

## Where your data lives

`localStorage` on the device, always. Published as a Claude Artifact it also syncs through the
artifact `db` capability, so your progress follows you between phone and laptop. Either way
**Export backup** writes a JSON file you can re-import.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The whole app — markup, styles, and logic in one standalone file. |
| `tools/build-artifact.mjs` | Strips the standalone HTML wrapper to produce the Artifact build. |
| `dist/artifact.html` | Generated; the version published to Claude Artifacts. |

```sh
node tools/build-artifact.mjs      # rebuild dist/artifact.html after editing index.html
```

## The memory bit

When you learn something, neurons fire together and the synapses between them strengthen — a
fragile, short-term change. Unless the memory gets used again your brain doesn't keep paying to
maintain it, the connection weakens, and within days the information is effectively gone. That's
not a fault; it's your brain being efficient about what deserves the space.

Retrieval — pulling the fact back out — is the signal that it matters, and it rebuilds the
connection stronger and slower to fade. That's why answering questions beats re-reading notes,
and why this app is a question machine rather than a notes app. The **Memory** tab draws the
forgetting curve with and without spaced review, and shows where your own material sits on it.
