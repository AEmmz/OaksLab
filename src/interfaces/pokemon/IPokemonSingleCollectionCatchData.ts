export default interface IPokemonSingleCollectionCatchData {
  normal: Normal;
  shiny: Shiny;
  tera: Tera;
}

interface Normal {
  caught: NormalItems,
  available: NormalItems
}

interface NormalItems {
  normal: boolean,
  alpha: boolean,
  pokerus: boolean,
  marked: boolean,
  zeroIv: boolean,
  sixIv: boolean
}

interface Shiny {
  caught: ShinyItems,
  available: ShinyItems
}

interface ShinyItems {
  shiny: boolean,
  shinyAlpha: boolean,
  shinyPokerus: boolean,
  shinyMarked: boolean,
  shinyZeroIv: boolean,
  shinySixIv: boolean
}

interface Tera {
  caught: TeraItems,
  available: TeraItems
}

interface TeraItems {
  teraBug: boolean,
  teraDark: boolean,
  teraDragon: boolean,
  teraElectric: boolean,
  teraFairy: boolean,
  teraFighting: boolean,
  teraFire: boolean,
  teraFlying: boolean,
  teraGhost: boolean,
  teraGrass: boolean,
  teraGround: boolean,
  teraIce: boolean,
  teraNormal: boolean,
  teraPoison: boolean,
  teraPsychic: boolean,
  teraRock: boolean,
  teraSteel: boolean,
  teraWater: boolean,
  teraShinyBug: boolean,
  teraShinyDark: boolean,
  teraShinyDragon: boolean,
  teraShinyElectric: boolean,
  teraShinyFairy: boolean,
  teraShinyFighting: boolean,
  teraShinyFire: boolean,
  teraShinyFlying: boolean,
  teraShinyGhost: boolean,
  teraShinyGrass: boolean,
  teraShinyGround: boolean,
  teraShinyIce: boolean,
  teraShinyNormal: boolean,
  teraShinyPoison: boolean,
  teraShinyPsychic: boolean,
  teraShinyRock: boolean,
  teraShinySteel: boolean,
  teraShinyWater: boolean
}