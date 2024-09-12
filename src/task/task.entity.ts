import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  isCompleted: boolean;

  // Constructor is optional, but if you want to have one, use it like this
  constructor(title?: string, description?: string) {
    if (title) {
      this.title = title;
    }
    if (description) {
      this.description = description;
    }
  }
}
