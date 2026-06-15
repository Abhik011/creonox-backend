import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from "@nestjs/common";

import { NewsletterService } from "./newsletter.service";
import { CreateSubscriberDto } from "./dto/create-subscriber.dto";

@Controller("newsletter")
export class NewsletterController {
  constructor(
    private readonly newsletterService: NewsletterService,
  ) {}

  @Post("subscribe")
  subscribe(
    @Body() dto: CreateSubscriberDto,
  ) {
    return this.newsletterService.subscribe(
      dto.email,
    );
  }

  @Get()
  findAll() {
    return this.newsletterService.findAll();
  }

  @Get("stats")
  stats() {
    return this.newsletterService.stats();
  }

  @Delete(":id")
  remove(
    @Param("id") id: string,
  ) {
    return this.newsletterService.delete(id);
  }
}