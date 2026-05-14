# 📝 Modern Markdown Previewer

A sophisticated, real-time Markdown editor designed for speed and precision. Built as a high-performance React application, it offers a seamless bridge between raw syntax and professional typography.

---

## 🚀 Experience the Workflow

This project isn't just a basic previewer; it’s a focused writing environment. By leveraging a custom React architecture, it ensures that your thoughts are captured instantly and rendered beautifully.

### **Core Highlights**

* **Live GFM Engine:** Instant rendering for GitHub Flavored Markdown, including complex tables and syntax-highlighted code blocks.
* **Stateful Persistence:** Integrates a custom `useLocalStorage` hook to ensure your work survives page refreshes and browser crashes.
* **Dynamic Analytics:** Real-time metrics for word, character, and line counts to help you track document density.
* **Zen Writing Experience:** A distraction-free editor with browser "smart-features" disabled to prevent intrusive auto-corrections.

---

## 🛠️ Internal Architecture

The project is built on a modular "hook-first" architecture, keeping the UI separate from the processing logic:

| Feature | Implementation | Location |
| --- | --- | --- |
| **Parsing** | `Marked` Library | `useMarkdown.js` |
| **Persistence** | `LocalStorage API` | `useLocalStorage.js` |
| **State Sync** | `useMemo` & `useCallback` | `useMarkdown.js` |
| **Responsive UI** | `Flexbox` & `Media Queries` | `App.css` |

---

## 📂 Installation

```bash
# Clone the project
git clone https://github.com/your-username/markdown-previewer.git

# Enter the directory
cd markdown-previewer

# Install modern dependencies
npm install

# Launch the Vite development server
npm run dev

```

---

## 🎨 Design Tokens

The application features a custom-built **"Warm/Paper"** theme defined via CSS Variables. This makes theme switching or customization as simple as changing a few HEX codes in the `:root` selector:

```css
--bg-page: #f5f2ee;     /* Warm off-white background */
--text-primary: #1a1814; /* Deep charcoal for readability */
--text-link: #2a5c45;    /* Forest green accents */
--font-prose: "Lora", Georgia, serif; /* Elegant serif for preview */

```

---

## 🤝 Contributing

This project was built to demonstrate clean React state management and modular design. Feel free to fork, submit PRs, or suggest new "Design Tokens" for different themes!

**Author:** [Aditya Sunil Chouksey]

**License:** MIT

---
