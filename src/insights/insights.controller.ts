import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch
} from "@nestjs/common";

import { InsightsService } from "./insights.service";
import { CreateInsightDto } from "./dto/create-insight.dto";

@Controller("insights")
export class InsightsController {
  constructor(
    private readonly insightsService: InsightsService,
  ) { }

  @Post()
  create(
    @Body() dto: CreateInsightDto,
  ) {
    return this.insightsService.create(
      dto,
    );
  }

  @Get()
  findAll() {
    return this.insightsService.findAll();
  }
  @Get("slug/:slug")
  findBySlug(
    @Param("slug") slug: string,
  ) {
    return this.insightsService.findBySlug(slug);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() dto: CreateInsightDto,
  ) {
    return this.insightsService.update(id, dto);
  }

  @Patch(":id/publish")
  publish(
    @Param("id") id: string,
  ) {
    return this.insightsService.publish(id);
  }

  @Get(":id")
  findOne(
    @Param("id") id: string,
  ) {
    return this.insightsService.findOne(
      id,
    );
  }

  @Delete(":id")
  remove(
    @Param("id") id: string,
  ) {
    return this.insightsService.delete(
      id,
    );
  }
}