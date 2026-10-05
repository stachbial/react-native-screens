#import "RNSStackHeaderIconData.h"

@implementation RNSStackHeaderIconData

- (instancetype)initWithType:(RNSStackHeaderIconType)iconType
                resourceName:(nullable NSString *)resourceName
                  jsonSource:(nullable NSDictionary *)jsonSource
          imageRenderingMode:(RNSIconImageRenderingMode)imageRenderingMode
         symbolRenderingMode:(RNSIconSymbolRenderingMode)symbolRenderingMode
{
  if (self = [super init]) {
    _iconType = iconType;
    _resourceName = [resourceName copy];
    _jsonSource = [jsonSource copy];
    _imageRenderingMode = imageRenderingMode;
    _symbolRenderingMode = symbolRenderingMode;
  }
  return self;
}

@end
