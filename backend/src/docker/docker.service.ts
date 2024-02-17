import { Injectable } from '@nestjs/common';
import * as Docker from 'dockerode';

@Injectable()
export class DockerService {
  private docker: Docker;

  constructor() {
    this.docker = new Docker({ socketPath: '/var/run/docker.sock' });
  }

  async findContainerById(id: string): Promise<Docker.ContainerInspectInfo> {
    const container = this.docker.getContainer(id);
    console.log(await container.inspect());
    return await container.inspect();
  }

  async getAllContainers() {
    return await this.docker.listContainers({ all: true });
  }

  async getStats(id: string) {
    const container = this.docker.getContainer(id);
    const inspectionInfo = await container.inspect();
    const cpuLimit = inspectionInfo.HostConfig.CpuPeriod;
    const memoryLimit = inspectionInfo.HostConfig.Memory;
    const stats = await new Promise<any>((resolve, reject) => {
      container.stats({stream: false}, (err, stats) => {
        if (err) {
          return reject(err);
        }
        const cpuUsage = stats.cpu_stats.cpu_usage.total_usage;
        const memoryUsage = stats.memory_stats && stats.memory_stats.usage ? stats.memory_stats.usage : 'N/A';
        const networks = stats.networks || 'N/A';
        resolve({cpuUsage, cpuLimit, memoryUsage, memoryLimit, networks});
      });
    });
    return stats;
  }
}

