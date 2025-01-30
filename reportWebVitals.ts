/* eslint-disable no-console */
/* eslint-disable func-style */

'use client';

import { useReportWebVitals } from 'next/web-vitals';

type PerformanceMetric = {
  metricName: string;
  metricValue: number;
  metricUnit?: string;
};

type PerformanceTrackerProps = {
  enableLogs?: boolean; // Toggle to enable/disable logs
  onMetricCapture?: (details: Record<string, unknown>) => void; // Callback to capture metrics externally
  performanceLimits?: Partial<Record<string, number>>; // Custom performance thresholds
  trackSpecificMetrics?: string[]; // Metrics to focus on
};

// Define unit for each metric
function determineUnit(name: string) {
  switch (name) {
    case 'CLS':
      return 'Score';
    case 'LCP':
    case 'FID':
    case 'FCP':
    case 'TTFB':
      return 'Milliseconds';
    default:
      return 'Value';
  }
}

// Description mapping for metrics
function provideMetricDescription(name: string) {
  const descriptions: Record<string, string> = {
    CLS: 'Measures layout stability (Cumulative Layout Shift)',
    LCP: 'Measures loading speed (Largest Contentful Paint)',
    FID: 'Measures interactivity lag (First Input Delay)',
    FCP: 'Measures initial paint speed (First Contentful Paint)',
    TTFB: 'Measures server response time (Time to First Byte)',
  };

  return descriptions[name] || 'Web Performance Metric';
}

// Format metric details for structured output
function prepareMetricDetails(metric: PerformanceMetric) {
  return {
    Metric: metric.metricName,
    Value: metric.metricValue,
    Unit: metric.metricUnit || determineUnit(metric.metricName),
    Description: provideMetricDescription(metric.metricName),
    RecordedAt: new Date().toLocaleString(),
  };
}

// Main component to track performance metrics
export function WebVitals({
  enableLogs = false,
  onMetricCapture,
  performanceLimits,
  trackSpecificMetrics,
}: PerformanceTrackerProps) {
  useReportWebVitals((metric) => {
    if (trackSpecificMetrics && !trackSpecificMetrics.includes(metric.name)) {
      return; // Skip unselected metrics
    }

    const details = prepareMetricDetails({
      metricName: metric.name,
      metricValue: metric.value,
      metricUnit: metric.label,
    });

    // Log detailed information if enabled
    if (enableLogs) {
      console.groupCollapsed(`Performance Metric: ${metric.name}`);
      console.table(details);
      console.groupEnd();
    }

    // Trigger external handler if provided
    if (onMetricCapture) {
      onMetricCapture(details);
    }

    // Check for performance limits
    if (performanceLimits && performanceLimits[metric.name] !== undefined) {
      const limit = performanceLimits[metric.name]!;
      if (metric.value > limit) {
        console.warn(
          `⚠️ Alert: ${metric.name} exceeded the threshold (${metric.value} > ${limit})`
        );
      }
    }
  });

  return null;
}
