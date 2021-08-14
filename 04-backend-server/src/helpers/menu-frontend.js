const getMenuFrontEnd = (role = 'USER_ROLE') => {
    const menu = [
        {
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'ProgressBar', url: 'progress' },
                { titulo: 'Gráficas', url: 'grafica1' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'Rxjs', url: 'rxjs' }
            ]
        },
        {
            titulo: 'Maintenance',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'Users', url: 'users' },
                { titulo: 'Hospitals', url: 'hospitals' },
                { titulo: 'Doctors', url: 'doctors' }
            ]
        }
    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Users', url: 'users' });
    }

    return menu;

}

module.exports = { getMenuFrontEnd };