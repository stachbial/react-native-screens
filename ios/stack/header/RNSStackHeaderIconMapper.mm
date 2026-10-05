#import "RNSStackHeaderIconMapper.h"
#import "RNSConversions.h"

@implementation RNSStackHeaderIconMapper

+ (nullable RNSStackHeaderIconData *)iconFromDictionary:(nullable id)dictionary
{
  if (![dictionary isKindOfClass:[NSDictionary class]]) {
    return nil;
  }
  NSDictionary *dict = (NSDictionary *)dictionary;

  NSString *type = dict[@"type"];
  if (![type isKindOfClass:[NSString class]]) {
    return nil;
  }

  if ([type isEqualToString:@"sfSymbol"]) {
    return [[RNSStackHeaderIconData alloc]
               initWithType:RNSStackHeaderIconTypeSfSymbol
               resourceName:dict[@"name"]
                 jsonSource:nil
         imageRenderingMode:RNSIconImageRenderingModeDefault
        symbolRenderingMode:rnscreens::conversion::RNSIconSymbolRenderingModeFromString(dict[@"renderingMode"])];
  }

  if ([type isEqualToString:@"imageSource"]) {
    NSDictionary *source = dict[@"imageSource"];
    if (![source isKindOfClass:[NSDictionary class]]) {
      return nil;
    }
    return [[RNSStackHeaderIconData alloc]
               initWithType:RNSStackHeaderIconTypeImageSource
               resourceName:nil
                 jsonSource:source
         imageRenderingMode:rnscreens::conversion::RNSIconImageRenderingModeFromString(dict[@"renderingMode"])
        symbolRenderingMode:RNSIconSymbolRenderingModeDefault];
  }

  return nil;
}

@end
