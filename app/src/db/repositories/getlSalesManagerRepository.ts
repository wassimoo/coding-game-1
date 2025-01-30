import { EntityManager } from "typeorm";
import { SalesManagerEntity } from "../entities/salesManagerEntity";

export const getSalesManagerRepository = (entityManager: EntityManager) => {
  return entityManager.getRepository(SalesManagerEntity).extend({
    getIdsByExpertiseAndRating: async function (
      language: string,
      products: string[],
      rating: string
    ): Promise<number[]> {
      const results = await this.createQueryBuilder("salesManager")
        .select("salesManager.id")
        .where("salesManager.languages @> ARRAY[:language]::varchar[]", {
          language,
        })
        .andWhere("salesManager.products @> :products::varchar[]", {
          products,
        })
        .andWhere("salesManager.customerRatings @> ARRAY[:rating]::varchar[]", {
          rating,
        })
        .getMany();

      return results.map((result) => result.id);
    },
  });
};
