import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class NewsletterService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async subscribe(email: string) {
    return this.prisma.newsletterSubscriber.upsert({
      where: {
        email,
      },

      update: {},

      create: {
        email,
      },
    });
  }

  async findAll() {
    return this.prisma.newsletterSubscriber.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async delete(id: string) {
    return this.prisma.newsletterSubscriber.delete({
      where: {
        id,
      },
    });
  }

  async stats() {
    const total =
      await this.prisma.newsletterSubscriber.count();

    return {
      totalSubscribers: total,
    };
  }
}