module.exports = Object.freeze ({
    TYPES : ["dog", "cat", "rabbit", "small_furry", "horse", "bird", "scales_fins_other", "barnyard"],
    GENDERS : ["male", "female", "unknown"],
    SIZE : ["small", "medium", "large", "xlarge"],
    AGE : ["baby", "young", "adult", "senior"],
    COAT : ["short", "medium", "long", "wire", "hairless", "curly"],
    STATUS : ["adoptable", "adopted", "found"],

    DOG :  {
    "name":"Dog",
    "coats":[
        "Hairless",
        "Short",
        "Medium",
        "Long",
        "Wire",
        "Curly"
    ],
    "colors":[
        "Apricot / Beige",
        "Bicolor",
        "Black",
        "Brindle",
        "Brown / Chocolate",
        "Golden",
        "Gray / Blue / Silver",
        "Harlequin",
        "Merle (Blue)",
        "Merle (Red)",
        "Red / Chestnut / Orange",
        "Sable",
        "Tricolor (Brown, Black, & White)",
        "White / Cream",
        "Yellow / Tan / Blond / Fawn"
    ],
    "genders":[
        "Male",
        "Female"
    ],
    "_links":{
        "self":{
            "href":"/v2/types/dog"
        },
        "breeds":{
            "href":"/v2/types/dog/breeds"
        }
    }
    },
    CAT : {
    "name":"Cat",
    "coats":[
        "Hairless",
        "Short",
        "Medium",
        "Long"
    ],
    "colors":[
        "Black",
        "Black & White / Tuxedo",
        "Blue Cream",
        "Blue Point",
        "Brown / Chocolate",
        "Buff & White",
        "Buff / Tan / Fawn",
        "Calico",
        "Chocolate Point",
        "Cream / Ivory",
        "Cream Point",
        "Dilute Calico",
        "Dilute Tortoiseshell",
        "Flame Point",
        "Gray & White",
        "Gray / Blue / Silver",
        "Lilac Point",
        "Orange & White",
        "Orange / Red",
        "Seal Point",
        "Smoke",
        "Tabby (Brown / Chocolate)",
        "Tabby (Buff / Tan / Fawn)",
        "Tabby (Gray / Blue / Silver)",
        "Tabby (Leopard / Spotted)",
        "Tabby (Orange / Red)",
        "Tabby (Tiger Striped)",
        "Torbie",
        "Tortoiseshell",
        "White"
    ],
    "genders":[
        "Male",
        "Female"
    ],
    "breeds":[
        {"name":"Abyssinian","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"American Bobtail","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"American Curl","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"American Shorthair","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"American Wirehair","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Applehead Siamese","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Balinese","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Bengal","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Birman","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Bombay","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"British Shorthair","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Burmese","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Burmilla","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Calico","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Canadian Hairless","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Chartreux","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Chausie","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Chinchilla","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Cornish Rex","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Cymric","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Devon Rex","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Dilute Calico","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Dilute Tortoiseshell","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Domestic Long Hair","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Domestic Medium Hair","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Domestic Short Hair","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Egyptian Mau","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Exotic Shorthair","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Extra-Toes Cat / Hemingway Polydactyl","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Havana","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Himalayan","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Japanese Bobtail","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Javanese","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Korat","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"LaPerm","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Maine Coon","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Manx","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Munchkin","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Nebelung","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Norwegian Forest Cat","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Ocicat","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Oriental Long Hair","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Oriental Short Hair","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Oriental Tabby","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Persian","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Pixiebob","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Ragamuffin","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Ragdoll","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Russian Blue","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Scottish Fold","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Selkirk Rex","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Siamese","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Siberian","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Silver","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Singapura","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Snowshoe","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Somali","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Sphynx / Hairless Cat","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Tabby","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Tiger","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Tonkinese","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Torbie","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Tortoiseshell","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Toyger","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Turkish Angora","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Turkish Van","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"Tuxedo","_links":{"type":{"href":"/v2/types/cat"}}},
        {"name":"York Chocolate","_links":{"type":{"href":"/v2/types/cat"}}}
    ],
    "_links":{
        "self":{
            "href":"/v2/types/cat"
        },
        "breeds":{
            "href":"/v2/types/cat/breeds"
        }
    }
    },
    RABBIT : {
    "name":"Rabbit",
    "coats":[
        "Short",
        "Long"
    ],
    "colors":[
        "Agouti",
        "Black",
        "Blue / Gray",
        "Brown / Chocolate",
        "Cream",
        "Lilac",
        "Orange / Red",
        "Sable",
        "Silver Marten",
        "Tan",
        "Tortoiseshell",
        "White"
    ],
    "genders":[
        "Male",
        "Female"
    ],
    "_links":{
        "self":{
            "href":"/v2/types/rabbit"
        },
        "breeds":{
            "href":"/v2/types/rabbit/breeds"
        }
    }
    },
    SMALL_FURRY : {
    "name":"Small & Furry",
    "coats":[
        "Hairless",
        "Short",
        "Long"
    ],
    "colors":[
        "Agouti",
        "Albino",
        "Black",
        "Black Sable",
        "Blue / Gray",
        "Brown / Chocolate",
        "Calico",
        "Champagne",
        "Cinnamon",
        "Cream",
        "Orange / Red",
        "Sable",
        "Tan",
        "Tortoiseshell",
        "White",
        "White (Dark-Eyed)"
    ],
    "genders":[
        "Male",
        "Female"
    ],
    "_links":{
        "self":{
            "href":"/v2/types/small-furry"
        },
        "breeds":{
            "href":"/v2/types/small-furry/breeds"
        }
    }
    },
    HORSE : {
    "name":"Horse",
    "coats":[

    ],
    "colors":[
        "Appaloosa",
        "Bay",
        "Bay Roan",
        "Black",
        "Blue Roan",
        "Brown",
        "Buckskin",
        "Champagne",
        "Chestnut / Sorrel",
        "Cremello",
        "Dapple Gray",
        "Dun",
        "Gray",
        "Grullo",
        "Liver",
        "Paint",
        "Palomino",
        "Perlino",
        "Piebald",
        "Pinto",
        "Red Roan",
        "Silver Bay",
        "Silver Buckskin",
        "Silver Dapple",
        "White"
    ],
    "genders":[
        "Male",
        "Female"
    ],
    "_links":{
        "self":{
            "href":"/v2/types/horse"
        },
        "breeds":{
            "href":"/v2/types/horse/breeds"
        }
    }
    },
    BIRD : {
    "name":"Bird",
    "coats":[
    ],
    "colors":[
        "Black",
        "Blue",
        "Brown",
        "Buff",
        "Gray",
        "Green",
        "Olive",
        "Orange",
        "Pink",
        "Purple / Violet",
        "Red",
        "Rust / Rufous",
        "Tan",
        "White",
        "Yellow"
    ],
    "genders":[
        "Male",
        "Female",
        "Unknown"
    ],
    "_links":{
        "self":{
            "href":"/v2/types/bird"
        },
        "breeds":{
            "href":"/v2/types/bird/breeds"
        }
    }
    },
    SCALES_FINS_OTHER : {
    "name":"Scales, Fins & Other",
    "coats":[

    ],
    "colors":[
        "Black",
        "Blue",
        "Brown",
        "Gray",
        "Green",
        "Iridescent",
        "Orange",
        "Purple",
        "Red",
        "Tan",
        "White",
        "Yellow"
    ],
    "genders":[
        "Male",
        "Female",
        "Unknown"
    ],
    "_links":{
        "self":{
            "href":"/v2/types/scales-fins-other"
        },
        "breeds":{
            "href":"/v2/types/scales-fins-other/breeds"
        }
    }
    },
    BARNYARD : {
    "name":"Barnyard",
    "coats":[
        "Short",
        "Long"
    ],
    "colors":[
        "Agouti",
        "Black",
        "Black & White",
        "Brindle",
        "Brown",
        "Gray",
        "Pink",
        "Red",
        "Roan",
        "Spotted",
        "Tan",
        "White"
    ],
    "genders":[
        "Male",
        "Female"
    ],
    "_links":{
        "self":{
            "href":"/v2/types/barnyard"
        },
        "breeds":{
            "href":"/v2/types/barnyard/breeds"
        }
    }
}

});