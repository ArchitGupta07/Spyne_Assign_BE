import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import cloudinaryConfig from './cloudinary.config';
import { CloudinaryService } from './cloudinary.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [cloudinaryConfig], // Load the Cloudinary configuration
    }),
  ],
  providers: [CloudinaryService],
  exports: [CloudinaryService], // Export CloudinaryService so it can be used elsewhere
})
export class CloudinaryModule {}
