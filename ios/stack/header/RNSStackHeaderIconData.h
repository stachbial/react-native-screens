#pragma once

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import "RNSEnums.h"

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSInteger, RNSStackHeaderIconType) {
  RNSStackHeaderIconTypeSfSymbol,
  RNSStackHeaderIconTypeImageSource,
};

@interface RNSStackHeaderIconData : NSObject

@property (nonatomic, readonly) RNSStackHeaderIconType iconType;
@property (nonatomic, copy, readonly, nullable) NSString *resourceName;
@property (nonatomic, copy, readonly, nullable) NSDictionary *jsonSource;
@property (nonatomic, readonly) RNSIconImageRenderingMode imageRenderingMode;
@property (nonatomic, readonly) RNSIconSymbolRenderingMode symbolRenderingMode;
@property (nonatomic, strong, nullable) UIImage *resolvedImage;

- (instancetype)initWithType:(RNSStackHeaderIconType)iconType
                resourceName:(nullable NSString *)resourceName
                  jsonSource:(nullable NSDictionary *)jsonSource
          imageRenderingMode:(RNSIconImageRenderingMode)imageRenderingMode
         symbolRenderingMode:(RNSIconSymbolRenderingMode)symbolRenderingMode;

@end

NS_ASSUME_NONNULL_END
