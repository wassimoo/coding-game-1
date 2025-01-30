import { EntityManager } from "typeorm";
import { SlotEntity } from "../entities/slotEntity";

export const getSlotRepository = (entityManager: EntityManager) => {
  return entityManager.getRepository(SlotEntity).extend({
    getAvailableSlotsForManagers: async function (
      date: string,
      managerIds: number[]
    ) {
      if (managerIds.length === 0) {
        return [];
      }

      return this.createQueryBuilder("slot")
        .innerJoinAndSelect("slot.salesManager", "salesManager")
        .where("DATE(slot.startDate) = :date", { date })
        .andWhere("salesManager.id IN (:...managerIds)", {
          managerIds,
        })
        .getMany();
    },
  });
};
