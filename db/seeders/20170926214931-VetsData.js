module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('Vets', [
      {
        title: 'Centrum Zdrowia Małych Zwierząt',
        city: 'Poznań',
        address: 'Osiedle Władysława Jagiełły 33, 60-694 Poznań, Polska',
        googleMapsID: 'ChIJQ8EgpGpDBEcR1d0wYZTGPbI',
        rodents: true,
        websiteUrl: 'http://www.klinikawet.pl/',
        phone: '(61) 824 31 78',
        accepted: true,
        createdAt: new Date(2017, 9, 25),
        updatedAt: new Date(2017, 9, 25)
      },
      {
        title: 'Uniwersyteckie Centrum Medycyny Weterynaryjnej w Poznaniu',
        city: 'Poznań',
        address: 'Wierzbięcice 65, 60-101 Poznań',
        coordinates: 'ChIJQRgfL69EBEcRmXoCfgeg6Ho',
        rodents: true,
        websiteUrl: 'http://www.klinwet.pl',
        phone: '61 823 09 97',
        accepted: true,
        createdAt: new Date(2017, 9, 25),
        updatedAt: new Date(2017, 9, 25)
      }
    ], {}),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('Vets', null, {})
};
