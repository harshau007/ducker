import { Module } from '@nestjs/common';
import { DockerService } from './docker.service';
import { DockerController } from './docker.controller';
import { LogsGateway } from './logs.websocket';

@Module({
  controllers: [DockerController],
  providers: [DockerService, LogsGateway],
})
export class DockerModule {}
