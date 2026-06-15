import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import slugify from "slugify";

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService,
  ) {}

  create(name: string) {
    return this.prisma.insightCategory.create({
      data: {
        name,
        slug: slugify(name, {
          lower: true,
          strict: true,
        }),
      },
    });
  }

  findAll() {
    return this.prisma.insightCategory.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }
}