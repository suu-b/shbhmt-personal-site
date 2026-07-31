document.addEventListener('DOMContentLoaded', async () => {

    function makeReadOnly() {
        document
            .querySelectorAll('[contenteditable="true"]')
            .forEach(el => el.setAttribute('contenteditable', 'false'));

        document
            .querySelectorAll('input, textarea, select')
            .forEach(el => {
                el.setAttribute('disabled', 'true');
                el.classList.add('readonly');
            });
    }

    function parseFrontmatter(markdown) {
        const match = markdown.match(/^---\r?\n([\s\S]+?)\r?\n---/);
        if (!match) return { data: {}, content: markdown };

        const yamlStr = match[1];
        const data = {};
        const lines = yamlStr.split('\n');

        lines.forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex > -1) {
                const key = line.slice(0, colonIndex).trim();
                let val = line.slice(colonIndex + 1).trim();
                if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                    val = val.slice(1, -1);
                }
                if (val.startsWith('[') && val.endsWith(']')) {
                    try {
                        const jsonVal = val.replace(/'/g, '"');
                        data[key] = JSON.parse(jsonVal);
                    } catch (e) {
                        data[key] = val.slice(1, -1).split(',').map(v => v.replace(/["']/g, '').trim());
                    }
                } else {
                    data[key] = val;
                }
            }
        });

        const content = markdown.slice(match[0].length);
        return { data, content };
    }

    const mode = await window.state.get('mode');
    const articleData = await window.state.get('selectedArticleData');

    if (mode === 'read') {
        // If it is a published article, show read-only view and hide save/preview/publish buttons
        if (articleData && articleData.draft === false) {
            // Hide editor elements, show read-only elements
            document.querySelector('.metadata-edit-box').style.display = 'none';
            document.querySelector('.metadata-read-box').style.display = 'block';

            // Hide action buttons completely for published articles
            document.getElementById('previewBtn').style.display = 'none';
            document.getElementById('saveBtn').style.display = 'none';
            document.getElementById('publishBtn').style.display = 'none';

            // Populate article content
            const descVal = articleData.desc || "";
            const descEl = document.querySelector('.article-description-text');
            if (descVal) {
                descEl.textContent = descVal;
                descEl.style.display = 'block';
            } else {
                descEl.style.display = 'none';
            }

            // Populate date
            document.querySelector('.date-text').textContent = articleData.date;

            // Render tags as individual badges matching site styles
            const tagsContainer = document.querySelector('.article-tags-container');
            tagsContainer.innerHTML = '';
            (articleData.tags || []).forEach(tag => {
                const span = document.createElement('span');
                span.className = 'uppercase tracking-wider px-2 py-0.5 border border-[#2D3033] rounded text-slate-500 bg-[#161616] text-[10px]';
                span.textContent = tag;
                tagsContainer.appendChild(span);
            });

            const content = await window.api.readFileFromGitHub(articleData.path);
            const parsed = parseFrontmatter(content);
            const dirty = marked.parse(parsed.content, { gfm: true, breaks: true });
            const cleanHTML = DOMPurify.sanitize(dirty, {
                ADD_ATTR: ["href", "target", "rel", "allow", "allowfullscreen", "frameborder", "scrolling", "src"],
                ADD_TAGS: ["iframe"],
                ALLOWED_URI_REGEXP: /^https?:\/\//
            });

            const box = document.querySelector('.content');
            const contentDiv = document.createElement('div');
            contentDiv.className = 'article-content leading-relaxed text-justify mt-8';
            contentDiv.innerHTML = cleanHTML;

            box.parentNode.replaceChild(contentDiv, box);

            if (window.MathJax && window.MathJax.typesetPromise) {
                await window.MathJax.typesetPromise([contentDiv]);
            }

            makeReadOnly();
            return;
        }

        // If it is a draft, switch to write (edit) mode
        await window.state.set('mode', 'write');
    }

    let previewMode = false;
    let oldContent = "";
    let selectedTags = [];
    let allTags = [];

    const dropdownBtn = document.getElementById("article-tag-dropdown-btn");
    const dropdownMenu = document.getElementById("article-tag-dropdown-menu");
    const dropdownChevron = document.getElementById("article-dropdown-chevron");

    function toggleDropdown() {
        if (!dropdownMenu || !dropdownChevron) return;
        const isHidden = dropdownMenu.classList.toggle("hidden");
        if (isHidden) {
            dropdownChevron.classList.remove("rotate-180");
        } else {
            dropdownChevron.classList.add("rotate-180");
        }
    }

    document.addEventListener("click", (e) => {
        if (!dropdownBtn || !dropdownMenu || !dropdownChevron) return;
        if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
            dropdownMenu.classList.add("hidden");
            dropdownChevron.classList.remove("rotate-180");
        }
    });

    dropdownBtn?.addEventListener("click", toggleDropdown);

    const article = document.querySelector('.article');
    const box = document.querySelector('.article .content');
    const heading = document.querySelector('.article-heading');
    const dialog = document.querySelector('.dialog');

    const previewBtn = document.getElementById('previewBtn');
    const publishBtn = document.getElementById('publishBtn');
    const saveBtn = document.getElementById('saveBtn');

    previewBtn.style.display = 'block';
    publishBtn.style.display = 'block';
    saveBtn.style.display = 'block';

    const deployBtn = document.getElementById('deployBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const errorP = document.getElementById('error');

    const date = document.querySelector('.date');
    const inputDate = document.createElement('input');
    inputDate.type = 'date';
    inputDate.className = 'date';
    date.parentNode.replaceChild(inputDate, date);

    function autoGrow(el) {
        if (!el) return;
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
    }

    autoGrow(box);
    autoGrow(heading);

    box.addEventListener('input', () => autoGrow(box));
    heading.addEventListener('input', () => autoGrow(heading));

    window.addEventListener('resize', () => {
        autoGrow(box);
        autoGrow(heading);
    });

    box.placeholder = "Start writing from here..Write in markdown. Use the button on the top to convert it to rich-text";

    const preview = document.createElement('div');
    preview.className = 'content';
    preview.style.display = 'none';
    box.parentNode.insertBefore(preview, box.nextSibling);

    if (articleData && articleData.path) {
        try {
            const content = await window.api.readFileFromGitHub(articleData.path);
            const parsed = parseFrontmatter(content);
            heading.textContent = parsed.data.title || articleData.title;
            document.querySelector('.article-description').value = parsed.data.description || articleData.desc || "";

            if (parsed.data.date) {
                const parsedDate = new Date(parsed.data.date);
                if (!isNaN(parsedDate)) {
                    inputDate.value = parsedDate.toISOString().split('T')[0];
                }
            } else if (articleData.date) {
                const parsedDate = new Date(articleData.date);
                if (!isNaN(parsedDate)) {
                    inputDate.value = parsedDate.toISOString().split('T')[0];
                }
            }

            selectedTags = parsed.data.tags || articleData.tags || [];
            box.value = parsed.content;

            autoGrow(box);
            autoGrow(heading);
            renderDropdownOptions();
            renderActivePills();
        } catch (err) {
            console.error("Failed to load draft from GitHub", err);
            loadFromLocal();
        }
    } else {
        loadFromLocal();
    }
    loadTagRecommendations();

    setInterval(() => {
        saveToLocal();
        console.log("Draft auto-saved to localStorage.");
    }, 60000);

    saveBtn.addEventListener('click', () => {
        saveToLocal();
        showNotification("Draft saved locally", "success");
    });

    function formatDate(date) {
        if (!date || isNaN(date.getTime())) return "";
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();

        const suffix =
            day % 10 === 1 && day !== 11
                ? "st"
                : day % 10 === 2 && day !== 12
                    ? "nd"
                    : day % 10 === 3 && day !== 13
                        ? "rd"
                        : "th";

        return `${month} ${day}${suffix}, ${year}`;
    }

    previewBtn.addEventListener('click', async () => {
        previewMode = !previewMode;
        if (previewMode) {
            previewBtn.textContent = "Edit";
            oldContent = box.value;

            const dirty = marked.parse(oldContent, { gfm: true, breaks: true });
            const cleanHTML = DOMPurify.sanitize(dirty, {
                ADD_ATTR: ["href", "target", "rel", "allow", "allowfullscreen", "frameborder", "scrolling", "src"],
                ADD_TAGS: ["iframe"],
                ALLOWED_URI_REGEXP: /^https?:\/\//
            });

            preview.innerHTML = cleanHTML;
            if (window.MathJax && window.MathJax.typesetPromise) {
                await window.MathJax.typesetPromise([preview]);
            }

            box.style.display = 'none';
            preview.style.display = 'block';

            // Switch metadata container views for realistic preview
            document.querySelector('.metadata-edit-box').style.display = 'none';
            document.querySelector('.metadata-read-box').style.display = 'block';

            document.querySelector('.article-description-text').textContent = document.querySelector('.article-description').value;

            const dateVal = document.querySelector('.date').value;
            document.querySelector('.date-text').textContent = dateVal ? formatDate(new Date(dateVal)) : "";

            const tagsContainer = document.querySelector('.article-tags-container');
            tagsContainer.innerHTML = '';
            selectedTags.forEach(tag => {
                const span = document.createElement('span');
                span.className = 'uppercase tracking-wider px-2 py-0.5 border border-[#2D3033] rounded text-slate-500 bg-[#161616] text-[10px]';
                span.textContent = tag;
                tagsContainer.appendChild(span);
            });
        } else {
            previewBtn.textContent = "Preview";
            box.style.display = 'block';
            preview.style.display = 'none';
            box.value = oldContent;
            autoGrow(box);

            // Switch back to edit metadata container
            document.querySelector('.metadata-edit-box').style.display = 'block';
            document.querySelector('.metadata-read-box').style.display = 'none';
        }
    });

    publishBtn.addEventListener('click', () => {
        article.style.display = 'none';
        dialog.style.display = 'flex';
    });

    deployBtn.addEventListener('click', async () => {
        const title = heading.textContent.trim();
        const description = document.querySelector('.article-description').value.trim();
        const dateVal = document.querySelector('.date').value;
        const tags = selectedTags;
        const content = box.value;

        const payload = { title, date: dateVal, content };
        const emptyFields = Object.entries(payload).filter(([_, v]) => !v).map(([k]) => k);

        if (emptyFields.length > 0) {
            errorP.textContent = "Missing mandatory fields: " + emptyFields.join(", ");
            errorP.style.display = "block";
            return;
        }

        const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: ${dateVal}
tags: ${JSON.stringify(tags)}
draft: false
---

${content}`;

        const slug = `${dateVal}-${slugify(title)}.md`;
        const contentPath = `apps/site/src/content/articles/${slug}`;
        const commitMessage = `OTTO Commit: ${title} published`;

        errorP.style.display = "none";
        deployBtn.textContent = "Deploying...";
        deployBtn.disabled = true;

        try {
            await window.api.deployToGitHub(contentPath, frontmatter, commitMessage);
            console.log("Deployed successfully!");
            showNotification("Deployed Successfully :D", "success");
            localStorage.removeItem('ottoDraft');
            window.nav.go('dashboard.html');
        } catch (error) {
            console.error("Failed to deploy:", error);
            showNotification("Failed to deploy :C", "error");
        } finally {
            deployBtn.disabled = false;
            deployBtn.textContent = "Deploy";
        }
    });

    cancelBtn.addEventListener('click', () => {
        article.style.display = 'block';
        dialog.style.display = 'none';
        errorP.textContent = "";
    });

    function saveToLocal() {
        const draft = {
            heading: heading.textContent,
            description: document.querySelector('.article-description').value,
            date: document.querySelector('.date').value,
            tags: selectedTags,
            content: box.value
        };
        localStorage.setItem('ottoDraft', JSON.stringify(draft));
    }

    function loadFromLocal() {
        const draftStr = localStorage.getItem('ottoDraft');
        if (!draftStr) return;
        try {
            const draft = JSON.parse(draftStr);
            if (draft.heading) heading.textContent = draft.heading;
            if (draft.description) document.querySelector('.article-description').value = draft.description;
            if (draft.date) document.querySelector('.date').value = draft.date;
            if (draft.tags) {
                selectedTags = Array.isArray(draft.tags) ? draft.tags : draft.tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean);
            }
            if (draft.content) box.value = draft.content;

            autoGrow(box);
            autoGrow(heading);
            renderDropdownOptions();
            renderActivePills();
        } catch (err) {
            console.error("Failed to parse local draft", err);
        }
    }

    async function loadTagRecommendations() {
        try {
            const rawConfig = await window.api.readFileFromGitHub('shared/config/tags.json');
            allTags = JSON.parse(rawConfig || '[]');
            renderDropdownOptions();
            renderActivePills();
        } catch (error) {
            console.error("Failed to load tag recommendations:", error);
        }
    }

    function renderDropdownOptions() {
        const optionsContainer = document.getElementById("article-tag-dropdown-options");
        if (!optionsContainer) return;
        optionsContainer.innerHTML = '';

        allTags.forEach(tag => {
            const btn = document.createElement("button");
            btn.type = 'button';
            btn.className = "dropdown-tag-option block w-full text-left px-4 py-2.5 text-lg text-slate-300 hover:bg-[#202020] hover:text-slate-100 transition-colors";
            btn.setAttribute("role", "menuitem");
            btn.setAttribute("data-tag", tag);

            const cleanTag = tag.trim().toLowerCase();
            const isActive = selectedTags.includes(cleanTag);

            if (isActive) {
                btn.classList.add("bg-[#202020]", "text-slate-100", "font-medium");
                btn.innerHTML = `✓ ${cleanTag}`;
            } else {
                btn.innerHTML = cleanTag;
            }

            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (selectedTags.includes(cleanTag)) {
                    selectedTags = selectedTags.filter(t => t !== cleanTag);
                } else {
                    selectedTags.push(cleanTag);
                }
                renderDropdownOptions();
                renderActivePills();
                saveToLocal();
            };

            optionsContainer.appendChild(btn);
        });
    }

    function renderActivePills() {
        const pillsContainer = document.getElementById("article-active-tags-pills");
        if (!pillsContainer) return;
        pillsContainer.innerHTML = '';

        selectedTags.forEach(tag => {
            const pill = document.createElement("span");
            pill.className = "badge-tag relative z-10 cursor-pointer flex items-center gap-1.5 hover:text-slate-300 hover:border-slate-500 transition-all";
            pill.innerHTML = `
                ${tag}
                <span class="remove-tag text-xs font-bold text-slate-500 hover:text-slate-300">×</span>
            `;

            pill.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                selectedTags = selectedTags.filter(t => t !== tag);
                renderDropdownOptions();
                renderActivePills();
                saveToLocal();
            };

            pillsContainer.appendChild(pill);
        });
    }

    function slugify(text) {
        return text.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
    }

    function showNotification(message, type = "info") {
        alert(`${type.toUpperCase()}: ${message}`);
    }
});
