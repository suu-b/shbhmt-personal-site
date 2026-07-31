document.addEventListener('DOMContentLoaded', async () => {
    const articlesPath = 'apps/site/src/content/articles';

    let articles = [];
    let allTags = [];
    let activeTags = [];
    let searchQuery = "";
    let sortOrder = "desc";

    const articleSearchInput = document.getElementById("article-search-input");
    const dropdownBtn = document.getElementById("tag-dropdown-btn");
    const dropdownMenu = document.getElementById("tag-dropdown-menu");
    const dropdownChevron = document.getElementById("dropdown-chevron");
    const tagSearchInput = document.getElementById("tag-search-input");
    const activeTagsContainer = document.getElementById("active-tags-container");
    const sortBtn = document.getElementById("sort-btn");
    const sortBtnText = document.getElementById("sort-btn-text");
    const sortIcon = document.getElementById("sort-icon");
    const emptyState = document.getElementById("empty-state");
    const clearFiltersBtn = document.getElementById("clear-filters-btn");
    const articlesList = document.getElementById("articles-list");

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
                    } catch(e) {
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

    function toggleDropdown() {
        if (!dropdownMenu || !dropdownChevron) return;
        const isHidden = dropdownMenu.classList.toggle("hidden");
        if (isHidden) {
            dropdownChevron.classList.remove("rotate-180");
        } else {
            dropdownChevron.classList.add("rotate-180");
            if (tagSearchInput) {
                tagSearchInput.value = "";
            }
            document.querySelectorAll(".dropdown-tag-option").forEach((opt) => {
                opt.style.display = "";
            });
            if (tagSearchInput) {
                setTimeout(() => tagSearchInput.focus(), 50);
            }
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

    tagSearchInput?.addEventListener("input", () => {
        if (!tagSearchInput) return;
        const query = tagSearchInput.value.toLowerCase().trim();
        document.querySelectorAll(".dropdown-tag-option").forEach((option) => {
            const tag = option.getAttribute("data-tag");
            if (!tag) return;
            const cleanTag = tag.toLowerCase();
            if (cleanTag.includes(query)) {
                option.style.display = "";
            } else {
                option.style.display = "none";
            }
        });
    });

    function renderDropdownOptions() {
        const optionsContainer = document.getElementById("tag-dropdown-options");
        if (!optionsContainer) return;
        optionsContainer.innerHTML = '';
        
        allTags.forEach(tag => {
            const btn = document.createElement("button");
            btn.className = "dropdown-tag-option block w-full text-left px-4 py-2.5 text-lg text-slate-300 hover:bg-[#202020] hover:text-slate-100 transition-colors";
            btn.setAttribute("role", "menuitem");
            btn.setAttribute("data-tag", tag);
            btn.textContent = tag;
            
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const cleanTag = tag.trim().toLowerCase();
                if (activeTags.includes(cleanTag)) {
                    removeTagFilter(cleanTag);
                } else {
                    addTagFilter(cleanTag);
                }
                dropdownMenu.classList.add("hidden");
                dropdownChevron.classList.remove("rotate-180");
            };
            
            optionsContainer.appendChild(btn);
        });
    }

    function renderArticlesList() {
        if (!articlesList) return;

        // 1. Filter articles
        const filtered = articles.filter(article => {
            const matchesTags = activeTags.every(tag =>
                (article.tags || []).map(t => t.toLowerCase()).includes(tag)
            );
            const matchesQuery = !searchQuery || 
                (article.title || "").toLowerCase().includes(searchQuery) || 
                (article.description || "").toLowerCase().includes(searchQuery);
            return matchesTags && matchesQuery;
        });

        // 2. Sort articles
        filtered.sort((a, b) => {
            const dateA = new Date(a.date).getTime() || 0;
            const dateB = new Date(b.date).getTime() || 0;
            return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

        // 3. Render
        articlesList.innerHTML = "";
        
        if (filtered.length === 0) {
            emptyState.classList.remove("hidden");
            articlesList.classList.add("hidden");
        } else {
            emptyState.classList.add("hidden");
            articlesList.classList.remove("hidden");

            filtered.forEach(item => {
                const itemDiv = document.createElement("div");
                itemDiv.className = "post-list-item relative group border-b border-[#2D3033] last:border-0 py-6";
                
                // Clicking anywhere on the item opens it for viewing/editing
                itemDiv.onclick = async (e) => {
                    // Prevent navigation click if clicking on a tag badge
                    if (e.target.closest('.select-tag-badge')) return;

                    const selectedArticleData = {
                        path: item.path,
                        name: item.name,
                        title: item.title,
                        desc: item.description,
                        date: item.date instanceof Date ? item.date.toISOString().split('T')[0] : String(item.date),
                        tags: item.tags,
                        draft: item.draft
                    };
                    await window.state.set('selectedArticleData', selectedArticleData);
                    await window.state.set('mode', 'read');
                    window.nav.go('article.html');
                };

                const tagsHtml = (item.tags || []).map(tag => 
                    `<a class="badge-tag relative z-10 select-tag-badge cursor-pointer hover:text-slate-300 hover:border-slate-500 transition-colors" data-tag="${tag}">${tag}</a>`
                ).join(" ");

                const draftBadge = item.draft ? `<span class="badge-tag border-amber-500/50 text-amber-500 bg-amber-950/20 text-[10px] uppercase font-bold tracking-wider relative z-10">Draft</span>` : "";

                itemDiv.innerHTML = `
                    <h3 class="list-item-title">
                        <a href="#" class="after:absolute after:inset-0 after:z-0 cursor-pointer" onclick="event.preventDefault();">
                            ${item.title}
                        </a>
                    </h3>
                    <p class="list-item-desc">${item.description || "No description provided."}</p>
                    <div class="list-item-meta flex items-center gap-3 mt-4">
                        <span class="text-sm text-slate-500">${formatDate(new Date(item.date))}</span>
                        ${draftBadge}
                        <div class="flex items-center gap-1.5">
                            ${tagsHtml}
                        </div>
                    </div>
                `;

                // Add tag click listeners inside the item
                itemDiv.querySelectorAll('.select-tag-badge').forEach(badge => {
                    badge.onclick = (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const tag = badge.getAttribute('data-tag');
                        if (tag) addTagFilter(tag);
                    };
                });

                articlesList.appendChild(itemDiv);
            });
        }

        renderActivePills();
        updateSortButtonUI();
        updateDropdownUI();
    }

    function updateDropdownUI() {
        document.querySelectorAll(".dropdown-tag-option").forEach((option) => {
            const tag = option.getAttribute("data-tag");
            if (!tag) return;
            const cleanTag = tag.trim().toLowerCase();
            const isActive = activeTags.includes(cleanTag);

            if (isActive) {
                option.classList.add("bg-[#202020]", "text-slate-100", "font-medium");
                option.innerHTML = `✓ ${cleanTag}`;
            } else {
                option.classList.remove("bg-[#202020]", "text-slate-100", "font-medium");
                option.innerHTML = cleanTag;
            }
        });
    }

    function renderActivePills() {
        if (!activeTagsContainer) return;

        if (activeTags.length === 0 && !searchQuery) {
            activeTagsContainer.classList.add("hidden");
            activeTagsContainer.innerHTML = "";
            return;
        }

        activeTagsContainer.classList.remove("hidden");
        activeTagsContainer.innerHTML = "";

        activeTags.forEach((tag) => {
            const pill = document.createElement("span");
            pill.className = "badge-tag relative z-10 cursor-pointer flex items-center gap-1.5 hover:text-slate-300 hover:border-slate-500 transition-all";
            pill.innerHTML = `
                ${tag}
                <span class="remove-tag text-xs font-bold text-slate-500 hover:text-slate-300">×</span>
            `;

            pill.addEventListener("click", () => {
                removeTagFilter(tag);
            });

            activeTagsContainer.appendChild(pill);
        });

        if (searchQuery) {
            const searchPill = document.createElement("span");
            searchPill.className = "badge-tag relative z-10 cursor-pointer flex items-center gap-1.5 hover:text-slate-200 hover:border-slate-400 transition-all border-slate-500 text-slate-300 bg-[#202020]";
            searchPill.innerHTML = `
                <svg class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <span class="max-w-[120px] truncate">"${searchQuery}"</span>
                <span class="remove-tag text-sm font-bold text-slate-500 hover:text-slate-300 transition-colors ml-0.5">×</span>
            `;

            searchPill.addEventListener("click", () => {
                searchQuery = "";
                if (articleSearchInput) {
                    articleSearchInput.value = "";
                }
                renderArticlesList();
            });

            activeTagsContainer.appendChild(searchPill);
        }
    }

    function updateSortButtonUI() {
        if (sortOrder === "asc") {
            if (sortBtnText) sortBtnText.textContent = "Oldest First";
            if (sortIcon) sortIcon.classList.add("rotate-180");
        } else {
            if (sortBtnText) sortBtnText.textContent = "Newest First";
            if (sortIcon) sortIcon.classList.remove("rotate-180");
        }
    }

    function addTagFilter(tag) {
        const cleanTag = tag.trim().toLowerCase();
        if (cleanTag && !activeTags.includes(cleanTag)) {
            activeTags.push(cleanTag);
            renderArticlesList();
        }
    }

    function removeTagFilter(tag) {
        const cleanTag = tag.trim().toLowerCase();
        activeTags = activeTags.filter((t) => t !== cleanTag);
        renderArticlesList();
    }

    sortBtn?.addEventListener("click", () => {
        sortOrder = sortOrder === "desc" ? "asc" : "desc";
        renderArticlesList();
    });

    clearFiltersBtn?.addEventListener("click", () => {
        activeTags = [];
        searchQuery = "";
        if (articleSearchInput) {
            articleSearchInput.value = "";
        }
        renderArticlesList();
    });

    articleSearchInput?.addEventListener("input", () => {
        if (!articleSearchInput) return;
        searchQuery = articleSearchInput.value.toLowerCase().trim();
        renderArticlesList();
    });

    articleSearchInput?.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            if (!articleSearchInput) return;
            searchQuery = articleSearchInput.value.toLowerCase().trim();
            renderArticlesList();
        }
    });

    const refreshBtn = document.getElementById("refresh-btn");
    
    async function fetchArticlesFromGitHub() {
        const refreshIcon = document.getElementById("refresh-icon");
        if (refreshIcon) refreshIcon.classList.add("animate-spin");
        if (refreshBtn) refreshBtn.disabled = true;

        if (articlesList && articles.length === 0) {
            articlesList.innerHTML = '<div style="text-align: center; color: var(--muted); padding: 40px 0;">Fetching articles from GitHub...</div>';
        }

        try {
            const files = await window.api.readDirFromGitHub(articlesPath);
            const mdFiles = files.filter(f => f.name.endsWith('.md'));

            articles = await Promise.all(
                mdFiles.map(async (file) => {
                    const content = await window.api.readFileFromGitHub(file.path);
                    const parsed = parseFrontmatter(content);
                    return {
                        path: file.path,
                        name: file.name,
                        title: parsed.data.title || file.name,
                        description: parsed.data.description || "",
                        date: parsed.data.date ? new Date(parsed.data.date) : new Date(),
                        tags: parsed.data.tags || [],
                        draft: parsed.data.draft === 'true' || parsed.data.draft === true
                    };
                })
            );

            // Save raw data to localStorage
            localStorage.setItem('otto_cached_articles', JSON.stringify(articles));

            allTags = [...new Set(articles.flatMap(post => post.tags || []))].sort();

            renderDropdownOptions();
            renderArticlesList();
        } catch (error) {
            console.error("Error loading dashboard articles:", error);
            if (articlesList && articles.length === 0) {
                articlesList.innerHTML = '<div style="text-align: center; color: red; padding: 20px;">Failed to load articles from GitHub.</div>';
            }
        } finally {
            if (refreshIcon) refreshIcon.classList.remove("animate-spin");
            if (refreshBtn) refreshBtn.disabled = false;
        }
    }

    refreshBtn?.addEventListener("click", fetchArticlesFromGitHub);

    // Initial Load - Check cache first
    const cached = localStorage.getItem('otto_cached_articles');
    if (cached) {
        try {
            articles = JSON.parse(cached);
            // Convert date strings back to Date objects
            articles.forEach(item => {
                item.date = item.date ? new Date(item.date) : new Date();
            });
            allTags = [...new Set(articles.flatMap(post => post.tags || []))].sort();
            renderDropdownOptions();
            renderArticlesList();
        } catch (err) {
            console.error("Failed to parse cached articles", err);
            fetchArticlesFromGitHub();
        }
    } else {
        fetchArticlesFromGitHub();
    }
});
