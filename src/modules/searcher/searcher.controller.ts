import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearcherService } from './searcher.service';

@Controller('searcher')
export class SearcherController {

    constructor(private readonly searcherService: SearcherService) { }

    @Get("/")
    findAll(@Query('filters') criteria: string, @Query('excludes') excludes: string): Promise<any> {
        return this.searcherService.show(criteria, excludes);
    }

}