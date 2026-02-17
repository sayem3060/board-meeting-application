import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { CommonModule } from './common/common.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { CommitteesModule } from './modules/committees/committees.module';
import { RolePermissionsModule } from './modules/role-permissions/role-permissions.module';
import { UserRolesModule } from './modules/user-roles/user-roles.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => databaseConfig(),
    }),

    CommonModule,
    UsersModule, 
    RolesModule,
    PermissionsModule,
    CommitteesModule,
    RolePermissionsModule,
    UserRolesModule,
    AuthModule,
    

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}