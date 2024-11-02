$(function () {
    $('#bh-sl-map-container').storeLocator({
        slideMap: false,
        defaultLoc: true,
        defaultLat: lat,
        defaultLng: lng,
        taxonomyFilters: {
            'branch': 'branch-filter',
            'atm': 'atm-filter',
            'region': 'region-filter'
        },
        catMarkers: {
            'atm': ['/ResourcePackages/MCBMU/assets/dist/images/logo.svg', 32, 32],
            'branch': ['/ResourcePackages/MCBMU/assets/dist/images/logo.svg', 32, 32]
        },
        mapSettings: {
            'zoom': zoom
        }
    });
});