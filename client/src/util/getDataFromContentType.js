const content = new Map([
    ["journal", {
        title: "Journals",
        description: "Reflections on some personal and interpersonal events, learnings, and life updates.",
        banner: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Leonardo_da_Vinci_-_RCIN_912579%2C_Recto_Studies_of_water%2C_and_a_seated_old_man.jpg/1188px-Leonardo_da_Vinci_-_RCIN_912579%2C_Recto_Studies_of_water%2C_and_a_seated_old_man.jpg?20200817101838",
        src: "https://commons.wikimedia.org/wiki/File:Leonardo_da_Vinci_-_RCIN_912579,_Recto_Studies_of_water,_and_a_seated_old_man.jpg"
    }],
    ["meditation", {
        title: "Meditations",
        description: "Opinions, Ideas, and Philosophical Intrigues.",
        banner: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1280px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg",
        src: "https://en.wikipedia.org/wiki/The_School_of_Athens"
    }],
    ["media", {
        title: "Media",
        description: "Books, Films, TV Shows, and Songs",
        banner: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwesternnews.media.clients.ellingtoncms.com%2Fimg%2Fphotos%2F2021%2F11%2F24%2FGreat_Voices_John2.jpg&f=1&nofb=1&ipt=79d349d30d914e7597df824167dbc824b2b82c958859d721688dfb5804dd211f",
        src: "https://en.wikipedia.org/wiki/John_Denver"
    }],
    ["cerebrum", {
        title: "Notes from the Cerebrum",
        description: "Disciplines, Meta-disciplines, and nerdy topics.",
        banner: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Leonardo_da_Vinci_-_RCIN_912669%2C_Recto_Studies_of_geometry%2C_profiles%2C_etc.jpg/1280px-Leonardo_da_Vinci_-_RCIN_912669%2C_Recto_Studies_of_geometry%2C_profiles%2C_etc.jpg",
        src: "https://commons.wikimedia.org/wiki/Leonardo_da_Vinci_catalogue_raisonn%C3%A9,_1968_Clark#/media/File:Leonardo_da_Vinci_-_RCIN_912669,_Recto_Studies_of_geometry,_profiles,_etc.jpg"
    }],
    ["art", {
        title: "Art",
        description: "My Artistic Attempts.",
        banner: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Leonardo_da_Vinci_-_Neptune%2C_c.1504-5.jpg/1920px-Leonardo_da_Vinci_-_Neptune%2C_c.1504-5.jpg",
        src: "https://commons.wikimedia.org/wiki/Leonardo_da_Vinci_catalogue_raisonn%C3%A9,_1968_Clark#/media/File:Leonardo_da_Vinci_-_Neptune,_c.1504-5.jpg"
    }],
    ["poetry", {
        title: "Poesy",
        description: "Poetry from the Romantic and the Shubham-ic tradition.",
        banner: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Leonardo_da_vinci_-_La_scapigliata.jpg/800px-Leonardo_da_vinci_-_La_scapigliata.jpg",
        src: "https://en.wikipedia.org/wiki/La_Scapigliata"
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
