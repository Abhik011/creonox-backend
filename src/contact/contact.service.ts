import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateContactDto } from "./dto/create-contact.dto";

@Injectable()
export class ContactService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateContactDto,
  ) {
    return this.prisma.contactLead.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.contactLead.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async updateStatus(
    id: string,
    status: string,
  ) {
    return this.prisma.contactLead.update({
      where: { id },
      data: { status },
    });
  }

  async stats() {
    const total =
      await this.prisma.contactLead.count();

    const newLeads =
      await this.prisma.contactLead.count({
        where: {
          status: "new",
        },
      });

    return {
      total,
      newLeads,
    };
  }
}