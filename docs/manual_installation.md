### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-image-filter-kit` and add `RNImageFilterKit.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNImageFilterKit.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Linking `cikernel` resources: add resources from `node_modules/react-native-image-filter-kit/ios/Resources` to your project's `Build Phases` ➜ `Copy Bundle Resources`
5. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import iyegoroff.imagefilterkit.ImageFilterKitPackage;` to the imports at the top of the file
  - Add `new ImageFilterKitPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-image-filter-kit'
  	project(':react-native-image-filter-kit').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-image-filter-kit/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-image-filter-kit')
  	```
