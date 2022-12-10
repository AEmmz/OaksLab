const huntTypeFilters = [
  { label: "Normal", value: "normal" },
  { label: "Shiny", value: "shiny" },
  { label: "Alpha", value: "alpha" },
  { label: "Shiny Alpha", value: "shinyAlpha" },
  { label: "Pokerus", value: "pokerus" },
  { label: "Shiny Pokerus", value: "shinyPokerus" },
  { label: "Marked", value: "marked" },
  { label: "Shiny Marked", value: "shinyMarked" },
  { label: "0 IV", value: "zeroIv" },
  { label: "Shiny 0 IV", value: "shinyZeroIv" },
  { label: "6 IV", value: "sixIv" },
  { label: "Shiny 6 IV", value: "shinySixIv" },
  { label: "Tera Bug", value: "teraBug" },
  { label: "Tera Dark", value: "teraDark" },
  { label: "Tera Dragon", value: "teraDragon" },
  { label: "Tera Electric", value: "teraElectric" },
  { label: "Tera Fairy", value: "teraFairy" },
  { label: "Tera Fighting", value: "teraFighting" },
  { label: "Tera Fire", value: "teraFire" },
  { label: "Tera Flying", value: "teraFlying" },
  { label: "Tera Grass", value: "teraGrass" },
  { label: "Tera Ghost", value: "teraGhost" },
  { label: "Tera Ground", value: "teraGround" },
  { label: "Tera Ice", value: "teraIce" },
  { label: "Tera Normal", value: "teraNormal" },
  { label: "Tera Poison", value: "teraPoison" },
  { label: "Tera Psychic", value: "teraPsychic" },
  { label: "Tera Steel", value: "teraSteel" },
  { label: "Tera Rock", value: "teraRock" },
  { label: "Tera Water", value: "teraWater" },
  { label: "Shiny Tera Bug", value: "teraShinyBug" },
  { label: "Shiny Tera Dark", value: "teraShinyDark" },
  { label: "Shiny Tera Dragon", value: "teraShinyDragon" },
  { label: "Shiny Tera Electric", value: "teraShinyElectric" },
  { label: "Shiny Tera Fairy", value: "teraShinyFairy" },
  { label: "Shiny Tera Fighting", value: "teraShinyFighting" },
  { label: "Shiny Tera Fire", value: "teraShinyFire" },
  { label: "Shiny Tera Flying", value: "teraShinyFlying" },
  { label: "Shiny Tera Grass", value: "teraShinyGrass" },
  { label: "Shiny Tera Ghost", value: "teraShinyGhost" },
  { label: "Shiny Tera Ground", value: "teraShinyGround" },
  { label: "Shiny Tera Ice", value: "teraShinyIce" },
  { label: "Shiny Tera Normal", value: "teraShinyNormal" },
  { label: "Shiny Tera Poison", value: "teraShinyPoison" },
  { label: "Shiny Tera Psychic", value: "teraShinyPsychic" },
  { label: "Shiny Tera Steel", value: "teraShinySteel" },
  { label: "Shiny Tera Rock", value: "teraShinyRock" },
  { label: "Shiny Tera Water", value: "teraShinyWater" }
];

const sortFilter = [
  { label: "Dex: Asc", value: "dexAsc" },
  { label: "Dex: Desc", value: "dexDesc" },
  { label: "Name: A-Z", value: "nameAz" },
  { label: "Name: Z-A", value: "nameZa" }
];

const caughtFilter = [
  { label: "Show All", value: "showAll" },
  { label: "My Caught", value: "myCaught" },
  { label: "Complete", value: "complete" },
  ...huntTypeFilters
];

const needFilter = [
  { label: "None", value: "none" },
  ...huntTypeFilters
];

const generationFilter = [
  { label: "All", value: "all" },
  { label: "Gen 1", value: "gen1" },
  { label: "Gen 2", value: "gen2" },
  { label: "Gen 3", value: "gen3" },
  { label: "Gen 4", value: "gen4" },
  { label: "Gen 5", value: "gen5" },
  { label: "Gen 6", value: "gen6" },
  { label: "Gen 7", value: "gen7" },
  { label: "Gen 8", value: "gen8" },
  { label: "Gen 9", value: "gen9" }
];

const typeFilter = [
  { label: "All", value: "all" },
  { label: "Bug", value: "bug" },
  { label: "Dark", value: "dark" },
  { label: "Dragon", value: "dragon" },
  { label: "Electric", value: "electric" },
  { label: "Fairy", value: "fairy" },
  { label: "Fighting", value: "fighting" },
  { label: "Fire", value: "fire" },
  { label: "Flying", value: "flying" },
  { label: "Grass", value: "grass" },
  { label: "Ghost", value: "ghost" },
  { label: "Ground", value: "ground" },
  { label: "Ice", value: "ice" },
  { label: "Normal", value: "normal" },
  { label: "Poison", value: "poison" },
  { label: "Psychic", value: "psychic" },
  { label: "Steel", value: "steel" },
  { label: "Rock", value: "rock" },
  { label: "Water", value: "water" }
];

const shinyViewOptions = [
  "All Normal",
  "All Shiny",
  "Shiny Caught"
];

export { sortFilter, caughtFilter, generationFilter, typeFilter, needFilter, shinyViewOptions };
