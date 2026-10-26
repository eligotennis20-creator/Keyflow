Keyflow

Type fast. Stay in flow.

Keyflow is a free typing speed test with real sentences, proverbs, code and numbers. Pick what you want to practice, choose your time, and see how fast you really are.

Play it here: keyflow-beryl.vercel.app

Keyflow is a hosted web app and is meant to be played on the live site. Local setup instructions are intentionally not provided, since upcoming features (like the leaderboard) will depend on the hosted version.

Features
6 practice categories:
-Everyday stories: short, easy passages
-Big words: sentences full of long words
-Proverbs: short sayings, full sentences
-Numbers: times, prices and facts
-Code: brackets, arrows and quotes
-Your own text: paste anything (homework, a song, a story) and type it
Flexible timing: 15 seconds, 30 seconds, 1 minute, 2 minutes, or any custom time from 5 to 600 seconds
Live feedback: correct letters turn dark, mistakes turn red, extra letters are flagged, and skipped words are underlined
Vine progress bar: a vine grows across the screen as the clock runs down
Results screen: WPM, accuracy, correct characters, category and time
Shareable links: jump straight into a category (for example /play.html#/code) or a specific test (/play.html#/code/60)
Keyboard friendly: works with non-Latin keyboard layouts by mapping physical keys to the expected characters
Accessible touches: visible focus states and reduced-motion support

How to use
Choose a category on the Play page.
Choose your time, or enter your own.
Click the words and start typing. The clock starts on your first keystroke.
Shortcuts
Key	Action
Tab	Restart the current test
Esc	Go back to time selection
Space	Move to the next word
Backspace	Delete the last typed character
How scoring works
WPM = (correct characters ÷ 5) ÷ minutes. A "word" is counted as 5 characters, the standard used by most typing tests.
A word only counts toward your score when it is typed fully correct, including the space after it.
Accuracy = correct keystrokes ÷ total keystrokes.

Built with
Plain HTML, CSS and JavaScript (no frameworks, no build step)
Bricolage Grotesque and IBM Plex Mono via Google Fonts
Hosted on Vercel
Project structure
index.html   Landing page
play.html    The typing test (category, time, test and results views)
app.js       Test logic, routing and scoring
texts.js     Passages and category definitions
style.css    All styling
Credits

Made by Eligo for Terra, a Hack Club program.
