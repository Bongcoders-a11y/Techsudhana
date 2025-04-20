# 💬 Bongo AI Chat

**Bongo AI Chat** is a sleek, fully responsive web-based chatbot powered by the Gemini 1.5 Flash API. It provides real-time conversational AI capabilities with a modern, stylish interface and features like dark/light mode toggle, typing animations, and a seamless user experience.

---

## 🌟 Features

- ⚡ **AI Chatbot** powered by Google Gemini API
- 🌓 **Light/Dark Mode Toggle**
- 🎨 **Animated Backgrounds & Typing Indicators**
- 📱 **Responsive Design for All Devices**
- 💬 **Auto-resizing Input Field**
- ❌ **Error Handling & Feedback Messages**

---

## 🛠️ Tech Stack

- **HTML5** – Markup for chatbot layout
- **CSS3** – Modern and responsive styling
- **JavaScript (Vanilla)** – Core chatbot logic and API communication
- **Gemini 1.5 Flash API** – For generating intelligent AI responses

---

## 📁 File Structure

```
bongo-ai-chat/
├── index.html        # Main structure of the chatbot
├── styles.css        # Styles including dark/light theme and animations
└── script.js         # JavaScript for functionality and Gemini API calls
```

---

## 🚀 Getting Started

### 1. Clone or Download the Project

```bash
git clone https://github.com/yourusername/bongo-ai-chat.git
cd bongo-ai-chat
```

### 2. Run Locally

Simply open the `index.html` file in any modern browser:

```bash
start index.html
```

### 3. Add Your Gemini API Key

In `script.js`, replace the existing key in the `fetch()` call with your own key:

```js
const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY",
  ...
);
```

> 🛡️ **Security Note**: Avoid hardcoding sensitive keys in frontend code for production.

---

## 📸 Preview

![Bongo AI Chat Demo](screenshot.png)

*(Add a screenshot of your chatbot interface)*

---

## 📄 License

This project is licensed under the **MIT License**. Feel free to use and modify it for personal or commercial use.

---

## 🙌 Credits

Created with ❤️ by [Your Name]  
Powered by Gemini API & Open Web Technologies
