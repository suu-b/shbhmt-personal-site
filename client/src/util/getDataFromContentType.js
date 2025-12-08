const content = new Map([
    ["meditation", {
        title: "Meditations",
        description: "Know Thyself",
        banner: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1280px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg",
        src: "https://en.wikipedia.org/wiki/The_School_of_Athens"
    }],
    ["cerebrum", {
        title: "Notes from the Cerebrum",
        description: "Medicine, law, business, engineering, these are all noble pursuits, and necessary to sustain life...",
        banner: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Leonardo_da_Vinci_-_RCIN_912669%2C_Recto_Studies_of_geometry%2C_profiles%2C_etc.jpg/1280px-Leonardo_da_Vinci_-_RCIN_912669%2C_Recto_Studies_of_geometry%2C_profiles%2C_etc.jpg",
        src: "https://commons.wikimedia.org/wiki/Leonardo_da_Vinci_catalogue_raisonn%C3%A9,_1968_Clark#/media/File:Leonardo_da_Vinci_-_RCIN_912669,_Recto_Studies_of_geometry,_profiles,_etc.jpg"
    }],
    ["humanities", {
        title: "I am Human",
        description: "...But poetry, beauty, romance, love, these are what we stay alive for.",
        banner: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Leonardo_da_vinci_-_La_scapigliata.jpg/800px-Leonardo_da_vinci_-_La_scapigliata.jpg",
        src: "https://en.wikipedia.org/wiki/La_Scapigliata"
    }],
    ["becoming", {
        title: "Becoming!",
        description: "Man is nothing else but what he purposes, he exists only in so far as he realizes himself, he is therefore nothing else but the sum of his actions, nothing else but what his life is.",
        banner: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Leonardo_da_vinci_-_La_scapigliata.jpg/800px-Leonardo_da_vinci_-_La_scapigliata.jpg",
        src: "https://en.wikipedia.org/wiki/La_Scapigliata"
    }]
]);

export function getDataFromContentType(contentType) {
    switch(contentType) {
        case "meditation":
            return content.get("meditation");
        case "cerebrum":
            return content.get("cerebrum");
        case "humanities":
            return content.get("humanities");
        case "becoming":
            return content.get("becoming");
        default:
            return null;
    }
}
