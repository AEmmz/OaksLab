export class StatisticsMiscDexModel {
  gmax = new StatisticsMiscDexTypes();
  mega = new StatisticsMiscDexTypes();
}

export class StatisticsMiscDexTypes {
  normal = new StatisticsMiscDexTypeStats("Normal");
  shiny = new StatisticsMiscDexTypeStats("Shiny");
  marked = new StatisticsMiscDexTypeStats("Marked");
  shinyMarked = new StatisticsMiscDexTypeStats("Shiny Marked");
  pokerus = new StatisticsMiscDexTypeStats("Pokerus");
  shinyPokerus = new StatisticsMiscDexTypeStats("Shiny Pokerus");
  sixIv = new StatisticsMiscDexTypeStats("Six IV");
  shinySixIv = new StatisticsMiscDexTypeStats("Shiny Six IV");
  zeroIv = new StatisticsMiscDexTypeStats("Zero IV");
  shinyZeroIv = new StatisticsMiscDexTypeStats("Shiny Zero IV");
}

class StatisticsMiscDexTypeStats {
  type: string;
  total = 0;
  available = 0;

  constructor(type: string) {
    this.type = type;
  }
}

