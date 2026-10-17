# Discussion Portal

Discussion Portal is a simple web app for posting questions and discussing them through responses. It was built with HTML, CSS, and JavaScript as a small frontend project.

## Features

- Add a question with a subject and description.
- Search questions by subject.
- Mark questions as favourites.
- Open a question to view its details and responses.
- Add responses to a question.
- Like or dislike responses.
- Mark a question as resolved.
- Save questions and responses in the browser with `localStorage`.

## Technologies Used

- HTML
- CSS
- JavaScript
- Font Awesome for icons

## Run Locally

The project does not require a backend or package installation.

1. Clone the repository:

   ```bash
   git clone https://github.com/VipinKumar04/Discussion-Portal.git
   ```

2. Open the `Discussion-Portal` folder.
3. Open `index.html` in your browser. You can also use the Live Server extension in VS Code.

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
