# Vibe ⚡️

**Vibe** is an AI-powered web development platform that transforms natural language prompts into production-ready, full-stack websites. Built with **Next.js** and **Inngest**, Vibe handles the heavy lifting of code generation and file structuring in the background, delivering a complete `.tsx` codebase ready for deployment.

---

## 🚀 The Workflow

Vibe isn't just a simple wrapper; it’s an asynchronous engine:
1. **The Prompt:** You describe the website you want (e.g., *"A modern SaaS landing page with dark mode and a pricing table"*).
2. **Background Processing:** **Inngest** triggers a reliable background job. No more timing out on long LLM calls.
3. **Sandboxed Generation:** Using **E2B sandboxes**, the AI generates a real file structure, validates the code, and packages it in an isolated environment.
4. **Completion:** Vibe notifies you once the build is finished. You get a full directory of `.tsx` files, components, and logic—not just a single code block.

---

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Workflow Engine:** [Inngest](https://www.inngest.com/) (Reliable background jobs & queues)
- **Runtime Sandbox:** [E2B](https://e2b.dev/) (Isolated code interpretation and file system)
- **LLM:** [OpenAI API](https://openai.com/) (GPT-4o / o1 for architectural logic)
- **Styling:** Tailwind CSS

---

## ✨ Key Features

- **Asynchronous UI:** Start a build, close the tab, and come back when it's done.
- **Full File Structure:** Generates entire folders, not just snippets.
- **Production-Ready Code:** Outputs clean, modular `.tsx` files.
- **Error Resilience:** Inngest retries ensure that even if an API flickers, your build continues.

---

