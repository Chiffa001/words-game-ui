import { mockTelegramEnv } from "@tma.js/sdk-svelte";

const themeParams = {
    accent_text_color: '#6ab2f2',
    bg_color: '#17212b',
    button_color: '#5288c1',
    button_text_color: '#ffffff',
    destructive_text_color: '#ec3942',
    header_bg_color: '#17212b',
    hint_color: '#708499',
    link_color: '#6ab3f3',
    secondary_bg_color: '#232e3c',
    section_bg_color: '#17212b',
    section_header_text_color: '#6ab3f3',
    subtitle_text_color: '#708499',
    text_color: '#f5f5f5',
} as const;

mockTelegramEnv({
    launchParams: {
        tgWebAppThemeParams: themeParams,
        tgWebAppData: new URLSearchParams([
            ['user', JSON.stringify({
                id: 1,
                first_name: 'Pavel',
                username: 'durov',
            })],
            ['hash', ''],
            ['signature', ''],
            ['auth_date', Date.now().toString()],
        ]),
        tgWebAppStartParam: 'debug',
        tgWebAppVersion: '8',
        tgWebAppPlatform: 'tdesktop',
    },
});