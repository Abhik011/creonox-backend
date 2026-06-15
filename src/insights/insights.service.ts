import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import slugify from "slugify";
import { CreateInsightDto } from "./dto/create-insight.dto";

@Injectable()
export class InsightsService {
constructor(
private readonly prisma: PrismaService,
) {}

async create(dto: CreateInsightDto) {
  const slug = slugify(dto.title, {
    lower: true,
    strict: true,
  });

  return this.prisma.insight.create({
    data: {
      title: dto.title,
      slug,
      excerpt: dto.excerpt,
      content: dto.content,

      coverImage: dto.coverImage,

      seoTitle: dto.seoTitle,
      seoDescription: dto.seoDescription,
      seoKeywords: dto.seoKeywords,

      llmSummary: dto.llmSummary,

      featured: dto.featured ?? false,

      categoryId: dto.categoryId,

      status: "draft",
    },

    include: {
      category: true,
      author: true,
    },
  });
}

async findBySlug(slug: string) {
  return this.prisma.insight.findUnique({
    where: { slug },
    include: {
      category: true,
      author: true,
    },
  });
}

async publish(id: string) {
  return this.prisma.insight.update({
    where: { id },
    data: {
      status: "published",
      publishedAt: new Date(),
    },
  });
}

async update(
  id: string,
  dto: CreateInsightDto,
) {
  return this.prisma.insight.update({
    where: { id },
    data: {
      ...dto,
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
where: {
id,
},
});
}

async delete(id: string) {
return this.prisma.insight.delete({
where: {
id,
},
});
}
}
