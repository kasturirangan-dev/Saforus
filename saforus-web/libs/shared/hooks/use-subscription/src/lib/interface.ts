export interface SubscriptionPlanDetail {
  subscriptionPlanId: number;
  title: string;
  codeName: string;
  description: string;
  subscriptionCostType: string;
  paymentInterval: string;
  price: number;
  currency: string;
  noOfTeams: number;
  noOfMembersPerTeam: number;
  cloudStorageSize: number;
  wtrCapacitySize: number;
  wtrCodeMinValue: number;
  wtrCodeMaxValue: number;
  noOfDownloadsPerOrder: number;
  downloadValidityInDays: number;
  noOfPdAllowed: number;
  userSubscriptionId: number;
  teamId: number;
  subscribedAt: string;
  subscriptionStatus: string;
  subscriptionStartedAt: string;
  subscriptionEndsAt: string;
  paymentServiceProvider: string;
}
