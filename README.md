# Find the God

**Find the God: The Divine Disguise** is a browser-based Egyptian mythology deduction game for 2–7 players. Each player is secretly assigned one of the gods, then asks yes/no questions to work out everyone else's identity.

## Play

Visit the [GitHub Pages game](https://charlie9578.github.io/find-the-god/) (once GitHub Pages is enabled), or serve the repository locally and open `index.html`.

1. Agree on a shared seed, round, player roster, and number of god cards (7–25). The number of cards must accommodate the active players.
2. Share the setup link or code. Each player selects their own name on their own device.
3. Keep your secret god private. Ask other players yes/no questions about their god's appearance; a **yes** earns another question, while a **no** ends your turn.
4. Use **✓** to confirm a god and **✕** to rule one out on your own deduction board. Enlarge and flip the cards to read the official mythology clues.
5. The first player to correctly name all the other players' gods wins. Record the winner to update the scoreboard, and move to the next round.

The game uses a shared seed to produce deterministic card assignments on each device; no accounts or backend are needed. Private deductions and scores are stored locally in your browser.

## Local development

This is a static website with no build tooling or package installation required. From the repository root, start a simple local web server, for example:

```sh
python3 -m http.server 8000
```

Visit `http://localhost:8000/`.

## GitHub Pages

In **Settings → Pages**, choose **Deploy from a branch**, then select `main` and `/(root)`. The site will be published at `https://charlie9578.github.io/find-the-god/` after the deployment completes.

The repository uses relative paths, so the game works under the project site's `/find-the-god/` URL. It does not require a server-side runtime.

## Project layout

- `index.html` — entry point and app containers
- `css/style.css` — layout and styling
- `js/art.js` — asset paths for the deity cards
- `js/game.js` — rules, setup, gameplay, interaction, and browser storage
- `assets/` — original illustrated god cards as WebP files

## License

No license has been specified for the source code or card illustrations.

## Sharing and next rounds

From setup, choose **Share setup** to copy a URL containing the seed, round, selected players, card count and player names. During a game, use **↗ Share** in the top bar to copy a link to the current round. Everyone opens the link and chooses their own player name. The URL never includes private deductions or secret identities; scores remain local to each browser.

At the end of a round, tap **Next round** and then tap the winner's name to award a point and advance. Choose **Skip winner** to advance without awarding a point.

Card images are WebP; immediately visible cards load eagerly while remaining round images are warmed into the browser cache after the initial render.
