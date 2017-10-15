package com.demo3;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.cunyutech.hollyliu.reactnative.wallpaper.WallPaperPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.burnweb.rnpermissions.RNPermissionsPackage;
import com.sbugert.rnadmob.RNAdMobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.crashlytics.android.Crashlytics;
import io.fabric.sdk.android.Fabric;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new WallPaperPackage(),
            new FastImageViewPackage(),
            new RNSpinkitPackage(),
            new VectorIconsPackage(),
            new LinearGradientPackage(),
            new RNFetchBlobPackage(),
            new RNPermissionsPackage(),
            new RNAdMobPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    Fabric.with(this, new Crashlytics());
    SoLoader.init(this, /* native exopackage */ false);
  }
}
