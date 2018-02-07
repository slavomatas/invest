import { Component, OnInit } from '@angular/core';
import { PortfolioDetails } from '../../types/types';
import { NgRedux } from '@angular-redux/store';
import { AppState } from '../../store/store';


@Component({
  selector: 'invest-portfolios',
  templateUrl: './portfolios.component.html',
  styleUrls: ['./portfolios.component.scss']
})
export class PortfoliosComponent implements OnInit {

  portfolioList$ = this.ngRedux.select(state => state.dashboardPortfolioList);

  portfolios: PortfolioDetails[] = [
    {
      id: 5,
      name: 'Portfolio5',
      description: null,
      marketValue: 8565.300000000001,
      lastChangeAbs: -8.55999999999949,
      lastChangePct: -0.0012309072764449258,
      returns: {
        daily: 0.0,
        weekly: -0.013691531747311081,
        monthly: 0.04483802223298383,
        quarterly: 0.0,
        yearly: 0.04483802223298383,
        cumulative: 0.0,
        all: 0.23166940361392152
      },
      cash: 4.547473508864641E-13,
      positions: [
        {
          symbol: 'RFG',
          value: 30.98258484816644
        },
        {
          symbol: 'RPG',
          value: 30.284193198136666
        },
        {
          symbol: 'RZG',
          value: 16.58022439377488
        },
        {
          symbol: 'DNL',
          value: 8.989865293684984
        },
        {
          symbol: 'ELD',
          value: 3.701523589366397
        },
        {
          symbol: 'EMCB',
          value: 12.51317219478594
        },
        {
          symbol: 'cash',
          value: 4.547473508864641E-13
        }
      ]
    },
    {
      id: 6,
      name: 'Portfolio6',
      description: null,
      marketValue: 6831.6,
      lastChangeAbs: 13.960000000000036,
      lastChangePct: 0.0021377664934199014,
      returns: {
        daily: 0.0,
        weekly: -0.0074878616445401835,
        monthly: 0.003967904064897665,
        quarterly: 0.0,
        yearly: 0.003967904064897665,
        cumulative: 0.0,
        all: 0.0461579925821336
      },
      cash: 0.0,
      positions: [
        {
          symbol: 'IDV',
          value: 3.661419286843492
        },
        {
          symbol: 'KXI',
          value: 34.064682943966275
        },
        {
          symbol: 'AGG',
          value: 34.245274898998765
        },
        {
          symbol: 'XLU',
          value: 7.634034779553837
        },
        {
          symbol: 'DBP',
          value: 4.609468938462439
        },
        {
          symbol: 'cash',
          value: 0.0
        }
      ]
    },
    {
      id: 2,
      name: 'Portfolio2',
      description: null,
      marketValue: 9498.18,
      lastChangeAbs: -2.6200000000008004,
      lastChangePct: -2.8607304689631796E-4,
      returns: {
        daily: 0.0,
        weekly: -0.014425351761922722,
        monthly: 0.0629950869025111,
        quarterly: 0.0,
        yearly: 0.0629950869025111,
        cumulative: 0.0,
        all: 0.03708904296555127
      },
      cash: 0.0,
      positions: [
        {
          symbol: 'PSCT',
          value: 12.981194923659059
        },
        {
          symbol: 'SKYY',
          value: 2.5478990922471465
        },
        {
          symbol: 'SSG',
          value: 0.1692858884544197
        },
        {
          symbol: 'VGT',
          value: 66.2145870050894
        },
        {
          symbol: 'XLK',
          value: 9.881029312984172
        },
        {
          symbol: 'FDN',
          value: 15.717820256091166
        },
        {
          symbol: 'IBB',
          value: 14.070560886401394
        },
        {
          symbol: 'cash',
          value: 0.0
        }
      ]
    },
    {
      id: 3,
      name: 'Portfolio3',
      description: null,
      marketValue: 5983.56,
      lastChangeAbs: 15.719999999999345,
      lastChangePct: 0.0023003677369034525,
      returns: {
        daily: 0.0,
        weekly: -0.013601887218578024,
        monthly: 0.012426143631601994,
        quarterly: 0.0,
        yearly: 0.012426143631601994,
        cumulative: 0.0,
        all: -0.1244027750746668
      },
      cash: 0.0,
      positions: [
        {
          symbol: 'IFGL',
          value: 1.6484364659166115
        },
        {
          symbol: 'JNK',
          value: 3.3806166395924833
        },
        {
          symbol: 'TLT',
          value: 37.82162851212322
        },
        {
          symbol: 'VYM',
          value: 26.690171102153233
        },
        {
          symbol: 'DEM',
          value: 2.861259183496112
        },
        {
          symbol: 'DES',
          value: 1.6964863726610913
        },
        {
          symbol: 'DOL',
          value: 3.3203481205168828
        },
        {
          symbol: 'DON',
          value: 2.5954816196378077
        },
        {
          symbol: 'cash',
          value: 0.0
        }
      ]
    },
    {
      id: 1,
      name: 'Portfolio1',
      description: null,
      marketValue: 5854.27,
      lastChangeAbs: 1.4600000000000364,
      lastChangePct: 3.297102840251753E-4,
      returns: {
        daily: 0.0,
        weekly: -0.01211262139198932,
        monthly: 0.02664344812831243,
        quarterly: 0.0,
        yearly: 0.02664344812831243,
        cumulative: 0.0,
        all: 0.32206371538324174
      },
      cash: 0.0,
      positions: [
        {
          symbol: 'NFO',
          value: 14.247710816207658
        },
        {
          symbol: 'PDP',
          value: 10.371840041542328
        },
        {
          symbol: 'PSR',
          value: 10.419078723734984
        },
        {
          symbol: 'CEW',
          value: 0.6839104960994283
        },
        {
          symbol: 'CSM',
          value: 16.82574401249003
        },
        {
          symbol: 'DBC',
          value: 0.5003578584520358
        },
        {
          symbol: 'BIL',
          value: 14.30735241114605
        },
        {
          symbol: 'cash',
          value: 0.0
        }
      ]
    },
    {
      id: 4,
      name: 'Portfolio4',
      description: null,
      marketValue: 5054.25,
      lastChangeAbs: 2.880000000000109,
      lastChangePct: 5.714569175057083E-4,
      returns: {
        daily: 0.0,
        weekly: -0.007779924144267425,
        monthly: -0.00791041406993731,
        quarterly: 0.0,
        yearly: -0.00791041406993731,
        cumulative: 0.0,
        all: 0.0028771268416101226
      },
      cash: 0.0,
      positions: [
        {
          symbol: 'JNK',
          value: 2.668133748825246
        },
        {
          symbol: 'KBWD',
          value: 2.0826953553939753
        },
        {
          symbol: 'LQD',
          value: 42.84091898501262
        },
        {
          symbol: 'PEY',
          value: 1.3331544739575605
        },
        {
          symbol: 'SDIV',
          value: 1.9545784240985309
        },
        {
          symbol: 'AGG',
          value: 34.71583617747441
        },
        {
          symbol: 'cash',
          value: 0.0
        }
      ]
    }
  ];

  constructor(private ngRedux: NgRedux<AppState>) { }

  ngOnInit() {
  }

}
