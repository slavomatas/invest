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

const modelPortfolioId = 13;

export const demandDashboardTour: IStepOption[] = [
  {
    anchorId: 'dashboard-step-1',
    title: 'Market value',
    content: 'See the difference in how the value of your portfolios has changed in the selected period. In other words, whether you gain or lose.'
  },
   {
    anchorId: 'dashboard-step-2',
    title: 'Period',
    content: 'Choose the period you\'d like to watch the progress of your portfolios.'
  },
  {
    anchorId: 'dashboard-step-3',
    title: 'Portfolios',
    content: 'Select portfolios that interest you most.',
  },
  {
    anchorId: 'dashboard-step-4',
    title: 'Portfolios comparison',
    content: 'See the difference in gain or loss of your portfolios in last days.',
    preventScrolling:	true
  },
  {
    anchorId: 'dashboard-step-5',
    title: 'Portfolios overview',
    content: 'The portfolio consists of several securities, such as Apple, Google, etc. The amount of security you\'ve bought is called position. Here you can see the overview of your portfolios and it\'s percentual composition by securities. \n For more detailed view click on the chart.',
    preventScrolling:	true,
    route: 'dashboard'
  }
];

export const demandPortfolioListTour: IStepOption[] = [
  {
    anchorId: 'portfolio-list-step-1',
    title: 'Portfolios\' filter',
    content: 'Filter the portfolios you want to see, whether it\'s your private or public modeled portfolios.',
    route: 'portfolios'
  },
  {
    anchorId: 'portfolio-list-step-2',
    content: 'This is a detailed list of portfolios. You can see portfolios\' market value, last change of the value and the description.'
  },
  {
    anchorId: 'portfolio-list-step-3',
    content: 'This chart shows the composition of the portfolio based on the market value of each position.'
  },
  {
    anchorId: 'portfolio-list-step-4',
    content: 'See the detailed view of the portfolio.',
    route: 'portfolios'
  },
  {
    anchorId: 'portfolio-list-step-5',
    content: 'You can disable the portfolio, so it\'ll no longer show on your dashboard. This change is of course revertable. '
  }
];

export const demandPortfolioDetailTour: IStepOption[] = [
  {
    anchorId: 'portfolio-detail-step-1',
    content: 'Shows the actual market value of the portfolio.',
    route: 'portfolios/' + modelPortfolioId + '/overview'
  },
  {
    anchorId: 'portfolio-detail-step-2',
    content: 'Shows the portfolio change from yesterday.'
  },
  {
    anchorId: 'portfolio-detail-step-3',
    content: 'Shows the change from last week, month, year and from the creation of the portfolio.'
  },
  {
    anchorId: 'portfolio-detail-step-4',
    content: 'Shows how many positions you have in concrete security. '
  },
  {
    anchorId: 'portfolio-detail-step-5',
    content: 'Here you can see the progress of securities in last 20 days. ',
    route: 'portfolios/' + modelPortfolioId + '/overview'
  },
  {
    anchorId: 'portfolio-detail-step-6',
    content: 'Here you can see the last change in your concrete positions. '
  },
  {
    anchorId: 'portfolio-detail-step-7',
    content: 'You can buy or sell positions right here. ',
    route: 'portfolios/' + modelPortfolioId + '/overview'
  },
  {
    anchorId: 'portfolio-detail-step-8',
    content: 'Transactions are individual purchases of the position of a security, here you can see the price at which you made the transaction.',
    preventScrolling: false
  },
  {
    anchorId: 'portfolio-detail-step-9',
    content: 'You   can edit details of transactions right here.',
    preventScrolling: false
  }
];


export const firstLoginTour: IStepOption[] = [
  {
    anchorId: 'help-step',
    content: 'You can run step-by-step guide on every screen by using this button.',
    preventScrolling: false
  },
  demandDashboardTour[0],
  demandDashboardTour[2],
  demandDashboardTour[4],
  demandPortfolioListTour[0],
  demandPortfolioListTour[1],
  demandPortfolioListTour[3],
  demandPortfolioDetailTour[0],
  demandPortfolioDetailTour[4],
  demandPortfolioDetailTour[6]
];
