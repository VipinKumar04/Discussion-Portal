# Discussion Portal

Discussion Portal is a browser-based application where users can post questions, browse existing questions, and share responses.

**Live Demo:** https://vipinkumar04.github.io/Discussion-Portal/

## Features

- Add questions with a subject and description.
- Search questions by subject.
- Mark questions as favourites.
- Add responses to questions.
- Like or dislike responses.
- Resolve questions when they have been answered.
- Save questions and responses using browser localStorage.


## Technologies Used

- HTML
- CSS
- JavaScript
- Font Awesome for icons

## Project Structure

```text
Discussion-Portal/
├── index.html
├── style.css
├── script.js
├── LICENSE
└── README.md
```

## Data Storage

The app stores questions and responses in the browser's `localStorage`. Saved data remains available in the same browser on the same device after refreshing the page, but it is not shared with other users or synced between devices. Clearing the browser's site data may remove it.

## Current Limitations

- There is no backend or shared database.
- User accounts and login are not included.
- Data is stored separately in each browser.

## License

See the [LICENSE](./LICENSE) file for details.
