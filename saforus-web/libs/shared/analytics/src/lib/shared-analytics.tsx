import { logEvent } from '@web-workspace/shared/helpers/firebase';
import { TrackingEvent } from './interface';
import { ROUTES } from '@web-workspace/saforus/constants/routes';
import {
  FeatureFlag,
  isFeatureEnabled,
} from '@web-workspace/shared/feature-flag';

const logEventAnalytics = (
  eventName: string | TrackingEvent,
  eventParams?: { [key: string]: any },
  eventLocation?: string
) => {
  // Check if analytics feature is enabled
  if (!isFeatureEnabled(FeatureFlag.ANALYTICS)) {
    return;
  }

  // Update event page-view
  if (eventName === TrackingEvent.Default && eventLocation) {
    eventName = eventPageView(eventLocation);
  }

  if (eventName) {
    logEvent(eventName, eventParams);
  }
};

// Get page-view event base on location
const eventPageView = (location: string) => {
  let eventName;
  switch (location) {
    case ROUTES.DASHBOARD.PACKAGES_DELIVERY.path:
      eventName = TrackingEvent.Dashboard_ServiceUsage;
      break;
    case ROUTES.DASHBOARD.SEARCH_ORDERS.path:
      eventName = TrackingEvent.Dashboard_SearchOrder;
      break;
    case ROUTES.FORENSIC_WATERMARKING.NEW_FORENSIC_WATERMARKING.path:
      eventName = TrackingEvent.Watermarking_CreateNewOrder;
      break;
    case ROUTES.FORENSIC_WATERMARKING.WATERMARKING_HISTORY.path:
      eventName = TrackingEvent.Watermarking_ViewOrder;
      break;
    case ROUTES.PIRACY_DETECTION.NEW_REQUEST.path:
      eventName = TrackingEvent.PD_CreateNewRequest;
      break;
    case ROUTES.PIRACY_DETECTION.VIEW_ORDER.path:
      eventName = TrackingEvent.PD_ViewRequest;
      break;
    case ROUTES.HELP.HELP_CENTER.path:
      eventName = TrackingEvent.HelpCenter;
      break;
    case ROUTES.HELP.INQUIRY.path:
      eventName = TrackingEvent.Inquiry;
      break;
    case ROUTES.USER_INFO.ROOT:
      eventName = TrackingEvent.MyAccount;
      break;
    case ROUTES.USER_INFO.TEAM.path:
      eventName = TrackingEvent.TeamMember;
      break;
    default:
      eventName = '';
      break;
  }
  return eventName;
};

export { logEventAnalytics };
