import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DockerService } from './docker.service';
import { LogsGateway } from './logs.websocket';

@Controller('docker')
export class DockerController {
  constructor(
    private readonly dockerService: DockerService,
    private readonly logGateway: LogsGateway
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

  @Post('logs/:id')
  startSendingLogs(@Param('id') containerId: string) {
    this.logGateway.sendLogs(containerId);
    return { message: 'Started sending logs for container ' + containerId };
  }
}
