# 📱 NFC Demo – Angular + Capacitor

This is an Angular 17+ project wrapped with Capacitor,
demonstrating NFC read/write on Android and iOS.

It allows you to build:
- Android APK (debug & release)
- iOS app (requires macOS & Xcode)

Capacitor wraps the compiled Angular web app inside a native WebView.

------------------------------------------------------------

PREREQUISITES

Common:
- Node.js >= 18
- npm >= 9
- Angular CLI >= 17

Check:
node -v
npm -v
ng version

------------------------------------------------------------

Android:
- Android Studio
- Android SDK & Build Tools
- Java JDK 17+

Check:
adb --version

------------------------------------------------------------

iOS (macOS only):
- macOS
- Xcode
- CocoaPods

Check:
xcode-select --version
pod --version

------------------------------------------------------------

INSTALL DEPENDENCIES

npm install

------------------------------------------------------------

INITIALIZE CAPACITOR (ONCE)

npm install @capacitor/core @capacitor/cli
npx cap init

Example values:
App name: NfcDemo
App ID: com.example.nfcdemo

------------------------------------------------------------

BUILD ANGULAR APP

ng build

Output directory:
dist/<app-name>/

Check capacitor.config.ts:
webDir: 'dist/<app-name>'

------------------------------------------------------------

ANDROID – GENERATE APK

1) Add Android platform (once)
npx cap add android

2) Sync web assets & plugins
npx cap sync android

3) Open Android Studio
npx cap open android

4) Build APK in Android Studio
Debug APK (testing):
Build -> Build Bundle(s) / APK(s) -> Build APK(s)
Output: android/app/build/outputs/apk/debug/app-debug.apk

Release APK (distribution):
Build -> Generate Signed Bundle / APK
Output: android/app/build/outputs/apk/release/app-release.apk

Optional – run directly on device:
npx cap run android

------------------------------------------------------------

iOS – BUILD IOS APP (macOS ONLY)

1) Add iOS platform (once)
npx cap add ios

2) Sync web assets
npx cap sync ios

3) Open Xcode
npx cap open ios

Then:
- Configure Signing & Capabilities
- Enable NFC Tag Reading entitlement
- Select a real device
- Click Run

Note:
iOS simulators do NOT support NFC or hardware features.

------------------------------------------------------------

TYPICAL DEVELOPMENT WORKFLOW

ng build
npx cap sync
npx cap open android   (or ios)

------------------------------------------------------------

COMMON ISSUES

White screen        -> webDir mismatch
Old content         -> forgot ng build
Plugin not working  -> forgot cap sync
NFC not detected    -> using emulator instead of real device

------------------------------------------------------------

KEY CONCEPT

Capacitor does NOT convert Angular into native code.
It wraps the compiled web app inside a native WebView.

------------------------------------------------------------

USEFUL LINKS

Angular: https://angular.io
Capacitor: https://capacitorjs.com
Android Studio: https://developer.android.com/studio
Xcode: https://developer.apple.com/xcode/

------------------------------------------------------------

EXAMPLE CI/CD BUILD SCRIPT (GITHUB ACTIONS)

name: Build Android APK

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    name: Build APK
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repo
      uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: 18

    - name: Install dependencies
      run: npm ci

    - name: Build Angular app
      run: npm run build

    - name: Install Capacitor CLI
      run: npm install @capacitor/cli -g

    - name: Sync Android platform
      run: npx cap sync android

    - name: Build Android APK (Gradle)
      working-directory: android
      run: ./gradlew assembleDebug

    - name: Upload APK artifact
      uses: actions/upload-artifact@v3
      with:
        name: app-debug.apk
        path: android/app/build/outputs/apk/debug/app-debug.apk

Note: iOS CI/CD requires macOS runners and Xcode signing.
