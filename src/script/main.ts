(() => {
    /* Меню мобилки */
    const btnMobile: any = $('.js-menu-mobile-btn');
    const blockMobile: any = btnMobile.siblings('.js-menu-mobile-block');
    const closeMobile: any = blockMobile.find('.js-menu-mobile-close');
    const time: number = 150;
    
    if(btnMobile) {
        $(btnMobile).on('click', (e) => {
            if(blockMobile.is(':hidden')) {
                blockMobile.show(time);
            } else {
                blockMobile.hide(time);
            }
        });
    }

    if(closeMobile) {
        closeMobile.on('click', () => {
            blockMobile.hide(time);
        });
    }
})();
