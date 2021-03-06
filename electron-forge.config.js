/*
    This file defines the full configuration for electron forge and each of the
    packaging tools it configures. It's referenced by config.forge in package.json.

    It also makes this configuration dynamic, using env vars to configure
    secrets from CI without having to hardcode them. In theory it should be possible
    to dynamically configure electron forge with secrets using ELECTRON_FORGE_*
    variables, but this doesn't seem to work (see
    https://github.com/electron-userland/electron-forge/issues/657) so
    we have to do this instead.
*/

const {
    ELECTRON_FORGE_ELECTRON_WINSTALLER_CONFIG_CERTIFICATE_PASSWORD
} = process.env;

module.exports = {
    "make_targets": {
        "win32": [
            "squirrel",
            "zip"
        ],
        "darwin": [
            "dmg",
            "zip"
        ],
        "linux": [
            "deb",
            "zip"
        ]
    },
    "electronPackagerConfig": {
        "executableName": "httptoolkit",
        "packageManager": "npm",
        "icon": "./src/icon",
        "ignore": [
            "certificates"
        ],
        "afterCopy": [
            "./src/after-copy.js"
        ],
        "appBundleId": "tech.httptoolkit.desktop",
        "appCategoryType": "public.app-category.developer-tools",
        "osxSign": {
            "keychain": "httptoolkit-build.keychain"
        }
    },
    "electronWinstallerConfig": {
        "name": "httptoolkit",
        "title": "HTTP Toolkit",
        "exe": "httptoolkit.exe",
        "iconUrl": "https://httptoolkit.tech/favicon.ico",
        "setupIcon": "./src/icon.ico",
        "loadingGif": "./src/installing.gif",
        "certificateFile": "./certificates/encrypted-win-cert.pfx",
        "certificatePassword": ELECTRON_FORGE_ELECTRON_WINSTALLER_CONFIG_CERTIFICATE_PASSWORD
    },
    "electronInstallerDMG": {
        "name": "HTTP Toolkit",
        "icon": "src/icon.icns",
        "background": "src/dmg-background.png"
    },
    "electronInstallerDebian": {
        "name": "httptoolkit",
        "bin": "httptoolkit",
        "icon": "src/icon.png",
        "homepage": "https://httptoolkit.tech",
        "categories": [
            "Development",
            "Network"
        ]
    },
    "github_repository": {
        "owner": "httptoolkit",
        "name": "httptoolkit-desktop"
    },
}