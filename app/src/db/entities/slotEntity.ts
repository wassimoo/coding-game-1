import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";
import { SalesManagerEntity } from "./salesManagerEntity";

@Entity("slots")
export class SlotEntity {
  @PrimaryColumn()
  id: number;

  @Column({ name: "start_date", type: "timestamptz" })
  startDate: Date;

  @Column({ name: "end_date", type: "timestamptz" })
  endDate: Date;

  @Column()
  booked: boolean;

  @ManyToOne(() => SalesManagerEntity)
  @JoinColumn({ name: "sales_manager_id" })
  salesManager: SalesManagerEntity;
}