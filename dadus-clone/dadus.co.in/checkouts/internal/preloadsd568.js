
    (function() {
      var preconnectOrigins = ["https://cdn.shopify.com"];
      var scripts = ["/cdn/shopifycloud/checkout-web/assets/c1/polyfills-legacy.BaLWfP5F.js","/cdn/shopifycloud/checkout-web/assets/c1/app-legacy.D1emMzeL.js","/cdn/shopifycloud/checkout-web/assets/c1/esnext-vendor-legacy.Diz6KDyo.js","/cdn/shopifycloud/checkout-web/assets/c1/context-browser-legacy.pJrZl4Dw.js","/cdn/shopifycloud/checkout-web/assets/c1/phone-phoneCountryCode-legacy.D284zyMC.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useReplaceShopPayInHistory-legacy.DU9lZpl5.js","/cdn/shopifycloud/checkout-web/assets/c1/images-payment-icon-legacy.D9dJeA84.js","/cdn/shopifycloud/checkout-web/assets/c1/FullScreenBackground-legacy.KJkMlQ0s.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-shop-discount-offer-legacy.CHhhuOEI.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayCheckoutGqlVersion-legacy.DdrJupjR.js","/cdn/shopifycloud/checkout-web/assets/c1/shared-unactionable-errors-legacy.DNqEB3Zn.js","/cdn/shopifycloud/checkout-web/assets/c1/NotFound-legacy.CsKPx7HV.js","/cdn/shopifycloud/checkout-web/assets/c1/utils-getCommonShopPayExternalTelemetryAttributes-legacy.B4jX4GnG.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-ShopPayCheckoutSessionQuery-legacy.DHrpu7Fu.js","/cdn/shopifycloud/checkout-web/assets/c1/graphql-UserPrivacySettingsSetMutation-legacy.CErd5y9i.js","/cdn/shopifycloud/checkout-web/assets/c1/hydrate-legacy.Jq_5e8Yl.js","/cdn/shopifycloud/checkout-web/assets/c1/images-flag-icon-legacy.Bfupgm8k.js","/cdn/shopifycloud/checkout-web/assets/c1/locale-en-legacy.DG73RC2Y.js","/cdn/shopifycloud/checkout-web/assets/c1/page-OnePage-legacy.C7ba0c9a.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useWalletsTimeout-legacy.CiqZUI4X.js","/cdn/shopifycloud/checkout-web/assets/c1/remember-me-hooks-legacy.CSMr5sT8.js","/cdn/shopifycloud/checkout-web/assets/c1/OffsitePaymentFailed-legacy.a8z9yDxA.js","/cdn/shopifycloud/checkout-web/assets/c1/NoAddressLocationFullDetour-legacy.DCGfRkFf.js","/cdn/shopifycloud/checkout-web/assets/c1/SplitDeliveryMerchandiseContainer-legacy.BkR3EC-R.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShopPayPaymentRequiredMethod-legacy.pl_zS15X.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUnauthenticatedErrorModal-legacy.CeoVvjqF.js","/cdn/shopifycloud/checkout-web/assets/c1/ChangeCompanyLocationLink-legacy.pSaYvBzj.js","/cdn/shopifycloud/checkout-web/assets/c1/WalletsSandbox-WalletSandbox-legacy.DoHR8uFD.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useForceShopPayUrl-legacy.BwYOJbz4.js","/cdn/shopifycloud/checkout-web/assets/c1/GooglePayButton-index-legacy.Cgm5IfB3.js","/cdn/shopifycloud/checkout-web/assets/c1/AutocompleteField-hooks-legacy.DnOtzIFU.js","/cdn/shopifycloud/checkout-web/assets/c1/LocalizationExtensionField-legacy.jW5_bhZv.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useUpdateCheckoutAddress-legacy.CrR4kqCi.js","/cdn/shopifycloud/checkout-web/assets/c1/WalletLogo-legacy.BtxPlJqt.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useGeneralPaymentErrorMessage-legacy.Bq4KJaH0.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShowShopPayOptin-legacy.OrsXL8RS.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useShowCreateMoreAccountsGdprTreatment-legacy.Da1Kdfh4.js","/cdn/shopifycloud/checkout-web/assets/c1/index-legacy.N1ts6wrw.js","/cdn/shopifycloud/checkout-web/assets/c1/Section-legacy.DJud7NwS.js","/cdn/shopifycloud/checkout-web/assets/c1/MobileOrderSummary-legacy.BNRcdavV.js","/cdn/shopifycloud/checkout-web/assets/c1/hooks-useOnePageFormSubmit-legacy.DEM86S5C.js","/cdn/shopifycloud/checkout-web/assets/c1/PayPalOverCaptureInfoBanner-legacy.DHRtNowg.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-get-negotiation-input-legacy.48bdgUb5.js","/cdn/shopifycloud/checkout-web/assets/c1/shop-cash-constants-legacy.BVbhh-af.js","/cdn/shopifycloud/checkout-web/assets/c1/redemption-constants-legacy.CxiN0GmP.js","/cdn/shopifycloud/checkout-web/assets/c1/PaymentErrorBanner-legacy.D_lvsl6O.js","/cdn/shopifycloud/checkout-web/assets/c1/StockProblems-StockProblemsLineItemList-legacy.BL19Nbds.js","/cdn/shopifycloud/checkout-web/assets/c1/DutyOptions-legacy.Ct0cNDwU.js","/cdn/shopifycloud/checkout-web/assets/c1/ShipmentBreakdown-legacy.DHfp1THt.js","/cdn/shopifycloud/checkout-web/assets/c1/MerchandiseModal-legacy.Cr1gO4I7.js","/cdn/shopifycloud/checkout-web/assets/c1/extension-targets-shipping-options-legacy.B6XMPj1w.js","/cdn/shopifycloud/checkout-web/assets/c1/StackedMerchandisePreview-legacy.kyHCZexz.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingGroupsSummaryLine-legacy.CTdBuX2F.js","/cdn/shopifycloud/checkout-web/assets/c1/ShippingMethodSelector-legacy.BFhiIcxG.js","/cdn/shopifycloud/checkout-web/assets/c1/SubscriptionPriceBreakdown-legacy.DoWTJ6Eb.js","/cdn/shopifycloud/checkout-web/assets/c1/utilities-publishMessage-legacy.BUZ_ORfD.js"];
      var styles = [];
      var fontPreconnectUrls = [];
      var fontPrefetchUrls = [];
      var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0722/9692/3416/files/Logo_x320.png?v=1676982027"];

      function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
      }

      function preconnectAssets() {
        var resources = preconnectOrigins.concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
          var res = resources[index++];
          if (res) preconnect(res, next);
        })();
      }

      function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
          link.rel = 'prefetch';
          link.fetchPriority = 'low';
          link.as = as;
          if (as === 'font') link.type = 'font/woff2';
          link.href = url;
          link.crossOrigin = '';
          link.onload = link.onerror = callback;
          document.head.appendChild(link);
        } else {
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onloadend = callback;
          xhr.send();
        }
      }

      function prefetchAssets() {
        var resources = [].concat(
          scripts.map(function(url) { return [url, 'script']; }),
          styles.map(function(url) { return [url, 'style']; }),
          fontPrefetchUrls.map(function(url) { return [url, 'font']; }),
          imgPrefetchUrls.map(function(url) { return [url, 'image']; })
        );
        var index = 0;
        function run() {
          var res = resources[index++];
          if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
      }

      function onLoaded() {
        try {
          if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
            preconnectAssets();
            prefetchAssets();
          }
        } catch (e) {}
      }

      if (document.readyState === 'complete') {
        onLoaded();
      } else {
        addEventListener('load', onLoaded);
      }
    })();
  