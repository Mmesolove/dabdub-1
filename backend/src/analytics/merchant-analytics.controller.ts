import { Controller, Get, Query } from '@nestjs/common';
import {
  MerchantAnalyticsService,
  type MerchantAnalyticsResponse,
} from './merchant-analytics.service';
import {
  PaymentFunnelService,
  type PaymentFunnelResponse,
} from './payment-funnel.service';
import { FunnelQueryDto } from './dto/funnel-query.dto';

@Controller('admin/analytics')
export class MerchantAnalyticsController {
  constructor(
    private readonly merchantAnalyticsService: MerchantAnalyticsService,
    private readonly paymentFunnelService: PaymentFunnelService,
  ) {}

  @Get('merchants')
  getMerchantAnalytics(): Promise<MerchantAnalyticsResponse> {
    return this.merchantAnalyticsService.getMetrics();
  }

  @Get('funnel')
  getPaymentFunnel(@Query() query: FunnelQueryDto): Promise<PaymentFunnelResponse> {
    return this.paymentFunnelService.getFunnelAnalytics(query);
  }
}
