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
    return await container.inspect();
  }

  async getAllContainers() {
    return await this.docker.listContainers({ all: false });
  }

  async getStats(id: string) {
    const container = this.docker.getContainer(id);
    const stats = await new Promise<any>((resolve, reject) => {
      container.stats({ stream: false }, (err, stats) => {
        if (err) {
          return reject(err);
        }
        const cpuUsage = stats.cpu_stats.cpu_usage.total_usage;
        const memoryUsage = stats.memory_stats && stats.memory_stats.usage ? stats.memory_stats.usage : 'N/A';
        const networks = stats.networks || 'N/A';
        resolve({ cpuUsage, memoryUsage, networks });
      });
    });
    return stats;
  }

  async getInfo(id: string) {
    const container = this.docker.getContainer(id);
    const inspectionInfo = await container.inspect();
    return inspectionInfo;
  }

  async getLogs(id: string): Promise<string[]> {
    const container = this.docker.getContainer(id);
    const regex = /\u001b\[[0-9;]*m/g;
    const logs = await container.logs({ stdout: true, stderr: true });
    const logString = logs.toString();
    return logString.split('\n').map(line => line.replace(regex, ''));
  }
}


