interface ColorBlendConfig {
  readonly dstImage: unknown
  readonly srcColor: string
  readonly disableCache?: boolean
  readonly disableIntermediateCaches?: boolean
}

const asNativeBlendConfig = (mode: string) => (config: Object) => ({
  ...config,
  mode,
  name: 'PorterDuffXfermode'
})

const asNativeBlendColorConfig = (mode: string) => ({
  disableCache,
  dstImage,
  srcColor
}: ColorBlendConfig) => ({
  name: 'PorterDuffColorFilter',
  image: dstImage,
  color: srcColor,
  disableCache,
  mode
})

const asRenderscriptBlendColorConfig = (name: string) => (
  { srcColor, disableIntermediateCaches = true, ...config }: ColorBlendConfig
) => ({
  ...config,
  name,
  resizeCanvasTo: 'dstImage',
  srcImage: {
    name: 'Color',
    color: srcColor,
    disableCache: disableIntermediateCaches
  }
})

export const shapeTransforms = {
  PlusBlend: asNativeBlendConfig('ADD'),

  DarkenBlend: asNativeBlendConfig('DARKEN'),

  LightenBlend: asNativeBlendConfig('LIGHTEN'),

  ModulateBlend: asNativeBlendConfig('MULTIPLY'),

  OverlayBlend: asNativeBlendConfig('OVERLAY'),

  ScreenBlend: asNativeBlendConfig('SCREEN'),

  PlusBlendColor: asNativeBlendColorConfig('ADD'),

  DarkenBlendColor: asNativeBlendColorConfig('DARKEN'),

  LightenBlendColor: asNativeBlendColorConfig('LIGHTEN'),

  ModulateBlendColor: asNativeBlendColorConfig('MULTIPLY'),

  OverlayBlendColor: asNativeBlendColorConfig('OVERLAY'),

  ScreenBlendColor: asNativeBlendColorConfig('SCREEN'),

  ColorDodgeBlendColor: asRenderscriptBlendColorConfig('ColorDodgeBlend'),

  ExclusionBlendColor: asRenderscriptBlendColorConfig('ExclusionBlend'),

  ColorBurnBlendColor: asRenderscriptBlendColorConfig('ColorBurnBlend'),

  SoftLightBlendColor: asRenderscriptBlendColorConfig('SoftLightBlend'),

  HueBlendColor: asRenderscriptBlendColorConfig('HueBlend'),

  ColorBlendColor: asRenderscriptBlendColorConfig('ColorBlend'),

  SaturationBlendColor: asRenderscriptBlendColorConfig('SaturationBlend'),

  LuminosityBlendColor: asRenderscriptBlendColorConfig('LuminosityBlend'),

  DifferenceBlendColor: asRenderscriptBlendColorConfig('DifferenceBlend'),

  HardLightBlendColor: asRenderscriptBlendColorConfig('HardLightBlend'),

  MultiplyBlendColor: asRenderscriptBlendColorConfig('MultiplyBlend')
}
