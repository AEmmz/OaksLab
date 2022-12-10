import { StatisticsGenerationType } from "src/util/types/StatisticsCountType";

export default interface IStatisticsGeneration {
  caught: {
    gen1: StatisticsGenerationType
    gen2: StatisticsGenerationType,
    gen3: StatisticsGenerationType,
    gen4: StatisticsGenerationType,
    gen5: StatisticsGenerationType,
    gen6: StatisticsGenerationType,
    gen7: StatisticsGenerationType,
    gen8: StatisticsGenerationType,
    gen9: StatisticsGenerationType
  },
  available: {
    gen1: StatisticsGenerationType,
    gen2: StatisticsGenerationType,
    gen3: StatisticsGenerationType,
    gen4: StatisticsGenerationType,
    gen5: StatisticsGenerationType,
    gen6: StatisticsGenerationType,
    gen7: StatisticsGenerationType,
    gen8: StatisticsGenerationType,
    gen9: StatisticsGenerationType
  }
}