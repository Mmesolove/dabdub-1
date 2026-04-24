import { PaymentFunnelService } from './payment-funnel.service';
import { PaymentNetwork } from '../payments/entities/payment.entity';

describe('PaymentFunnelService', () => {
  it('calculates funnel metrics with proper percentages and drop-offs', async () => {
    const query = jest
      .fn()
      .mockResolvedValueOnce([
        { stage: 'created', count: '100' },
        { stage: 'confirmed', count: '80' },
        { stage: 'settling', count: '75' },
        { stage: 'settled', count: '70' },
      ])
      .mockResolvedValueOnce([{ expired_count: '5', failed_count: '3' }]);

    const service = new PaymentFunnelService({
      query,
    } as never);

    const result = await service.getFunnelAnalytics({
      startDate: '2026-04-01',
      endDate: '2026-04-30',
      network: PaymentNetwork.STELLAR,
    });

    expect(result.totalCreated).toBe(100);
    expect(result.network).toBe(PaymentNetwork.STELLAR);
    expect(result.dateRange).toEqual({
      startDate: '2026-04-01',
      endDate: '2026-04-30',
    });

    // Check funnel stages
    expect(result.stages).toHaveLength(4);
    
    // Created stage
    expect(result.stages[0]).toEqual({
      stage: 'created',
      count: 100,
      percentage: 100,
    });

    // Confirmed stage
    expect(result.stages[1]).toEqual({
      stage: 'confirmed',
      count: 80,
      percentage: 80,
      dropOffCount: 20,
      dropOffPercentage: 20,
    });

    // Settling stage
    expect(result.stages[2]).toEqual({
      stage: 'settling',
      count: 75,
      percentage: 75,
      dropOffCount: 5,
      dropOffPercentage: 6.25,
    });

    // Settled stage
    expect(result.stages[3]).toEqual({
      stage: 'settled',
      count: 70,
      percentage: 70,
      dropOffCount: 5,
      dropOffPercentage: 6.67,
    });

    // Check summary
    expect(result.summary).toEqual({
      overallConversionRate: 70,
      settledCount: 70,
      expiredCount: 5,
      failedCount: 3,
    });
  });

  it('handles empty results gracefully', async () => {
    const query = jest
      .fn()
      .mockResolvedValueOnce([
        { stage: 'created', count: '0' },
        { stage: 'confirmed', count: '0' },
        { stage: 'settling', count: '0' },
        { stage: 'settled', count: '0' },
      ])
      .mockResolvedValueOnce([{ expired_count: '0', failed_count: '0' }]);

    const service = new PaymentFunnelService({
      query,
    } as never);

    const result = await service.getFunnelAnalytics();

    expect(result.totalCreated).toBe(0);
    expect(result.summary.overallConversionRate).toBe(0);
    expect(result.stages[1].percentage).toBe(0);
  });
});