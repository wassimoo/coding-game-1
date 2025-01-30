import { getDbClient } from "../db/getDbClient";
import { getSalesManagerRepository } from "../db/repositories/getlSalesManagerRepository";
import { getSlotRepository } from "../db/repositories/getSlotRepository";
import { hasOverlappingSlot } from "../utils/hasOverlappingSlot";
import { groupAvailableSlots } from "../utils/groupAvailableSlots";
import logger from "../utils/logger";
import { GetSlotsCriteria } from "../types/getSlotsCriteria";

export const getAvailableSlots = async (criteria: GetSlotsCriteria) => {
  logger.debug("criteria @ getAvailableSlots", { criteria });
  const { date, products, language, rating } = criteria;

  // Init repos
  const entityManager = (await getDbClient()).manager;
  const slotRepository = getSlotRepository(entityManager);
  const salesManagerRepository = getSalesManagerRepository(entityManager);

  // Get sales managers matching criteria
  const matchingSalesManagerIds =
    await salesManagerRepository.getIdsByExpertiseAndRating(
      language,
      products,
      rating
    );

  // Get managers available slots
  const slots = await slotRepository.getAvailableSlotsForManagers(
    date,
    matchingSalesManagerIds
  );

  const availableSlots = slots.filter(
    (slot) => !hasOverlappingSlot(slots, slot)
  );

  const groupedSlots = groupAvailableSlots(availableSlots);
  logger.debug("groupedSlots @ getAvailableSlots", { groupedSlots });

  return groupedSlots;
};
