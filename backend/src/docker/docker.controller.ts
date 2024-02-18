import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DockerService } from './docker.service';

@Controller('docker')
export class DockerController {
  constructor(
    private readonly dockerService: DockerService
  ) {}

  @Get()
  async findAll() {
    return await this.dockerService.getAllContainers();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.dockerService.findContainerById(id);
  }

  @Get('stats/:id')
  async getStats(@Param('id') id: string) {
    var stats = await this.dockerService.getStats(id);
    console.log(stats);
    return stats;
  }

  @Get('logs/:id')
  startSendingLogs(@Param('id') containerId: string) {
    return this.dockerService.getLogs(containerId);
  }

  @Get('info/:id')
  async getInfo(@Param('id') id: string) {
    return await this.dockerService.getInfo(id);
  }
}
