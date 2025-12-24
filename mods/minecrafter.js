// --- Minecraft Style Engineering Mod ---

// 1. Define custom behaviors
// This creates a "Redstone" style signal that spreads through conductors
behaviors.WIRE = [
    "XX|XX|XX",
    "XX|CH:redstone_signal|XX",
    "XX|XX|XX"
];
elements.endstone = {
    color: ["#e5edc2", "#bec797"],
    behavior: behaviors.WALL,
    category: "minecraft",
    state: "solid",
    stateHigh: "molten_endstone",
    tempHigh: 1265
};
// 2. Add the Elements
elements.planks = {
    color: "#a67b5b",
    behavior: behaviors.WALL,
    category: "engineering",
    tempHigh: 400,
    stateHigh: "fire",
    burn: 20,
    burnTime: 50,
};

elements.redstone_dust = {
    color: "#ff0000",
    behavior: behaviors.POWDER,
    category: "engineering",
    conduct: 1, // Allows electricity to pass
    onMix: function(pixel, other) {
        // Example: If it touches 'torch', it might light up
        if (other.element === "torch") {
            pixel.color = "#ff6666";
        }
    }
};

elements.tnt_block = {
    color: "#cc3333",
    behavior: behaviors.WALL,
    category: "engineering",
    onCompute: function(pixel) {
        // Explode if it gets too hot or touched by fire/sparks
        if (pixel.temp > 100) {
            explode(pixel.x, pixel.y, 15);
        }
    },
    reactions: {
        "fire": { elem1: "explosion", elem2: "explosion" },
        "flash": { elem1: "explosion", elem2: "explosion" }
    }
};

elements.crafter = {
    color: "#4a4a4a",
    behavior: behaviors.WALL,
    category: "engineering",
    desc: "Converts Wood Planks into Charcoal when heated.",
    reactions: {
        "planks": { 
            elem1: "crafter", 
            elem2: "charcoal", 
            tempMin: 100 
        },
    }
};

// 3. Add a custom category to the menu
if (!runAfterAutoload) {
    enabledMods.push("Minecraft Engineering");
}
