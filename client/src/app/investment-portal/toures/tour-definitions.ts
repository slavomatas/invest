import { IStepOption } from 'ngx-tour-md-menu';

// interface IStepOption {
//   stepId?: string;
//   anchorId?: string;
//   title?: string;
//   content?: string;
//   route?: string | UrlSegment[];
//   nextStep?: number | string;
//   prevStep?: number | string;
//   placement?: any;
//   preventScrolling?: boolean;
//   prevBtnTitle?: string;
//   nextBtnTitle?: string;
//   endBtnTitle?: string;
// }

export const firstLoginTour: IStepOption[] = [
  {
    anchorId: 'flogin-step-1',
    title: 'Welcome...',
    content: 'Here you can see...'
  }
];

export const demandDashboardTour: IStepOption[] = [
  {
    anchorId: 'dashboard-step-1',
    title: 'Welcome...',
    content: 'Here you can see...'
  },
   {
    anchorId: 'dashboard-step-2',
    title: 'Welcome...',
    content: 'Here you can see...'
  },
  {
    anchorId: 'dashboard-step-3',
    title: 'Welcome...',
    content: 'Here you can see...',
  },
  {
    anchorId: 'dashboard-step-4',
    title: 'Welcome...',
    content: 'Here you can see...',
    preventScrolling:	true
  }
];

export const demandPortfolioListTour: IStepOption[] = [
  {
    anchorId: 'portfolio-list-step-1',
    title: 'Welcome...',
    content: 'Here you can see...'
  },
  {
    anchorId: 'portfolio-list-step-2',
    title: 'Welcome...',
    content: 'Here you can see...'
  },
  {
    anchorId: 'portfolio-list-step-3',
    title: 'Welcome...',
    content: 'Here you can see...'
  },
  {
    anchorId: 'portfolio-list-step-4',
    title: 'Welcome...',
    content: 'Here you can see...'
  },
  {
    anchorId: 'portfolio-list-step-5',
    title: 'Welcome...',
    content: 'Here you can see...'
  }
];

export const demandPortfolioDetailTour: IStepOption[] = [
  {
    anchorId: 'portfolio-detail-step-1',
    title: 'Welcome...',
    content: 'Here you can see...'
  },
  {
    anchorId: 'portfolio-detail-step-2',
    title: 'Welcome...',
    content: 'Here you can see...'
  },
  {
    anchorId: 'portfolio-detail-step-3',
    title: 'Welcome...',
    content: 'Here you can see...'
  },
  {
    anchorId: 'portfolio-detail-step-4',
    title: 'Welcome...',
    content: 'Here you can see...'
  },
  {
    anchorId: 'portfolio-detail-step-5',
    title: 'Welcome...',
    content: 'Here you can see...'
  },
  {
    anchorId: 'portfolio-detail-step-6',
    title: 'Welcome...',
    content: 'Here you can see...'
  },
  {
    anchorId: 'portfolio-detail-step-7',
    title: 'Welcome...',
    content: 'Here you can see...'
  },
  {
    anchorId: 'portfolio-detail-step-8',
    title: 'Welcome...',
    content: 'Here you can see...',
    preventScrolling: false
  },
  {
    anchorId: 'portfolio-detail-step-9',
    title: 'Welcome...',
    content: 'Here you can see...',
    preventScrolling: false
  }
];
