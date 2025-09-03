const content = new Map([
    ["journal", {
        title: "Journals",
        description: "Reflections on some personal and interpersonal events, learnings, and life updates.",
    }],
    ["meditation", {
        title: "Meditations",
        description: "Opinions, Ideas, and Philosophical Intrigues.",
    }],
    ["media", {
        title: "Media",
        description: "Books, Films, TV Shows, and Songs",
    }],
    ["cerebrum", {
        title: "Notes from the Cerebrum",
        description: "Disciplines, Meta-disciplines, and nerdy topics.",
    }],
    ["art", {
        title: "Art",
        description: "My Artistic Attempts.",
    }],
    ["poetry", {
        title: "Poesy",
        description: "Poetry from the Romantic and the Shubham-ic tradition.",
    }]
]);

export function getDataFromContentType(contentType) {
    switch(contentType) {
        case "journal":
            return content.get("journal");
        case "meditation":
            return content.get("meditation");
        case "media":
            return content.get("media");
        case "cerebrum":
            return content.get("cerebrum");
        case "art":
            return content.get("art");
        case "poetry":
            return content.get("poetry");
        default:
            return null;
    }
}