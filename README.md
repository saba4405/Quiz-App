# 🧠 Knowledge Quiz App

A timed quiz app that tests your knowledge of HTML, CSS and JavaScript interview questions. Enter your name, answer 10 questions, and see your score at the end.

🔗 **Live Demo:** http://127.0.0.1:5500/index.html
💻 **GitHub Repo:** https://github.com/saba4405/Quiz-App

![Quiz App Screenshot]
<img width="1465" height="906" alt="image" src="https://github.com/user-attachments/assets/0fd58e72-b311-47f5-b944-3962eef32691" />
<img width="1652" height="900" alt="image" src="https://github.com/user-attachments/assets/800e46c6-f4b9-40e9-9dfe-693d3779229b" />
<img width="1341" height="908" alt="Screenshot 2026-10-27 142023" src="https://github.com/user-attachments/assets/589c9b62-be83-463b-bc16-dbbe6cec2e1b" />

## ✨ Features

- Enter your name on the start page, and see it on the final score screen
- **10 questions** every time.
- **Repeated questions**
- **20-second timer** for every question, and the quiz moves on automatically when time runs out
- **Hint button** for every question
- Correct answer turns **with a ✓**; wrong answer turns **with a ✗**, and the correct one is shown
- Final score with a message based on your result
- Progress is saved in the browser using `localStorage`

## 🛠️ Built With

- HTML5
- CSS3
- JavaScript (ES6): classes, array methods, DOM manipulation, timers, `localStorage`

## 📁 Project Structure

```
Quiz app/
├── index.html      # Start page (name input)
├── index2.html     # Quiz page
├── script.js       # Start page logic
├── script2.js      # Quiz logic (Quiz class, timer, scoring)
├── style.css       # Styles
├── style2.css      # Styles
└── images/
```

## 🚀 How to Run

1. Download or clone this repository:
   ```
   git clone [PASTE YOUR REPO LINK HERE]
   ```
2. Open `index.html` in your browser.

No installation needed.

## 🧩 What I Learned

- Building a `Quiz` class to keep logic separate from the display
- Using `setInterval` and `clearInterval` for a countdown timer
- Creating DOM elements dynamically and updating them with events

## 🔮 Future Improvements

- Rebuild in React and TypeScript
- Add more 100 questions which does not repeat. (Specially the questions which helps students for the interview) 
- Add categories (HTML only, CSS only, JS only)
- Add a high-score board

## 👩‍💻 Author

**Saba**
[GitHub: saba4405](https://github.com/saba4405)
