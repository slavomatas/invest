export class NavigationModel
{
    public model: any[];

    constructor()
    {
        this.model = [
            {
                'id'      : 'applications',
                'title'   : 'Applications',
                'type'    : 'group',
                'children': [
                    {
                        'title': 'Dashboard',
                        'type' : 'item',
                        'icon' : 'dashboard',
                        'url'  : '/dashboard',
                        'badge': {
                           'title': 25,
                           'bg'   : '#F44336',
                           'fg'   : '#FFFFFF'
                        }
                    },
                    {
                      'title': 'Portfolios',
                      'type' : 'item',
                      'icon' : 'trending_up',
                      'url'  : '/portfolios',
                      'badge': {
                          'title': 25,
                          'bg'   : '#F44336',
                          'fg'   : '#FFFFFF'
                      }
                    },
                    {
                        'title' : 'Create Portfolio',
                        'type' : 'item',
                        'icon' : 'add',
                        'url' : '/portfolios/create'
                    }
                ]
            }
        ];
    }
}
