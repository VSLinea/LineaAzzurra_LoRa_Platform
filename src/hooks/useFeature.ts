import { FEATURES, type FeatureFlag } from '../config/features'

export function useFeature(feature: FeatureFlag): boolean {
  return FEATURES[feature]
} 