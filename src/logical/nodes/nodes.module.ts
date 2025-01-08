import { Module } from '@nestjs/common';
// import { NodesEntity } from '../../src/entity/nodes.entity';
import { NodesEntity } from '../../entity/nodes.entity'
import { NodesService } from './nodes.service';
import { NodesController } from './nodes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NodesEntity])],
  providers: [NodesService],
  controllers: [NodesController],
  exports: [TypeOrmModule],
})
export class NodesModule {}
