import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("sales_managers")
export class SalesManagerEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column("varchar", { array: true })
  languages: string[];

  @Column("varchar", { array: true })
  products: string[];

  @Column("varchar", { array: true, name: "customer_ratings" })
  customerRatings: string[];
}
