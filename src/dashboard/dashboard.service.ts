import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async stats() {
    const [
      totalInsights,
      publishedInsights,
      draftInsights,
      categories,
      media,
    ] = await Promise.all([
      this.prisma.insight.count(),

      this.prisma.insight.count({
        where: {
          status: "published",
        },
      }),

      this.prisma.insight.count({
        where: {
          status: "draft",
        },
      }),

      this.prisma.insightCategory.count(),

      this.prisma.media.count(),
    ]);

    return {
      totalInsights,
      publishedInsights,
      draftInsights,
      categories,
      media,
    };
  }
}