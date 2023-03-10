import { accessibilityHttpService, ServiceType } from 'utils/http';

import { useSuspense } from 'shared/Suspense';

import { ISchedule } from '../../application/types';

export const scheduleQueryKey = (facilityId: string, scheduleId: string) => [
  `facilities/${facilityId}/schedules/${scheduleId}`,
  ServiceType.Accessibility,
];

export const scheduleQuery = (facilityId: string, scheduleId: string) =>
  accessibilityHttpService.get<ISchedule>(`facilities/${facilityId}/schedules/${scheduleId}`);

export const useScheduleQuery = (facilityId: string, scheduleId: string) => {
  return useSuspense(scheduleQueryKey(facilityId, scheduleId), () => scheduleQuery(facilityId, scheduleId)).data;
};
