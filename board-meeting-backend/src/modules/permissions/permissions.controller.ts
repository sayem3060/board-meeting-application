import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dtos/create-permission.dto';

@Controller('permissions')
export class PermissionsController {
    constructor(private readonly permissionsService: PermissionsService) {} 

    @Post()
    create(@Body() createPermissionDto: CreatePermissionDto) {
        return this.permissionsService.create(createPermissionDto);
    }   

    @Get()
    findAll() {
        return this.permissionsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.permissionsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePermissionDto: Partial<CreatePermissionDto>) {
        return this.permissionsService.update(id, updatePermissionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.permissionsService.remove(id);
    }

    @Get('by-names/:names')
    findByNames(@Param('names') names: string) {
        const namesArray = names.split(',');
        return this.permissionsService.findByNames(namesArray);
    }

}