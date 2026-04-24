import { Module } from '@nestjs/common';
import { MerchantAnalyticsController } from './merchant-analytics.controller';
import { MerchantAnalyticsService } from './merchant-analytics.service';
import { PaymentFunnelService } from './payment-funnel.service';

@Module({
  controllers: [MerchantAnalyticsController],
  providers: [MerchantAnalyticsService, PaymentFunnelService],
})
export class MerchantAnalyticsModule {}
