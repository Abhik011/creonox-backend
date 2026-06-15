import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Post,
} from "@nestjs/common";

import { ContactService } from "./contact.service";
import { CreateContactDto } from "./dto/create-contact.dto";

@Controller("contact")
export class ContactController {
  constructor(
    private readonly contactService: ContactService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateContactDto,
  ) {
    return this.contactService.create(
      dto,
    );
  }

  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @Get("stats")
  stats() {
    return this.contactService.stats();
  }

  @Patch(":id/:status")
  updateStatus(
    @Param("id") id: string,
    @Param("status") status: string,
  ) {
    return this.contactService.updateStatus(
      id,
      status,
    );
  }
}