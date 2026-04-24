# Payment Funnel Analytics

## Overview

The Payment Funnel Analytics feature tracks the conversion rates of payments through different stages from creation to settlement, helping identify drop-off points in the payment flow.

## API Endpoint

### GET /api/v1/admin/analytics/funnel

Retrieves payment funnel analytics with conversion rates and drop-off statistics.

#### Query Parameters

- `startDate` (optional): Start date for the analysis period (YYYY-MM-DD format)
- `endDate` (optional): End date for the analysis period (YYYY-MM-DD format)  
- `network` (optional): Filter by payment network (`stellar`)

If no date range is provided, defaults to the last 30 days.

#### Example Request

```bash
GET /api/v1/admin/analytics/funnel?startDate=2026-04-01&endDate=2026-04-30&network=stellar
```

#### Response Format

```json
{
  "generatedAt": "2026-04-24T10:00:00.000Z",
  "dateRange": {
    "startDate": "2026-04-01",
    "endDate": "2026-04-30"
  },
  "network": "stellar",
  "totalCreated": 1000,
  "stages": [
    {
      "stage": "created",
      "count": 1000,
      "percentage": 100
    },
    {
      "stage": "confirmed", 
      "count": 850,
      "percentage": 85,
      "dropOffCount": 150,
      "dropOffPercentage": 15
    },
    {
      "stage": "settling",
      "count": 800,
      "percentage": 80,
      "dropOffCount": 50,
      "dropOffPercentage": 5.88
    },
    {
      "stage": "settled",
      "count": 750,
      "percentage": 75,
      "dropOffCount": 50,
      "dropOffPercentage": 6.25
    }
  ],
  "summary": {
    "overallConversionRate": 75,
    "settledCount": 750,
    "expiredCount": 25,
    "failedCount": 15
  }
}
```

## Funnel Stages

1. **Created**: All payments created in the specified period
2. **Confirmed**: Payments that moved from pending to confirmed status
3. **Settling**: Payments that entered the settling process
4. **Settled**: Payments that completed successfully

## Metrics Explained

- **Count**: Number of payments at each stage
- **Percentage**: Percentage of total created payments that reached this stage
- **Drop-off Count**: Number of payments lost between this stage and the previous
- **Drop-off Percentage**: Percentage of payments from the previous stage that didn't progress
- **Overall Conversion Rate**: Percentage of created payments that reached settled status
- **Expired/Failed Counts**: Payments that ended in expired or failed states (tracked separately)

## Use Cases

- Identify bottlenecks in the payment flow
- Monitor conversion rate improvements over time
- Compare performance across different time periods
- Analyze network-specific performance
- Track the impact of system changes on conversion rates