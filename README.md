Keyflow

Keyflow is a clean, minimal typing speed test designed to help you build speed and rhythm. Built with plain HTML, CSS, and JavaScript as part of Terra (a Hack Club YSWS program).

Features

Real Sentence Practice: Practice with natural-sounding sentences, not just jumbled random words.

Multiple Categories: Choose from everyday stories, big words, proverbs, numbers, code snippets, or paste your own custom text.

Flexible Time Limits: Test your typing speed in 15s, 30s, 60s, or 120s sprints, or set a custom countdown time.

Visual Feedback: Real-time caret tracking, character coloring (green for correct, red for errors), and an animated vine growth progress bar.

Smart Input Handling: Supports layout fallbacks (for non-Latin layouts) and works seamlessly across desktop and mobile browsers.

Project Structure

├── index.html   # Landing page with program overview and category selection
├── play.html    # Main typing interface, time picker, and results screen
├── style.css    # Clean, responsive styles with Bricolage Grotesque & IBM Plex Mono fonts
├── texts.js     # Text banks, category definitions, and random passage generators
└── app.js       # Core game logic, input listener, caret positioning, and timer engine


Getting Started

No build tools, bundlers, or dependencies are required.

Clone or download this repository.

Open index.html or play.html directly in any web browser.

Select a category and time duration to start typing!

Credits

Built by Eligo for Terra (a Hack Club YSWS program).
