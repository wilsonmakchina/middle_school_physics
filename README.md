Follow these steps to update the mkdocs:

---

### **1. Make Your Changes**
Edit the Markdown files in your `docs` folder (or wherever your content is stored). For example:
- Add new `.md` files.
- Update existing `.md` files.
- Modify the `mkdocs.yml` configuration file if needed (e.g., to add new pages or change the site structure).

---

### **2. Preview Your Changes Locally**
Before deploying, it's a good idea to preview your changes locally to ensure everything looks correct. Run the following command:
```bash
mkdocs serve
```
This will start a local server, and you can view your site at `http://127.0.0.1:8000`.

---

### **3. Build the Site**
Once you're satisfied with your changes, build the site:
```bash
mkdocs build
```
This generates the static HTML files in the `site` folder.

---

### **4. Deploy to GitHub Pages**
Use the `mkdocs gh-deploy` command to deploy the updated site to GitHub Pages:
```bash
mkdocs gh-deploy
```
This will:
1. Build the site (if not already built).
2. Push the updated files to the `gh-pages` branch of your repository.

---

### **5. Verify the Update**
After deploying, visit your GitHub Pages URL (e.g., `https://<username>.github.io/<repository-name>`) to verify that the changes are live.

---

### **Optional: Commit Changes to Your Main Branch**
If you want to keep track of your content changes in your main branch (e.g., `main` or `master`), commit the changes to Git:
```bash
git add .
git commit -m "Updated content for MkDocs site"
git push origin main
```
This ensures your source files (Markdown and `mkdocs.yml`) are version-controlled.

---

### **Summary**
1. Edit your content.
2. Preview locally with `mkdocs serve`.
3. Build the site with `mkdocs build`.
4. Deploy with `mkdocs gh-deploy`.
5. Verify the update on GitHub Pages.
