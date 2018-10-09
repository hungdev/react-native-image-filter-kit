import { requireNativeComponent } from 'react-native';
import createImageFilter from './create-image-filter';

export const NativeImageFilter = createImageFilter(
  requireNativeComponent('RNImageFilter')
);