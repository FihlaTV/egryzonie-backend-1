module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Vets', [
      {
        title: 'Centrum Zdrowia Małych Zwierząt',
        address: 'Osiedle Władysława Jagiełły 33, 60-694 Poznań, Polska',
        googleMapsID: 'ChIJQ8EgpGpDBEcR1d0wYZTGPbI',
        position: Sequelize.fn('ST_GeomFromText', 'POINT(52.458415 16.904740)'),
        rodents: true,
        websiteUrl: 'http://www.klinikawet.pl/',
        phone: '(61) 824 31 78',
        accepted: true,
        createdAt: new Date(2017, 9, 25),
        updatedAt: new Date(2017, 9, 25)
      },
      {
        title: 'Uniwersyteckie Centrum Medycyny Weterynaryjnej w Poznaniu',
        address: 'Wierzbięcice 65, 60-101 Poznań',
        googleMapsID: 'ChIJQRgfL69EBEcRmXoCfgeg6Ho',
        rodents: true,
        websiteUrl: 'http://www.klinwet.pl',
        position: Sequelize.fn('ST_GeomFromText', 'POINT(52.428717 16.904993)'),
        phone: '61 823 09 97',
        accepted: true,
        createdAt: new Date(2017, 9, 25),
        updatedAt: new Date(2017, 9, 25)
      },
      {
        title: 'Gabinet weterynaryjny lek. wet Dariusz Filipiński',
        address: 'osiedle Wichrowe Wzgórze 103, 61-699 Poznań',
        googleMapsID: 'ChIJ96PTO65cBEcRaIKdka7JQC8',
        rodents: true,
        websiteUrl: 'http://wet-poznan.pl',
        position: Sequelize.fn('ST_GeomFromText', 'POINT(52.439139 16.939578)'),
        phone: '61 823 29 51',
        accepted: true,
        createdAt: new Date(2017, 10, 15),
        updatedAt: new Date(2017, 10, 15)
      },
      {
        title: 'Centrum Zdrowia Małych Zwierząt',
        address: 'Poznańska 63A, Wronki',
        googleMapsID: 'ChIJ_RRLtDUcBEcREip9_VldDA4',
        rodents: true,
        websiteUrl: 'http://www.centrumwet.ewizytowki.com/',
        position: Sequelize.fn('ST_GeomFromText', 'POINT(52.706153 16.380681)'),
        phone: '61 823 09 97',
        accepted: true,
        createdAt: new Date(2017, 9, 25),
        updatedAt: new Date(2017, 9, 25)
      }
    ], {}),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Vets', null, {})
};
