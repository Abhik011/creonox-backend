import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import slugify from "slugify";
import { CreateInsightDto } from "./create-insight.dto";

@Injectable()
export class InsightsService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    dto: CreateInsightDto,
  ) {
    const slug = slugify(dto.title, {
      lower: true,
      strict: true,
    });

    return this.prisma.insight.create({
      data: {
        ...dto,
        slug,
      },
    });
  }

  async findAll() {
    return this.prisma.insight.findMany({
      include: {
        category: true,
        author: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.insight.findUnique({
      where: { id },
    });
  }

  async delete(id: string) {
    return this.prisma.insight.delete({
      where: { id },
    });
  }
}