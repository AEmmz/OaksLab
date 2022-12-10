import StatisticsGenerationCountsModel from "src/models/statistics/StatisticsGenerationCountsModel";
import { PokemonGenerationsType } from "src/util/types/PokemonGenerationsType";

export default class StatisticsGenerationModel {
  caught = {
    gen1: new StatisticsGenerationCountsModel(),
    gen2: new StatisticsGenerationCountsModel(),
    gen3: new StatisticsGenerationCountsModel(),
    gen4: new StatisticsGenerationCountsModel(),
    gen5: new StatisticsGenerationCountsModel(),
    gen6: new StatisticsGenerationCountsModel(),
    gen7: new StatisticsGenerationCountsModel(),
    gen8: new StatisticsGenerationCountsModel(),
    gen9: new StatisticsGenerationCountsModel()
  };
  available = {
    gen1: new StatisticsGenerationCountsModel(),
    gen2: new StatisticsGenerationCountsModel(),
    gen3: new StatisticsGenerationCountsModel(),
    gen4: new StatisticsGenerationCountsModel(),
    gen5: new StatisticsGenerationCountsModel(),
    gen6: new StatisticsGenerationCountsModel(),
    gen7: new StatisticsGenerationCountsModel(),
    gen8: new StatisticsGenerationCountsModel(),
    gen9: new StatisticsGenerationCountsModel()
  };

  getGenerationCounts(generation: PokemonGenerationsType, tabId: keyof StatisticsGenerationCountsModel) {
    return {
      total: this.caught[generation][tabId],
      available: this.available[generation][tabId],
      percent: Number(((this.caught[generation][tabId] / this.available[generation][tabId]) * 100).toFixed(2))
    };
  }
}