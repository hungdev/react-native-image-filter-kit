package iyegoroff.imagefilterkit.nativeplatform;

import android.graphics.Bitmap;
import android.graphics.LinearGradient;
import android.graphics.Paint;
import android.graphics.Shader;

import com.facebook.cache.common.CacheKey;
import com.facebook.cache.common.SimpleCacheKey;

import org.json.JSONObject;

import java.util.Arrays;
import java.util.Locale;

import javax.annotation.Nonnull;
import javax.annotation.Nullable;

import iyegoroff.imagefilterkit.InputConverter;
import iyegoroff.imagefilterkit.utility.GeneratorPostProcessor;

public class LinearGradientPostProcessor extends GeneratorPostProcessor {

  private final float mX0;
  private final float mY0;
  private final float mX1;
  private final float mY1;
  private final @Nonnull int[] mColors;
  private final @Nonnull float[] mLocations;
  private final @Nonnull Shader.TileMode mTileMode;

  public LinearGradientPostProcessor(int width, int height, @Nullable JSONObject config) {
    super(width, height, config);

    int[] defaultColors = { 0, 255 };
    float[] defaultLocations = { 0, 1 };

    InputConverter converter = new InputConverter(width, height);

    mX0 = converter.convertDistance(config != null ? config.optJSONObject("x0") : null, "0");
    mY0 = converter.convertDistance(config != null ? config.optJSONObject("y0") : null, "0");
    mX1 = converter.convertDistance(config != null ? config.optJSONObject("x1") : null, "100w");
    mY1 = converter.convertDistance(config != null ? config.optJSONObject("y1") : null, "0");
    mColors = converter.convertColorVector(config != null ? config.optJSONObject("colors") : null, defaultColors);
    mLocations = converter.convertScalarVector(config != null ? config.optJSONObject("locations") : null, defaultLocations);
    mTileMode = converter.convertTileMode(config != null ? config.optJSONObject("tileMode"): null, Shader.TileMode.CLAMP);
  }

  @Override
  public String getName () {
    return "LinearGradientPostProcessor";
  }

  @Override
  public void processGenerated(@Nonnull Paint paint, @Nonnull Bitmap bitmap) {
    paint.setStyle(Paint.Style.FILL);
    paint.setShader(new LinearGradient(mX0, mY0, mX1, mY1, mColors, mLocations, mTileMode));
  }

  @Nonnull
  @Override
  public CacheKey generateCacheKey() {
    return new SimpleCacheKey(String.format(
      (Locale) null,
      "linear_gradient_%d_%d_%f_%f_%f_%f_%s_%s_%s",
      mWidth,
      mHeight,
      mX0,
      mY0,
      mX1,
      mY1,
      Arrays.toString(mColors),
      Arrays.toString(mLocations),
      mTileMode.toString()
    ));
  }
}
